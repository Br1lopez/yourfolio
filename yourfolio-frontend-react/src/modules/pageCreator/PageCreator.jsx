import { useEffect, useState } from "react";
import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import axios from "axios";
import { API_PORT } from '../../globals';

export const PageCreator = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:${API_PORT}/portfolios/1`)
      .then((response) => {
        setData(response.data);
        const style = document.documentElement?.style;
        style.setProperty("--bg-color", response.data.style.bgColor);
        style.setProperty("--text-color", response.data.style.fontColor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <DefaultHead></DefaultHead>
      {data && (
        <NavBar
          title={data.name}
          sections={data.tabs.map((tab) => tab.name)}
        ></NavBar>
      )}
    </>
  );
};
