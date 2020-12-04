import { Octokit } from "@octokit/core";
import {
  mapStateCommit,
  mapStateLatestRelease,
  mapRepoDetails,
} from "../util/helpers";

const octokit = new Octokit();

const getCommits = (owner, repo) =>
  octokit
    .request("GET /repos/{owner}/{repo}/commits", {
      owner,
      repo,
    })
    .then(({ data: commits }) => commits.map(mapStateCommit))
    .catch((e) => console.error(e));

export const getRepositories = (value) =>
  octokit
    .request("GET /search/repositories?q={repo}", {
      repo: value,
    })
    .then(({ data }) => {
      const { items } = data;
      return items.map(mapRepoDetails);
    })
    .catch((e) => console.error(e));

const getRecentRelease = (owner, repo) =>
  octokit
    .request("GET /repos/{owner}/{repo}/releases", {
      owner,
      repo,
    })
    .then(({ data: releases }) => mapStateLatestRelease(releases[0]))
    .catch((e) => console.error(e));

export const getRecentActivityRepo = (owner, repo) =>
  Promise.all([getRecentRelease(owner, repo), getCommits(owner, repo)])
    .then((latestActivity) => latestActivity)
    .catch((e) => console.error(e));
