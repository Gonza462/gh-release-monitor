import React from "react";
import "../SideDrawer/drawer.css";

const DrawerButton = (props) => (
  <button className="toggle-button" onClick={props.click}>
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
    <div className="toggle-button__line" />
  </button>
);

export default DrawerButton;
