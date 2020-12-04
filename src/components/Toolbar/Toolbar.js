import React from "react";
import '../Toolbar/Toolbar.css'



export default function Toolbar(props) {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div onClick={props.drawerClickHandler} className="toolbar__toggle-button">
          <img alt= "burger" style={{height:'40px'}}src="./burgericon.png"/>

        </div>
        <div className="toolbar__logo"><a href="/"><img alt="git" style={{height:"70px"}}src="./gitlogo.png"/> </a></div>
        <div className="spacer"></div>
        <div className="toolbar_navigation-items">
            <ul>
                <li><a href="/Saved"> Saved </a></li>
            </ul>
        </div>
      </nav>
    </header>
  );
}
