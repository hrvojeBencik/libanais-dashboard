import Image from "next/image";
import EmployeeImage from "public/assets/avatar.png";

interface UserGreetingProps {
    className?: string;
}

const UserGreeting = ({ className }: UserGreetingProps) => {
    return (
        <div className={`${className} flex gap-3 items-center`}>
            <div className="tracking-wide">
                Hello, <span className="font-semibold">John</span>
            </div>
            <Image
                src={EmployeeImage}
                alt="Employee Image"
            />
        </div>
    );
};

export default UserGreeting;
