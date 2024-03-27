"use client";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

interface ListCardProps {
    className?: string;
    image: StaticImageData;
    header?: string;
    text?: string;
    subtext?: string;
}

const ListCard = ({
    className,
    image,
    header,
    text,
    subtext,
}: ListCardProps) => {
    const pathname = usePathname();

    return (
        <div
            className={`${className} flex pl-16 py-9 pr-10 shadow border rounded-2xl gap-3.5`}
        >
            <Image
                src={image}
                alt=""
                className="h-full w-auto"
            />
            <div>
                <h2
                    className={`${
                        pathname === "/"
                            ? "text-[46px] font-semibold mb-2"
                            : pathname === "/ingredients"
                            ? "text-[40px] font-semibold mb-1"
                            : "font-bold mb-5"
                    } text-grey-eclipse`}
                >
                    {header}
                </h2>
                <h3 className="text-grey-eclipse font-regular mb-1">{text}</h3>
                <p className="text-light-grey text-xs font-regular">
                    {subtext}
                </p>
            </div>
        </div>
    );
};

export default ListCard;
