import { useContext } from "react";
import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegister } from "./modules/user/components/userRegistration/UserRegister";
import { UserLogin } from "./modules/user/components/userLogin/UserLogin";
import Home from "./modules/home/Home";
import { PortfolioContext } from "./hooks/PortfolioContext";
import { ModalWindow } from "./components/modals/ModalWindow";
import LandingPage from "./modules/landingPage/LandingPage";

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
