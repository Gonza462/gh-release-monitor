


export const getSavedStatus = (savedRepos, repo) =>
savedRepos.filter((savedRepos) => savedRepos.key === repo.key).length > 0;


export const mapStateLatestRelease = (latestRelease) => {
  if (!latestRelease) return {};

  return {
    publishedAt: latestRelease.published_at || latestRelease.publishedAt,
    publishedAtTimeString: new Date(
      latestRelease.published_at || latestRelease.publishedAt
    ).toString(),
    body: latestRelease.body,
    name: latestRelease.name,
    url: latestRelease.url,
  };
};


export const mapRepoDetails = (repo, seen) => {
  return {
    key: repo.full_name || repo.fullName,
    details: {
      fullName: repo.full_name || repo.fullName,
      name: repo.name,
      owner: repo.owner.login,
    },
    seen: !!seen,
  };
};

export const mapStateCommit = ({ commit, url }) => {
  return {
    url: url,
    date: commit.author.date,
    dateToString: new Date(commit.author.date).toString(),
    author: commit.author.name,
    message: commit.message
 
  };
};
