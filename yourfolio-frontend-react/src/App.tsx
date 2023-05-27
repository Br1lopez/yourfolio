import { useContext } from "react";
import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { UserRegister } from "./modules/user/components/userRegistration/UserRegister";
import { UserLogin } from "./modules/user/components/userLogin/UserLogin";
import Home from "./modules/home/Home";
import { PortfolioContext } from "./hooks/PortfolioContext";
import { ModalWindow } from "./components/modals/ModalWindow";
import LandingPage from "./modules/landingPage/LandingPage";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NULL_MODAL_WINDOW_DATA } from "./types/portfolioContextTypes";

const ROUTES = [
  {
    path: "/",
    component: <LandingPage />,
  },
  {
    path: "/portfolio/:portfolioId/edit",
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

function App() {
  const { modalWindowData } = useContext(PortfolioContext);
  return (
    <BrowserRouter>
      <QueryClientConfig />
      <ModalWindow modalProperties={modalWindowData} />
      <Routes>
        {ROUTES.map((route, i) => (
          <Route path={route.path} key={i} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const QueryClientConfig = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { modalWindowData } = useContext(PortfolioContext);
  queryClient.setDefaultOptions(
    {
      mutations: {
        onSettled:
          (data, error, variables, context) => {
            switch ((error as AxiosError).response?.status) {
              case 401:
                navigate("/login");
                break;
            }

            modalWindowData.set(NULL_MODAL_WINDOW_DATA);
          }
      },
    });

  return <></>;
};
