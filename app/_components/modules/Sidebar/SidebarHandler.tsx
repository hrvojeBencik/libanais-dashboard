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
            {openSidebar && <Sidebar />}
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarHandler;
