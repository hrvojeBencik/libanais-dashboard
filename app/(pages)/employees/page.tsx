"use client";
import { useState, useEffect } from "react";
import { Employee } from "@/app/_interfaces/Employee";
import { loadData } from "@/app/_utils/loadData";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import useOpenForm from "@/app/_helpers/useOpenForm";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";
import EmployeeRow from "@/app/_components/modules/EmployeeRow/EmployeeRow";

const Employees = () => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [employeeList, setEmplyeeList] = useState<Employee[]>([]);

    useEffect(() => {
        setIsUpdated(false);
        loadData("employeeList", setEmplyeeList);
    }, [isOpen, isUpdated]);

    const updateEmployee = () => {
        setIsUpdated(true);
    };

    return (
        <div className="w-full pt-[40.5px] relative">
            {isOpen ? (
                <EmployeeForm handleClose={handleClose} />
            ) : (
                <div className="pl-16 pr-6">
                    <PageHeader
                        title="Employees List"
                        subtitle="Hi, Name. Here you can easily manage employees!"
                        buttonText="Add Employee"
                        handleOpen={handleOpen}
                    />
                    <table className="w-full text-left my-4 ">
                        <thead>
                            <tr>
                                <th>PIN</th>
                                <th>Full Name</th>
                                <th>Rank</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map((employee) => (
                                <EmployeeRow
                                    key={employee.id}
                                    employee={employee}
                                    updateEmployee={updateEmployee}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Employees;
