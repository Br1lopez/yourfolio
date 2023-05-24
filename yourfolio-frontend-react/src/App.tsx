import { useEffect } from "react";
import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegister } from "./modules/user/components/userRegistration/UserRegister";
import { UserLogin } from "./modules/user/components/userLogin/UserLogin";
import axios from "axios";
import Home from "./modules/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./hooks/PortfolioContext";

const ROUTES = [
  {
    path: "/portfolio/:portfolioId",
    component: <PortfolioCreator />,
  },
  {
    path: "/register",
    component: <UserRegister />,
  },
  {
    path: "/login",
    component: <UserLogin />,
  },
  {
    path: "/home",
    component: <Home />,
  },
];

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.title = "YOURFOLIO";
    axios.defaults.withCredentials = true;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContext.Provider value={usePortfolioContext()}>
        <BrowserRouter>
          <Routes>
            {ROUTES.map((route, i) => (
              <Route path={route.path} key={i} element={route.component} />
            ))}
          </Routes>
        </BrowserRouter>
      </PortfolioContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
