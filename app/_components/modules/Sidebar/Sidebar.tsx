"use client";
import Link from "next/link";
import { data } from "./sidebarData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";
import Banner from "../../elements/Banner/Banner";
import { FormContext } from "@/app/_contexts/FormContext";

interface SidebarProps {
    openSidebar: boolean;
    isMobile: boolean;
    setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ openSidebar, isMobile, setOpenSidebar }: SidebarProps) => {
    const { setOpenForm } = useContext(FormContext);
    const pathname = usePathname();

    const toggleMobileSidebar = () => {
        setOpenForm(false);
        if (setOpenSidebar) {
            setOpenSidebar(false);
        }
    };

    return (
        <aside
            className={`top-0 h-screen sm:top-16 sm:w-full sm:fixed box-content z-50 
            bg-albescent-white items-center sticky
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
