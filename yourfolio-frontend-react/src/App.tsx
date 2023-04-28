import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./modules/portfolioCreator/context/PortfolioContext";
import { useToaster } from "rsuite";

const queryClient = new QueryClient();
const PORTFOLIO_ID = 1;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContext.Provider
        value={{
          ...usePortfolioContext(),
          toaster: useToaster(),
        }}
      >
        <PortfolioCreator portfolioId={PORTFOLIO_ID}></PortfolioCreator>
      </PortfolioContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
//TODO pagina de 404
