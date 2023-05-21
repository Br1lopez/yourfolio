import { PortfolioCreator } from "../portfolioCreator/PortfolioCreator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    PortfolioContext,
    usePortfolioContext,
} from "../../hooks/PortfolioContext";

const queryClient = new QueryClient();

export interface PortfolioCreatorWrapperProps {
    portfolioId: number;
}

export function PortfolioCreatorWrapper(props: PortfolioCreatorWrapperProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <PortfolioContext.Provider
                value={usePortfolioContext()}
            >
                <PortfolioCreator portfolioId={props.portfolioId}></PortfolioCreator>
            </PortfolioContext.Provider>
        </QueryClientProvider>
    );
}
