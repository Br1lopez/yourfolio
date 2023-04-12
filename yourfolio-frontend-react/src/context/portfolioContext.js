import { createContext } from "react";

const portfolioContext = createContext({
  activeIndex: 1,
  setActiveIndex: (index) => {}
});

export default portfolioContext;
