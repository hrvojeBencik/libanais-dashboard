"use client";
import Banner from "../../elements/Banner/Banner";
import MobileBanner from "../../elements/Banner/MobileBanner";
import Sidebar from "./Sidebar";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
} from "react";

interface SidebarContextType {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
    openSidebar: false,
    setOpenSidebar: () => {},
});

interface SidebarHandlerProps {
    children: React.ReactNode;
}

const SidebarHandler = ({ children }: SidebarHandlerProps) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;

    const [isMobile, setIsMobile] = useState(false);

    const controlNavbarOnResize = () => {
        const width = window.innerWidth;
        if (width < SCREEN_WIDTH_LIMIT_FOR_MOBILE) {
            setIsMobile(true);
            setOpenSidebar(false);
        } else {
            setIsMobile(false);
            setOpenSidebar(true);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", controlNavbarOnResize);

        //Needed to show/hide links on initial site load
        controlNavbarOnResize();

        return () => {
            window.removeEventListener("resize", controlNavbarOnResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            <div
                className={`${
                    openSidebar
                        ? " box-border overflow-hidden fixed w-full"
                        : ""
                }`}
            >
                {!isMobile && (
                    <div className="absolute h-full w-full top-0 bottom-0 -z-10 bg-white-smoke">
                        <div className=" h-[72px] top-0 w-full bg-albescent-white"></div>
                    </div>
                )}

                {isMobile ? <MobileBanner /> : <Banner />}
                <div className="relative">
                    {isMobile ? (
                        openSidebar ? (
                            <Sidebar
                                openSidebar={openSidebar}
                                isMobile={isMobile}
                                setOpenSidebar={setOpenSidebar}
                            />
                        ) : (
                            <div className="py-[40.5px] pl-[50px] pr-6 sm:px-4 sm:py-6 w-full box-border">
                                {children}
                            </div>
                        )
                    ) : (
                        <div className="flex max-w-screen reltive">
                            <Sidebar
                                openSidebar={openSidebar}
                                isMobile={isMobile}
                            />
                            <div className="py-[40.5px] pl-[50px] pr-6 sm:px-4 sm:py-6 w-full box-border">
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default SidebarHandler;
