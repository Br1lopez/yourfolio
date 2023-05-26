import { useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./hooks/PortfolioContext";
import App from "./App";
import { API_BASE_URL } from "./globals";

const queryClient = new QueryClient();

function AppWrapper() {
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
