"use client";
import { useState } from "react";
import { SidebarContext } from "@/app/_components/modules/Sidebar/SidebarHandler";
import { useContext, useEffect } from "react";

const useOpenForm = (initialState = false) => {
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;
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

    const controlSidebarOnResize = () => {
        const width = window.innerWidth;
        if (width > SCREEN_WIDTH_LIMIT_FOR_MOBILE) {
            setOpenSidebar(!isOpen);
        }
    };

    useEffect(() => {
        const controlSidebarOnResize = () => {
            const width = window.innerWidth;
            if (width > SCREEN_WIDTH_LIMIT_FOR_MOBILE) {
                setOpenSidebar(!isOpen);
            }
        };

        window.addEventListener("resize", controlSidebarOnResize);

        // Needed to show/hide links on initial site load
        controlSidebarOnResize();

        return () => {
            window.removeEventListener("resize", controlSidebarOnResize);
        };
    }, [isOpen]);

    return [isOpen, handleOpen, handleClose];
};

export default useOpenForm;
