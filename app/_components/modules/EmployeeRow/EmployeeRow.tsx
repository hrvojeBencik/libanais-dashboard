import { Employee } from "@/app/_interfaces/Employee";
import { FormContext } from "@/app/_contexts/FormContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
interface EmployeeRowProps {
    employee: Employee;
}

const EmployeeRow = ({ employee }: EmployeeRowProps) => {
    const { setEditFormData } = useContext(FormContext);
    const router = useRouter();

    const handleClick = () => {
        setEditFormData(employee);
        router.push(`/employees/edit/${employee.id}`);
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
