import { Dispatch, SetStateAction, createContext } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => {},
});
