import { useEffect, useState } from "react";
import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import axios from "axios";

export const PageCreator = () => {
  const [data, setData] = useState([]);



  useEffect(() => {
    // axios.defaults.baseURL = "http://localhost:8080";
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.get("http://localhost:8080/portfolios/1").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <>
      <DefaultHead></DefaultHead>
      <NavBar title={data.name} sections={data.tabs.map(tab => tab.name)}></NavBar>
    </>
  );
};
