import AppScreen from "./pages/AppScreen";
import SavedRepos from "./pages/SavedRepos";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateStore from "./store";
import { initDB } from "react-indexed-db";
import { DB } from "./dbConfig";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import { Provider } from "react-redux";
import "./App.css";

initDB(DB);

const store = CreateStore();

function App() {
  const [sideDrawerOpen, setDrawerOpen] = useState(false);

  const toggleClickHandler = () => {
    setDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <Provider store={store}>
      <div>
        <Toolbar drawerClickHandler={toggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} />
        {backdrop}
        <Router>
          <Switch>
            <Route exact path="/" component={AppScreen} />
            <Route exact path="/Saved" component={SavedRepos} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
