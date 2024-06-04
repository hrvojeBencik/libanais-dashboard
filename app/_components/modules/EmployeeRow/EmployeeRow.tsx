import { Employee } from "@/app/_interfaces/Employee";
import { FormContext } from "@/app/_contexts/FormContext";
import { useContext } from "react";
interface EmployeeRowProps {
    employee: Employee;
}

const EmployeeRow = ({ employee }: EmployeeRowProps) => {
    const { setOpenForm, setEditFormData } = useContext(FormContext);

    const handleClick = () => {
        setEditFormData(employee);
        setOpenForm(true);
        window.scrollTo(0, 0);
    };

    return (
        <tr>
            <td>{employee.pin}</td>
            <td>{employee.name}</td>
            <td>{employee.rank}</td>
            <td>{employee.email}</td>
            <td
                className="cursor-pointer font-bold"
                onClick={handleClick}
            >
                Edit
            </td>
        </tr>
    );
};

export default EmployeeRow;
