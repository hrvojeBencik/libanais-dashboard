"use client";
import ListCard from "@/app/_components/elements/ListCard/ListCard";
import { Employee } from "@/app/_interfaces/Employee";
import { useState, createContext, useEffect } from "react";
import FormController from "@/app/_components/modules/FormController/FormController";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";
import { loadData } from "@/app/_utils/loadData";

export const EmployeesContext = createContext<Employee[]>([]);

const Employees = () => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        loadData("employeeList", handleLoadedData);
    }, []);

    const handleLoadedData = (data: any) => {
        setEmployeeList(data);
    };

    return (
        <EmployeesContext.Provider value={employeeList}>
            <FormController
                title="Employees"
                subtitle="Effortlessly manage and organize employee information!"
                buttonLabel="Add Employee"
                formComponent={EmployeeForm}
                text="Add Employee"
            />

            <div className="grid grid-cols-4 gap-10">
                {employeeList.map((employee) => (
                    <ListCard
                        key={employee.id}
                        header={employee.name}
                        text={employee.position}
                        subtext={`PIN#${employee.pin}`}
                        image={employee.photo}
                    />
                ))}
            </div>
        </EmployeesContext.Provider>
    );
};

export default Employees;
