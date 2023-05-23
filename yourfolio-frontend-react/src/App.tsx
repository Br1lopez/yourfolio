import { useEffect } from "react";
import "./App.scss";
import { PortfolioCreatorWrapper } from "./modules/portfolioCreator/PortfolioCreatorWrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegister } from "./modules/user/components/userRegistration/UserRegister";
import { UserLogin } from "./modules/user/components/userLogin/UserLogin";



const ROUTES = [
  {
    path: "/",
    component: <PortfolioCreatorWrapper portfolioId={1} />,
  },
  {
    path: "/register",
    component: <UserRegister />,
  },
  {
    path: "/login",
    component: <UserLogin />,
  },
];

function App() {
  useEffect(() => {
    document.title = "YOURFOLIO";
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route, i) => (
          <Route path={route.path} key={i} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

