import { useEffect } from "react";
import "./App.scss";
import axios, { AxiosError } from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./hooks/PortfolioContext";
import App from "./App";
import { useNavigate } from "react-router-dom";




function AppWrapper() {

  const queryClient = new QueryClient(
    // {
    //   defaultOptions: {
    //     mutations: {
    //       onSettled:
    //         (data, error, variables, context) => {
    //           switch ((error as AxiosError).response?.status) {
    //             case 401:
    //               navigate("/login");
    //               break;
    //           }
    //         }
    //     },
    //   }
    // }
  );

  useEffect(() => {
    document.title = "YOURFOLIO";
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.baseURL = API_BASE_URL;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContext.Provider value={usePortfolioContext()}>
        <App />
      </PortfolioContext.Provider>
    </QueryClientProvider>
  );
}

export default AppWrapper;
