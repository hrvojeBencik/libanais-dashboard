import { useContext } from "react";
import { SidebarContext } from "@/app/_contexts/SidebarContext";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import MenuIcon from "@/public/assets/svg/menu";

interface MobileBannerProps {
    openSidebar: boolean;
}

const MobileBanner = ({ openSidebar }: MobileBannerProps) => {
    const { setOpenSidebar } = useContext(SidebarContext);
    const toggleSidebar = () => {
        setOpenSidebar((prev) => !prev);
    };

    return (
        <div className="flex w-full items-center justify-between p-4 bg-albescent-white">
            <Image
                src={Logo}
                alt="Libanais logo"
                className="h-8 w-auto"
                priority={true}
            />
            <button
                className={`menuButton ${
                    openSidebar ? "closeIcon" : "openIcon"
                }`}
                onClick={toggleSidebar}
                type="button"
                title="Menu"
            >
                <MenuIcon className="h-8 w-auto" />
            </button>
        </div>
    );
};

export default MobileBanner;
