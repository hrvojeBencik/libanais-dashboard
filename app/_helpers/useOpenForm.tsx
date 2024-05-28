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
            if (isOpen) {
                setOpenSidebar(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", controlSidebarOnResize);

        //Needed to show/hide links on initial site load
        controlSidebarOnResize();

        return () => {
            window.removeEventListener("resize", controlSidebarOnResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [isOpen, handleOpen, handleClose];
};

export default useOpenForm;
