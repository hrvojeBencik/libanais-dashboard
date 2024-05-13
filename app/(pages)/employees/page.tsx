"use client";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import { useState, useEffect } from "react";
import useOpenForm from "@/app/_helpers/useOpenForm";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";

const Employees = () => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        setIsUpdated(false);
    }, [isOpen, isUpdated]);

    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    const updateEmployee = () => {
        setIsUpdated(true);
    };

    return (
        <div className="w-full pt-[40.5px]">
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
                    <table className="w-full text-left mt-4 ">
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
                            <tr>
                                <td>1234</td>
                                <td className="name-row">Alice Johnson</td>
                                <td>Chef</td>
                                <td>alice@libanais.com</td>
                                <td onClick={handleClick}>Edit</td>
                            </tr>
                            <tr>
                                <td>5678</td>
                                <td className="name-row">Bob Smith</td>
                                <td>Sous Chef</td>
                                <td>bob@libanais.com</td>
                                <td onClick={handleClick}>Edit</td>
                            </tr>
                            <tr>
                                <td>9101</td>
                                <td className="name-row">Charlie Davis</td>
                                <td>Kitchen Hand</td>
                                <td>charlie@libanais.com</td>
                                <td onClick={handleClick}>Edit</td>
                            </tr>
                            <tr>
                                <td>1121</td>
                                <td className="name-row">Dorotdy Miller</td>
                                <td>Prep Cook</td>
                                <td>dorotdy@libanais.com</td>
                                <td onClick={handleClick}>Edit</td>
                            </tr>
                            <tr>
                                <td>3141</td>
                                <td className="name-row">Eve Wilson</td>
                                <td>Line Cook</td>
                                <td>eve@libanais.com</td>
                                <td onClick={handleClick}>Edit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Employees;
