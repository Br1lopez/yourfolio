import { createContext } from "react";

const portfolioContext = createContext({
  activeElementId: 1,
  setActiveElementId: (index) => {}
});

export default portfolioContext;