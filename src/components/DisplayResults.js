import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
import { useDispatch, useSelector } from "react-redux";
import { useIndexedDB } from "react-indexed-db";
import { getSavedStatus } from "../util/helpers";
import { getRecentActivityRepo } from "../api/octokit";
import { modifySearchResult } from "../redux/reducers/Results";
import { setSavedRepos } from "../redux/reducers/SavedRepositories";
import { setSelectedRepo } from "../redux/reducers/SelectedRepositories";
import { updateSavedRepos } from "../redux/reducers/SavedRepositories";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import SaveButton from "../components/SaveButton";
import "react-popupbox/dist/react-popupbox.css";


const SearchResults = (props) => {
  const dispatch = useDispatch();
  const { getAll, update } = useIndexedDB("savedRepos");
  const results = useSelector((state) => state.searchResults);
  const savedRepos = useSelector((state) => state.savedRepos);
  const selectedRepo = useSelector((state) => state.selectedRepo);

  useEffect(() => {
    getAll().then((savedRepos) => {
      if (!results.length && savedRepos.length && !selectedRepo?.key) {
        dispatch(setSavedRepos(savedRepos));
        dispatch(setSelectedRepo(savedRepos[0]));
      }
    });
  });
  const handleClose = () => {
    PopupboxManager.close();
  };

  const handleModal = (e, repo, index) => {
    const lastUpdate =
      selectedRepo.latestRelease?.publishedAtTimeString ||
      selectedRepo.commits[0]?.dateToString;
    const first10 = selectedRepo.commits.slice(0, 10);

    const content = (
      <div style={{ overflowY: "auto" }}>
        <div style={{ display: "flex" }}>
          <Typography>Repo: </Typography>
          <Typography style={{ color: "red", paddingLeft: "10px" }}>
            {repo.details.fullName}
          </Typography>
        </div>
        <Divider />
        <div style={{ display: "flex" }}>
          <Typography style={{}}>Last Updated: </Typography>
          <Typography style={{ color: "#008aec", paddingLeft: "10px" }}>
            {lastUpdate}
          </Typography>

          <Divider />
        </div>
        <div style={{ display: "flex" }}>
          <Typography style={{ fontSize: "14px" }}>Release Notes:</Typography>
          <Typography style={{ paddingLeft: "10px", fontSize: "12px" }}>
            {selectedRepo.latestRelease.body}
          </Typography>
        </div>
        <Typography style={{ fontWeight: "bold" }}>Activity:</Typography>
        {first10?.map((commit) => {
          return (
            <div style={{ display: "flex" }}>
              <Typography style={{ fontWeight: "bold", fontSize: "12px" }}>
                {commit.author}:
              </Typography>
              <Typography style={{ paddingLeft: "5px", fontSize: "12px" }}>
                {commit.message}
              </Typography>
            </div>
          );
        })}

        <SaveButton />
        <Button
          onClick={handleClose}
          style={{ background: "#e0e0e0", marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </div>
    );

    PopupboxManager.open({ content });
    const isBeingTracked = getSavedStatus(savedRepos, repo);

    if (!repo?.latestRelease?.name && !repo?.commits?.length) {
      getRecentActivityRepo(repo.details.owner, repo.details.name).then(
        ([latestRelease, commits]) => {
          const updatedRepo = {
            ...repo,
            latestRelease,
            commits,
          };

          dispatch(
            modifySearchResult({
              index,
              repo: updatedRepo,
            })
          );
          dispatch(setSelectedRepo(updatedRepo));
        }
      );
    } else {
      const seenRepo = { ...repo, seen: true };
      if (isBeingTracked) {
        update(seenRepo).then(
          () => dispatch(updateSavedRepos({ index, repo: seenRepo })),
          (error) => console.error(error)
        );
      }
      dispatch(setSelectedRepo(seenRepo));
    }
  };



  
  return (
    <div>
      {results.map((repo, index) => (
        <div style={{ maxWidth: "400px" }}>
          <Paper
            style={{
              maxWidth: "300px",
              display: "flex",
            }}
            onClick={(e) => {
              handleModal(e, repo, index);
            }}
          >
            <Card
              style={{
                width: "90vw",
                display: "flex",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  style={{ color: "rgb(118, 118, 118)", fontSize: "14px" }}
                >
                  {repo.details.fullName}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </div>
      ))}
      <PopupboxContainer />
    </div>
  );
};
export default SearchResults;
