"use client";
import { useState } from "react";
import { LoadingContext } from "@/app/_contexts/LoadingContext";

interface LoadingProps {
    children: React.ReactNode;
}

const Loading = ({ children }: LoadingProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
                <div className="z-50 bg-albescent-white flex items-center justify-center fixed top-0 left-0 bottom-0 right-0">
                    Loading...
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export default Loading;
