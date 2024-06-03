"use client";
import { useState } from "react";
import { SidebarContext } from "@/app/_components/modules/Sidebar/SidebarHandler";
import { useContext } from "react";

const useOpenForm = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const { setOpenSidebar } = useContext(SidebarContext);

    const handleOpen = () => {
        setIsOpen(true);
        setOpenSidebar(false);
        window.scrollTo(0, 0);
    };

    const handleClose = () => {
        setIsOpen(false);
        setOpenSidebar(true);
        window.scrollTo(0, 0);
    };

    return [isOpen, handleOpen, handleClose];
};

export default useOpenForm;
