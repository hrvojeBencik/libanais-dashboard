"use client";
import ListCard from "@/app/_components/elements/ListCard/ListCard";
import { Employee } from "@/app/_interfaces/Employee";
import { useState, createContext, useEffect } from "react";
import FormController from "@/app/_components/modules/FormController/FormController";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";
import { loadData } from "@/app/_utils/loadData";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
export const EmployeesContext = createContext<Employee[]>([]);

const Employees = () => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        loadData("employeeList", setEmployeeList);
    }, []);

    return (
        <div className=" relative">
            <FormController
                buttonLabel="Add Employee"
                formComponent={EmployeeForm}
                text="Add Employee"
            >
                <PageHeader
                    title="Employees"
                    subtitle="Effortlessly manage and organize employee information!"
                />
            </FormController>

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
        </div>
    );
};

export default Employees;
