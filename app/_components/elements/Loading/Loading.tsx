"use client";
import { useState } from "react";
import { LoadingContext } from "@/app/_contexts/LoadingContext";
import Logo from "public/assets/Logo.png";
import Image from "next/image";
import DotsLoader from "../DotsLoader/DotsLoader";
interface LoadingProps {
    children: React.ReactNode;
}

const Loading = ({ children }: LoadingProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
                <div className="z-50  bg-albescent-white flex flex-col items-center justify-center fixed top-0 left-0 bottom-0 right-0">
                    <Image
                        src={Logo}
                        className="max-w-24"
                        alt="Libanais Logo Image"
                        sizes="10vw"
                    />
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};

export default Loading;
