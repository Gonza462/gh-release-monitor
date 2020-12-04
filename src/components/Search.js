import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CircularProgress, InputAdornment } from "@material-ui/core";
import {
  clearSelectedRepo,
  setSelectedRepo,
} from "../redux/reducers/SelectedRepositories";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchResults,
  modifySearchResult,
  setSearchResults,
} from "../redux/reducers/Results";
import { getRecentActivityRepo, getRepositories } from "../api/octokit";
import DisplayResults from "../components/DisplayResults";

export default function SearchBar(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch();
  const [currentTimeout, setCurrentTimeout] = useState();
  const [inputProps, setInputProps] = useState({});
  const savedRepos = useSelector((state) => state.savedRepos);
  const results = useSelector((state) => state.searchResults);

  const handleSearch = (e) =>
    setTimeout(() => {
      setInputProps({
        endAdornment: (
          <InputAdornment position="end">
            <CircularProgress />
          </InputAdornment>
        ),
      });

      getRepositories(e)
        .then((items) => {
          if (items.length) {
            const firstResult = items[0];
            firstResult.seen = true;
            items.splice(0, 1, firstResult);

            dispatch(setSearchResults(items));

            getRecentActivityRepo(
              firstResult.details.owner,
              firstResult.details.name
            ).then(([latestRelease, commits]) => {
              const repo = { ...firstResult, latestRelease, commits };
              dispatch(setSelectedRepo(repo));
              dispatch(modifySearchResult({ index: 0, repo }));
            });
          }
        })
        .finally(() => setInputProps({}));
    }, 1000);

  const handleOnChange = ({ target }) => {
    const { value } = target;

    if (currentTimeout) clearTimeout(currentTimeout);
    if (value) setCurrentTimeout(handleSearch(value));
    else {
      dispatch(clearSearchResults());
      if (savedRepos.length) dispatch(setSelectedRepo(savedRepos[0]));
      else dispatch(clearSelectedRepo());
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleOnChange}
        InputProps={inputProps}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            e.preventDefault();
          }
        }}
      />

      <DisplayResults results={results} />
    </form>
  );
}
