import { Octokit } from "@octokit/core";
import React from 'react';

import './App.css';

const octokit = new Octokit();

octokit.request('GET /repos/{owner}/{repo}/releases', {
  owner: 'microsoft',
  repo: 'vscode'
}).then(
  (response) => {
    console.log(response);
  }
);

function App() {

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
