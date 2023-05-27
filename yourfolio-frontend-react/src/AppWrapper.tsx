import { useEffect } from "react";
import "./App.scss";
import axios from "axios";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./hooks/PortfolioContext";
import App from "./App";
import { BrowserRouter } from "react-router-dom";





function AppWrapper() {



  useEffect(() => {
    document.title = "YOURFOLIO";
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.baseURL = API_BASE_URL;
  }, []);
  return (
    <PortfolioContext.Provider value={usePortfolioContext()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PortfolioContext.Provider>
  );
}

export default AppWrapper;
