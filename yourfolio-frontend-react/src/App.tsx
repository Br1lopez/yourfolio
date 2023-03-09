// @ts-ignore
import "./App.css";
import DefaultHead from "./components/DefaultHead";
import { Navbar } from "./modules/pageCreator/components/navBar/NavBar";
import React from "react";

function App() {
  return (
    <div>
      <DefaultHead></DefaultHead>
      <Navbar title="test"></Navbar>
    </div>
  );
}

export default App;
