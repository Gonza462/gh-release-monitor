import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIndexedDB } from "react-indexed-db";
import { setSavedRepos } from "../redux/reducers/SavedRepositories";
import Paper from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function SavedRepos() {
  const dispatch = useDispatch();
  const { getAll } = useIndexedDB("savedRepos");
  const savedRepos = useSelector((state) => state.savedRepos);

  useEffect(() => {
    getAll().then((savedRepos) => {
      dispatch(setSavedRepos(savedRepos));
    });
  });

  return (
    <div style={{ display: "inline-grid" }}>
      Saved Repos
      {savedRepos.map((repo) => {
        return (
          <Paper
            style={{
              maxWidth: "300px",
              display: "flex",
            }}
          >
            <Card
              style={{
                width: "90vw",
                display: "flex",
              }}
            >
              <CardContent>{repo.details.fullName}</CardContent>
            </Card>
          </Paper>
        );
      })}
    </div>
  );
}
