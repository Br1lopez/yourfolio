import { RootRoute, Outlet, Route, Router } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PortfolioContext,
  usePortfolioContext,
} from "./modules/portfolioCreator/context/PortfolioContext";
import { useToaster } from "rsuite";
import { PortfolioCreator } from "./modules/portfolioCreator/PortfolioCreator";

const rootRoute = new RootRoute(
  //  {
//   component: () => {
//     const queryClient = new QueryClient();
//     return (
//       <QueryClientProvider client={queryClient}>
//         <Outlet />
//       </QueryClientProvider>
//     );
//   },
// }
);

const portfolioCreatorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (<div>holaaaaaaaaaa</div>)
    const {
      portfolioId: portfolioCtxId,
      activeElementId,
      activeModalData,
    } = usePortfolioContext();
    return (
        <div>holaaaaaaaaaa</div>
    //   <PortfolioContext.Provider
    //     value={{
    //       portfolioId: portfolioCtxId,
    //       activeElementId,
    //       activeModalData,
    //       toaster: useToaster(),
    //     }}
    //   >
    //     <PortfolioCreator portfolioId={33}></PortfolioCreator>
    //   </PortfolioContext.Provider>
    );
  },
});

const appRouteTree = rootRoute.addChildren([portfolioCreatorRoute]);

export const appRouter = new Router({ routeTree: appRouteTree });
