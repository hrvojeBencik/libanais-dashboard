"use client";
import { useState, useEffect, useContext } from "react";
import { Employee } from "@/app/_interfaces/Employee";
import { SidebarContext } from "@/app/_contexts/SidebarContext";
import { DataContext } from "@/app/_contexts/DataContext";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import EmployeeCard from "@/app/_components/elements/EmployeeCard/EmployeeCard";
import EmployeeRow from "@/app/_components/modules/EmployeeRow/EmployeeRow";

const Employees = () => {
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;
    const { setOpenSidebar } = useContext(SidebarContext);
    const { employeeList } = useContext(DataContext);
    const [isMobile, setIsMobile] = useState(true);
    const [filteredEmployeeList, setFilteredEmployeeList] =
        useState<Employee[]>(employeeList);

    const controlPageOnResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < SCREEN_WIDTH_LIMIT_FOR_MOBILE);
        setOpenSidebar(!(width < SCREEN_WIDTH_LIMIT_FOR_MOBILE));
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
        setFilteredEmployeeList(employeeList);
    }, [employeeList]);

    const handleFilteredData = (filteredData: Employee[]) => {
        setFilteredEmployeeList(filteredData);
    };

    return (
        <div className="relative">
            <PageHeader
                title="Employees List"
                subtitle="Hi, Name. Here you can easily manage employees!"
                searchbar={true}
                buttonText="Add Employee"
                dataList={employeeList}
                handleFilteredData={handleFilteredData}
                href="/employees/add"
            />
            {isMobile ? (
                <div className="flex flex-col gap-4 ">
                    {filteredEmployeeList.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                        />
                    ))}
                </div>
            ) : (
                <table className="w-full text-left">
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
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Employees;
