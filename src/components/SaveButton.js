import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIndexedDB } from "react-indexed-db";
import {
  addToSavedRepos,
  removeFromSavedRepos,
} from "../redux/reducers/SavedRepositories";
import { getSavedStatus  } from "../util/helpers";
import { clearSelectedRepo } from "../redux/reducers/SelectedRepositories";

export default function SaveButton() {
  const dispatch = useDispatch();
  const savedRepos = useSelector((state) => state.savedRepos);
  const selectedRepo = useSelector((state) => state.selectedRepo);
  const { add, deleteRecord } = useIndexedDB("savedRepos");
  const isSaved = getSavedStatus (savedRepos, selectedRepo);

  const handleOnClick = () => {
    if (!isSaved) {
   
      add(selectedRepo).then(
        () => dispatch(addToSavedRepos(selectedRepo)),
        (error) => console.error(error)
      );
    } else {
      deleteRecord(selectedRepo.key).then(
        () => {
          dispatch(removeFromSavedRepos(selectedRepo));
          if (savedRepos.length === 1) dispatch(clearSelectedRepo());
        },
        (error) => console.error(error)
      );
    }
  };

  return (
    <Button
      variant="outlined"
      color={isSaved ? "secondary" : "primary"}
      onClick={handleOnClick}
    >
      {isSaved ? "Delete" : "Save"}
    </Button>
  );
}
