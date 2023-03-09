// @ts-ignore
import "./App.css";
import DefaultHead from "./components/DefaultHead";

import React from "react";
import { CustomNavbar } from "./modules/pageCreator/components/navBar/NavBar2";

function App() {
  return (
    <div>
      <DefaultHead></DefaultHead>
      <CustomNavbar title="test"></CustomNavbar>
    </div>
  );
}

export default App;
