import EmployeeImage from "public/assets/avatar.png";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";
import { usePathname } from "next/navigation";

interface BannerProps {
    className?: string;
    isMobile?: boolean;
}

const Banner = ({ className, isMobile }: BannerProps) => {
    const pathname = usePathname();
    return (
        <div
            className={`${className} bg-albescent-white py-[14px] max-h-[73px] justify-end flex gap-10 items-center pr-10 sm:flex-row-reverse sm:gap-3`}
        >
            {pathname === "/" || isMobile ? (
                <SearchBar
                    searchbarClassName="bg-[#F5F0E5] w-full py-3"
                    className="min-w-[358px] sm:min-w-0 ml-auto sm:m-0 sm:w-full sm:max-w-full z-50"
                    iconStyle="top-3"
                />
            ) : (
                ""
            )}
            <Image
                src={EmployeeImage}
                alt="Employee Image"
                className=" max-h-[45px] w-auto"
            />
        </div>
    );
};

export default Banner;
