"use client";
import Link from "next/link";
import { data } from "./sidebarData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Banner from "../../elements/Banner/Banner";

interface SidebarProps {
    openSidebar: boolean;
    isMobile: boolean;
    setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ openSidebar, isMobile, setOpenSidebar }: SidebarProps) => {
    const pathname = usePathname();

    const toggleMobileSidebar = () => {
        if (setOpenSidebar) {
            setOpenSidebar(false);
        }
    };

    return (
        <aside
            className={`top-0 h-screen sm:fixed sm:top-16 sm:max-h-[calc(100vh-72px)] sm:w-full box-content sm:left-0 sm:right-0  z-50 bg-albescent-white items-center sticky
            ${openSidebar ? "sidebar-visible" : "sidebar-hidden"}`}
        >
            {!isMobile ? (
                <Image
                    src={data.logo}
                    alt="Libanais logo"
                    className="max-w-150 mt-18 mb-11 ml-[86px]"
                    priority={true}
                />
            ) : (
                <Banner
                    isMobile={isMobile}
                    className="sm:p-6"
                />
            )}
            <div className=" pl-[49px] pr-[46px] sm:p-6">
                {data.links.map((link, key) => (
                    <Link
                        key={key}
                        href={link.path}
                        onClick={toggleMobileSidebar}
                        className={`group w-[250px] sm:w-full flex items-center font-medium gap-6 text-lg py-3.5 mb-2.5 box-border rounded-lg pl-5 pr-14 
                    ${
                        pathname === link.path
                            ? "bg-brown-derby bg-opacity-50 font-bold text-[#2e211c]"
                            : "text-[#464255]"
                    } hover:text-[#2e211c]`}
                    >
                        <link.icon
                            className={`${
                                pathname === link.path
                                    ? "[&>*]:fill-[#2e211c]"
                                    : "[&>*]:fill-[#464255]"
                            } group-hover:[&>*]:fill-[#2e211c]`}
                        />{" "}
                        {link.title}{" "}
                    </Link>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
