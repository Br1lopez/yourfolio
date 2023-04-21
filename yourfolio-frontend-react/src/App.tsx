import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./modules/portfolioCreator/context/PortfolioContext";
import { useToaster } from "rsuite";
import { getElement } from "./api/element";

const queryClient = new QueryClient();
const PORTFOLIO_ID = 33;

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
