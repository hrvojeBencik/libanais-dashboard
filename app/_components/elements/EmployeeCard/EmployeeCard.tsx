import { Employee } from "@/app/_interfaces/Employee";
import DefaultButton from "../DefaultButton/DefaultButton";
import { useContext } from "react";
import { FormContext } from "@/app/_contexts/FormContext";
interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const { setEditFormData } = useContext(FormContext);

    const handleClick = () => {
        setEditFormData(employee);
        window.scrollTo(0, 0);
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
                    <div className="truncate">{employee.email}</div>
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
