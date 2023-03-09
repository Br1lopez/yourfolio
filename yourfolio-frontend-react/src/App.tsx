// @ts-ignore
import "./App.css";
import DefaultHead from "./components/DefaultHead";

import React from "react";
import { NavBar } from "./modules/pageCreator/components/navBar/NavBar";

function App() {
  return (
    <div>
      <DefaultHead></DefaultHead>
      <NavBar title="test"></NavBar>
    </div>
  );
}

export default App;
