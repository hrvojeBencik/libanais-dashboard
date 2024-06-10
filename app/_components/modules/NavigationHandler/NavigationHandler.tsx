"use client";
import { useState, useEffect, useContext } from "react";
import { SidebarContext } from "@/app/_contexts/SidebarContext";
import { FormContext } from "@/app/_contexts/FormContext";
import { LoadingContext } from "@/app/_contexts/LoadingContext"; // Import LoadingContext
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../../elements/Banner/Banner";
import MobileBanner from "../../elements/Banner/MobileBanner";

interface NavigationHandlerProps {
    children: React.ReactNode;
}

const NavigationHandler = ({ children }: NavigationHandlerProps) => {
    const { setIsLoading } = useContext(LoadingContext); // Use LoadingContext
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;
    const [isMobile, setIsMobile] = useState(false);

    const controlNavbarOnResize = () => {
        const width = window.innerWidth;
        if (width < SCREEN_WIDTH_LIMIT_FOR_MOBILE) {
            setIsMobile(true);
            setOpenSidebar(false);
        } else {
            setIsMobile(false);
            setOpenSidebar(!openForm);
        }
    };

    useEffect(() => {
        // Add/remove class to body based on sidebar visibility
        if (isMobile && openSidebar) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [isMobile, openSidebar]);

    useEffect(() => {
        window.addEventListener("resize", controlNavbarOnResize);

        // Needed to show/hide links on initial site load
        controlNavbarOnResize();

        return () => {
            window.removeEventListener("resize", controlNavbarOnResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openForm]);

    useEffect(() => {
        setIsLoading(true); // Start loading
        const handleSidebarLoad = async () => {
            // Simulate sidebar setup
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate an async operation
            setIsLoading(false); // Stop loading when sidebar is ready
        };
        handleSidebarLoad();
    }, []);

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            <FormContext.Provider
                value={{ openForm, setOpenForm, editFormData, setEditFormData }}
            >
                {!isMobile && (
                    <div className="absolute h-full w-[346px] top-0 bottom-0 -z-10 bg-white-smoke">
                        <div className=" h-[72px] top-0 w-full bg-albescent-white"></div>
                    </div>
                )}
                {isMobile && <MobileBanner openSidebar={openSidebar} />}
                <div className="relative">
                    {isMobile ? (
                        openSidebar ? (
                            <Sidebar
                                openSidebar={openSidebar}
                                isMobile={isMobile}
                                setOpenSidebar={setOpenSidebar}
                            />
                        ) : (
                            <div className="py-[40.5px] pl-[50px] pr-6 sm:px-4 sm:py-6">
                                {children}
                            </div>
                        )
                    ) : (
                        <div className="flex">
                            <Sidebar
                                openSidebar={openSidebar}
                                isMobile={isMobile}
                            />
                            <div className="w-full">
                                {!isMobile && <Banner />}
                                <div className="py-[40.5px] pl-[50px] pr-6 sm:px-4 sm:py-6 w-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </FormContext.Provider>
        </SidebarContext.Provider>
    );
};

export default NavigationHandler;
