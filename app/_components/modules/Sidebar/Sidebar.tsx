"use client";
import Link from "next/link";
import { data } from "./sidebarData";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = (type: any) => {
    const pathname = usePathname();

    return (
        <aside className="top-0 h-screen px-12 bg-albescent-white items-center sticky">
            <Image
                src={data.logo}
                alt="Libanais logo"
                className="max-w-150 mt-18 mb-11 mx-auto"
                priority={true}
            />
            {data.links.map((link, key) => (
                <Link
                    key={key}
                    href={link.path}
                    className={`group flex items-center gap-6 text-lg py-3.5 mb-2.5 rounded-lg pl-5 pr-14 
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
        </aside>
    );
};

export default Sidebar;
