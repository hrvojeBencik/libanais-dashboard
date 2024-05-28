"use client";
import { useState, useEffect } from "react";
import { Employee } from "@/app/_interfaces/Employee";
import { loadData } from "@/app/_utils/loadData";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import useOpenForm from "@/app/_helpers/useOpenForm";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";
import EmployeeRow from "@/app/_components/modules/EmployeeRow/EmployeeRow";
import EmployeeCard from "@/app/_components/elements/EmployeeCard/EmployeeCard";

const Employees = () => {
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee[]>([]);
    const [employeeList, setEmplyeeList] = useState<Employee[]>([]);
    const [filteredEmployeeList, setFilteredEmployeeList] =
        useState<Employee[]>(employeeList);

    const controlPageOnResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < SCREEN_WIDTH_LIMIT_FOR_MOBILE);
    };

    useEffect(() => {
        window.addEventListener("resize", controlPageOnResize);

        //Needed to show/hide links on initial site load
        controlPageOnResize();

        return () => {
            window.removeEventListener("resize", controlPageOnResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsMobile(window.innerWidth < SCREEN_WIDTH_LIMIT_FOR_MOBILE);
    }, [isMobile, setIsMobile]);

    useEffect(() => {
        setIsUpdated(false);
        loadData("employeeList", setEmplyeeList);
    }, [isOpen, isUpdated]);

    const updateEmployee = () => {
        setIsUpdated(true);
    };

    const handleFilteredData = (filteredData: Employee[]) => {
        setFilteredEmployeeList(filteredData);
    };

    return (
        <div className="w-full relative">
            <EmployeeForm
                handleClose={handleClose}
                className={`${isOpen ? "form-visible" : "form-hidden"}`}
                employee={employeeToUpdate}
                updateEmployee={updateEmployee}
                setEmployeeToUpdate={setEmployeeToUpdate}
            />
            <div className={` ${isOpen ? "page-hidden" : "slide"} `}>
                <PageHeader
                    title="Employees List"
                    subtitle="Hi, Name. Here you can easily manage employees!"
                    buttonText="Add Employee"
                    handleOpen={handleOpen}
                    dataList={employeeList}
                    handleFilteredData={handleFilteredData}
                />
                {isMobile ? (
                    <div className="flex flex-col gap-4 mt-6">
                        {filteredEmployeeList.map((employee) => (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                                setEmployeeToUpdate={setEmployeeToUpdate}
                                handleOpen={handleOpen}
                            />
                        ))}
                    </div>
                ) : (
                    <table className="w-full text-left mt-8 ">
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
                            {filteredEmployeeList.map((employee) => (
                                <EmployeeRow
                                    key={employee.id}
                                    employee={employee}
                                    setEmployeeToUpdate={setEmployeeToUpdate}
                                    handleOpen={handleOpen}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Employees;
