import "./App.scss";
import { PageCreator } from "./modules/pageCreator/PageCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const PORTFOLIO_ID = 33;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageCreator portfolioId = {PORTFOLIO_ID}></PageCreator>
    </QueryClientProvider>
  );
}

export default App;
