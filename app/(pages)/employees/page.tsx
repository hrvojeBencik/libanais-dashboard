"use client";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
import ListCard from "@/app/_components/elements/ListCard/ListCard";
import { Employee } from "@/app/_interfaces/Employee";
import { useState, useEffect, lazy } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "@/app/firebase";

const LazyEmployeeForm = lazy(
    () => import("@/app/_components/modules/EmployeeForm/EmployeeForm")
);

const Employees = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);

    useEffect(() => {
        loadEmployeeList();
    }, [isOpen]);

    const loadEmployeeList = async () => {
        const snapshot = await getDocs(query(collection(db, "employeeList")));
        const employees = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Employee[];
        setEmployeeList(employees);
    };

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <PageHeader
                title="Employees"
                subtitle="Effortlessly manage and organize employee information!"
                buttonLabel="Add Employee"
                handleIsOpen={handleIsOpen}
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
            {isOpen && (
                <LazyEmployeeForm
                    text="Add Employee"
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default Employees;
