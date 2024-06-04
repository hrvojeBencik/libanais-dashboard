import { Dispatch, SetStateAction, createContext } from "react";

interface SidebarContextType {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
    openSidebar: false,
    setOpenSidebar: () => {},
});
