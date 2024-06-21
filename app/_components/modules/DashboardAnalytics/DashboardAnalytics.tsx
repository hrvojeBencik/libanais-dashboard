"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/app/_contexts/DataContext";
import { calculateChangePercentage } from "@/app/_utils/calculateChangePercentage";
import { checkAndUpdateSummary } from "@/app/_utils/checkAndUpdateSummary";
import StatisticCard from "../../elements/StatisticCard/StatisticCard";

interface DashboardAnalyticsProps {
    className?: string;
    analytics?: boolean;
}

const DashboardAnalytics = ({
    className,
    analytics,
}: DashboardAnalyticsProps) => {
    const { employeeList, recipeList, employeeSummary, recipeSummary } =
        useContext(DataContext);
    const [recipeChangePercentage, setRecipeChangePercentage] = useState(0);
    const [chefChangePercentage, setChefChangePercentage] = useState(0);
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    ); // Initialize with current date

    useEffect(() => {
        if (recipeList.length > 0) {
            checkAndUpdateSummary(
                "recipeSummary",
                recipeList,
                "date",
                "totalRecipes"
            );
        }
    }, [recipeList]);

    useEffect(() => {
        if (employeeList.length > 0) {
            checkAndUpdateSummary(
                "employeeSummary",
                employeeList,
                "date",
                "totalChefs",
                (employee) => employee.rank.toLowerCase() === "chef"
            );
        }
    }, [employeeList]);

    useEffect(() => {
        setRecipeChangePercentage(
            calculateChangePercentage(recipeList, recipeSummary, "totalRecipes")
        );
    }, [recipeList, recipeSummary]);

    useEffect(() => {
        setChefChangePercentage(
            calculateChangePercentage(
                employeeList,
                employeeSummary,
                "totalChefs",
                (employee) => employee.rank.toLowerCase() === "chef"
            )
        );
    }, [employeeList, employeeSummary]);

    // Handle date selection from dropdown
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    // Filtered total count based on selected date
    const filteredTotalRecipes =
        recipeSummary.find((summary) => summary.id === selectedDate)
            ?.totalRecipes || 0;
    const filteredTotalChefs =
        employeeSummary.find((summary) => summary.id === selectedDate)
            ?.totalChefs || 0;

    return (
        <>
            {analytics && (
                <div className="flex gap-x-2 items-center mb-4">
                    <label htmlFor="dateSelect">Select Date:</label>
                    <select
                        id="dateSelect"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={selectedDate}
                        onChange={handleDateChange}
                    >
                        {Array.from({ length: 5 }).map((_, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() - index);
                            const formattedDate = date
                                .toISOString()
                                .split("T")[0];
                            return (
                                <option
                                    key={formattedDate}
                                    value={formattedDate}
                                >
                                    {formattedDate}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )}

            <div className="flex gap-[18px] sm:gap-4 sm:flex-col">
                <StatisticCard
                    title="Total Recipes"
                    number={filteredTotalRecipes}
                    percentage={analytics ? 0 : recipeChangePercentage}
                    includeDays={analytics ? false : true}
                    className={className}
                />
                <StatisticCard
                    title="Total Chefs"
                    number={filteredTotalChefs}
                    percentage={analytics ? 0 : chefChangePercentage}
                    includeDays={analytics ? false : true}
                    className={className}
                />
            </div>
        </>
    );
};

export default DashboardAnalytics;
