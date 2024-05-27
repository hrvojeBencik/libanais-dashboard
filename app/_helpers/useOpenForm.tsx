"use client";
import { useState } from "react";
import { SidebarContext } from "@/app/_components/modules/Sidebar/SidebarHandler";
import { useContext, useEffect } from "react";

const useOpenForm = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const { setOpenSidebar } = useContext(SidebarContext);

    const handleOpen = () => {
        setIsOpen(true);
        window.scrollTo(0, 0);
    };

    const handleClose = () => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        setOpenSidebar(!isOpen);
    }, [isOpen]);

    return [isOpen, handleOpen, handleClose];
};

export default useOpenForm;
