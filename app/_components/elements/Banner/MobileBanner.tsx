import { useContext } from "react";
import { SidebarContext } from "../../modules/Sidebar/SidebarHandler";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import MenuIcon from "@/public/assets/svg/menu";

interface MobileBannerProps {}
const MobileBanner = ({}: MobileBannerProps) => {
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
            <MenuIcon className="h-8 w-auto" onClick={toggleSidebar} />
        </div>
    );
};

export default MobileBanner;
