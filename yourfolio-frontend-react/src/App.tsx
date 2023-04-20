import "./App.scss";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./modules/portfolioCreator/context/PortfolioContext";
import { useToaster } from "rsuite";


const queryClient = new QueryClient();
const PORTFOLIO_ID = 33;

function App() {
  const {
    portfolioId: portfolioCtxId,
    activeElementId,
    activeModalData,
  } = usePortfolioContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContext.Provider
        value={{
          portfolioId: portfolioCtxId,
          activeElementId,
          activeModalData,
          toaster: useToaster()
        }}
      >
        <PortfolioCreator portfolioId={PORTFOLIO_ID}></PortfolioCreator>
      </PortfolioContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
