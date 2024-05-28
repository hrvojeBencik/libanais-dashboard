import { Employee } from "@/app/_interfaces/Employee";

interface EmployeeRowProps {
    employee: Employee;
    setEmployeeToUpdate: any;
    handleOpen: any;
}

const EmployeeRow = ({
    employee,
    setEmployeeToUpdate,
    handleOpen,
}: EmployeeRowProps) => {
    const handleClick = () => {
        setEmployeeToUpdate(employee);
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
        </tr>
    );
};

export default EmployeeRow;
