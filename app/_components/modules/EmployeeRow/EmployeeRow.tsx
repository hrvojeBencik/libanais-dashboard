import { Employee } from "@/app/_interfaces/Employee";
import useOpenForm from "@/app/_helpers/useOpenForm";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
interface EmployeeRowProps {
    employee: Employee;
    updateEmployee: () => void;
}

const EmployeeRow = ({ employee, updateEmployee }: EmployeeRowProps) => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);

    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };
    return (
        <tr>
            <td>{employee.pin}</td>
            <td>{employee.name}</td>
            <td>{employee.rank}</td>
            <td>{employee.email}</td>
            <td
                className=" cursor-pointer font-bold"
                onClick={handleClick}
            >
                Edit
            </td>

            {isOpen && (
                <td className="absolute top-0 left-0 right-0 bottom-0 bg-white-smoke z-20 border-0">
                    <EmployeeForm
                        handleClose={handleClose}
                        employee={employee}
                        updateEmployee={updateEmployee}
                    />
                </td>
            )}
        </tr>
    );
};

export default EmployeeRow;
