import { createContext } from "react";

const portfolioContext = createContext({
  activeElementId: 1,
  setActiveElementId: (index) => {},
  portfolioId: 1,
});

export default portfolioContext;