import { Employee } from "@/app/_interfaces/Employee";
import DefaultButton from "../DefaultButton/DefaultButton";

interface EmployeeCardProps {
    employee: Employee;
    setEmployeeToUpdate: any;
    handleOpen: any;
}

const EmployeeCard = ({
    employee,
    setEmployeeToUpdate,
    handleOpen,
}: EmployeeCardProps) => {
    const handleClick = () => {
        setEmployeeToUpdate(employee);
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    return (
        <div className="rounded-[13.5px] bg-white shadow-sm p-4">
            <div className="grid grid-cols-2 gap-x-4 text-sm">
                <div>
                    <div className="employeeCardField">PIN</div>
                    <div className="mb-3">{employee.pin}</div>
                </div>

                <div>
                    <div className="employeeCardField">Rank</div>
                    <div>{employee.rank}</div>
                </div>
                <div>
                    <div className="employeeCardField">Full Name</div>
                    <div className="mb-3">{employee.name}</div>
                </div>
                <div>
                    <div className="employeeCardField">Email</div>
                    <div className=" truncate">{employee.email}</div>
                </div>
            </div>
            <DefaultButton
                text="Edit"
                light
                className="w-full rounded-[18px] py-[6px] mt-4 border-[1px]"
                onClick={handleClick}
            />
        </div>
    );
};

export default EmployeeCard;
