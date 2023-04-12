import { createContext } from "react";

const portfolioContext = createContext({
    activeIndex: {
        value: 1,
        set: (index) => {}
    }
});

export default portfolioContext;
