import EmployeeImage from "public/assets/avatar.png";
import Image from "next/image";

interface BannerProps {
    className?: string;
}

const Banner = ({ className }: BannerProps) => {
    return (
        <div
            className={`${className} ml-auto mr-0 w-full bg-albescent-white py-3.5`}
        >
            <Image
                src={EmployeeImage}
                alt="Employee Image"
                className=" max-h-11 w-auto ml-auto mr-11"
            />
        </div>
    );
};

export default Banner;
