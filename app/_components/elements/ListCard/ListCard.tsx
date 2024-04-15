"use client";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

interface ListCardProps {
    className?: string;
    image: string | StaticImageData;
    header?: string | number;
    text?: string;
    subtext?: string;
    children?: React.ReactNode;
}

const ListCard = ({
    className,
    image,
    header,
    text,
    subtext,
    children,
}: ListCardProps) => {
    const pathname = usePathname();

    return (
        <div
            className={`${className} flex pl-16 py-9 pr-10 shadow border rounded-2xl gap-6 items-center`}
        >
            <div className="relative">
                {typeof image === "string" ? (
                    <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className=" h-[85px] w-[85px] rounded-full overflow-hidden object-cover bg-albescent-white border-4 border-albescent-white"
                    />
                ) : (
                    <div className=" w-full  h-full rounded-full overflow-hidden bg-albescent-white border-4 border-albescent-white">
                        <img
                            src={image.src}
                            alt=""
                            loading="lazy"
                            className=" m-5"
                        />
                    </div>
                )}

                {children}
            </div>
            <div>
                <h2
                    className={`${
                        pathname === "/"
                            ? "text-[46px] font-semibold"
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
