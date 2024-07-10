"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/app/_contexts/DataContext";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";

const EditEmployee = () => {
    const { id } = useParams();
    const { employeeList } = useContext(DataContext);

    if (!id || typeof id !== "string") {
        return <div>Invalid employee ID</div>;
    }

    const employee = employeeList.find((emp) => emp.id === id);

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return <EmployeeForm employee={employee} />;
};

export default EditEmployee;
