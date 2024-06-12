// Home.tsx
"use client";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./_contexts/DataContext";
import { calculateChangePercentage } from "./_utils/calculateChangePercentage";
import { checkAndUpdateSummary } from "./_utils/checkAndUpdateSummary";
import StatisticCard from "./_components/elements/StatisticCard/StatisticCard";
import PageHeader from "./_components/modules/PageHeader/PageHeader";

export default function Home() {
    const { employeeList, recipeList, employeeSummary, recipeSummary } =
        useContext(DataContext);
    const [currentRecipeCount, setCurrentRecipeCount] = useState(0);
    const [recipeChangePercentage, setRecipeChangePercentage] = useState(0);
    const [chefChangePercentage, setChefChangePercentage] = useState(0);

    useEffect(() => {
        if (recipeList.length > 0) {
            checkAndUpdateSummary(
                "recipeSummary",
                recipeList,
                "date",
                "totalRecipes"
            );
            setCurrentRecipeCount(recipeList.length);
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

    return (
        <main className="">
            <PageHeader
                title="Dashboard"
                subtitle="Hi, Name. Welcome back to Libanais Dashboard!"
                searchbar={true}
            />
            <div className="flex gap-[18px] sm:gap-4 sm:flex-col">
                <StatisticCard
                    title="Total Packages"
                    number={750}
                    percentage={5}
                    includeDays={true}
                />
                <StatisticCard
                    title="Total Recipes"
                    number={currentRecipeCount}
                    percentage={recipeChangePercentage}
                    includeDays={true}
                />
                <StatisticCard
                    title="Total Chefs"
                    number={
                        employeeList.filter(
                            (employee) => employee.rank.toLowerCase() === "chef"
                        ).length
                    }
                    percentage={chefChangePercentage}
                    includeDays={true}
                />
            </div>
        </main>
    );
}
