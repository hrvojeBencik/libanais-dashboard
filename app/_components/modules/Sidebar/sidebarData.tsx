import Logo from "@/public/assets/Logo.png";
import home from "@/public/assets/svg/home";
import box from "@/public/assets/svg/box";
import edit from "@/public/assets/svg/edit";
import person from "@/public/assets/svg/person";
import pie from "@/public/assets/svg/pie";
import { StaticImageData } from "next/image";

type SidebarData = {
    logo: StaticImageData;
    links: {
        icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
        title: string;
        path: string;
    }[];
};

export const data: SidebarData = {
    logo: Logo,
    links: [
        {
            icon: home,
            title: "Dashboard",
            path: "/",
        },
        {
            icon: edit,
            title: "Recipe List",
            path: "/recipes",
        },
        {
            icon: person,
            title: "Employees",
            path: "/employees",
        },
        {
            icon: pie,
            title: "Analytics",
            path: "/analytics",
        },
        {
            icon: box,
            title: "Packaging",
            path: "/packaging",
        },
    ],
};
