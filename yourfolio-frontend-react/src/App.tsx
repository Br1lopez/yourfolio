import "./App.scss";
import { PageCreator } from "./modules/pageCreator/PageCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./modules/pageCreator/context/PortfolioContext";
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
        <PageCreator portfolioId={PORTFOLIO_ID}></PageCreator>
      </PortfolioContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
