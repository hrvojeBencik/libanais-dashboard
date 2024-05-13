import EmployeeImage from "public/assets/avatar.png";
import Image from "next/image";

interface BannerProps {
    className?: string;
}

const Banner = ({ className }: BannerProps) => {
    return (
        <div className={`${className} bg-albescent-white py-[14.06px]`}>
            <Image
                src={EmployeeImage}
                alt="Employee Image"
                className=" max-h-11 w-auto ml-auto mr-11"
            />
        </div>
    );
};

export default Banner;
