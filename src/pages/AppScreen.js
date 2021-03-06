import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import SearchBar from "../components/Search";

export default class AppScreen extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "0 auto" }}>
            <Typography>Example: User/RepoName or User/ </Typography>
            <SearchBar label="Search" />
          </div>
        </div>
      </div>
    );
  }
}
