"use client";
import Sidebar from "./Sidebar";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface SidebarContextType {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
    openSidebar: false,
    setOpenSidebar: () => {},
});

const SidebarHandler = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            <div className="absolute h-full w-full top-0 bottom-0 -z-10 bg-white-smoke">
                <div className=" h-[72px] top-0 w-full bg-albescent-white"></div>
            </div>
            <Sidebar openSidebar={openSidebar} />
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarHandler;
