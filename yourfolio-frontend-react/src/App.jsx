import "./App.scss";
import { PageCreator } from "./modules/pageCreator/PageCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageCreator portfolioId = {"1"}></PageCreator>
    </QueryClientProvider>
  );
}

export default App;
