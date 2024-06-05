"use client";
import { useState, useEffect } from "react";
import { loadData } from "@/app/_utils/loadData";
import PreparedRecipesChart from "@/app/_components/modules/PreparedRecipesChart/PreparedRecipesChart";
import StatisticCard from "@/app/_components/elements/StatisticCard/StatisticCard";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";

const Analytics = () => {
    const [preparedRecipes, setPreparedRecipes] = useState<any[]>([]);
    const [totalRecipesNumber, setTotalRecipesNumber] = useState(0);
    const [preparedRecipesChartData, setPreparedRecipesChartData] = useState<
        number[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            await loadData("prepared_recipes", setPreparedRecipes);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setTotalRecipesNumber(preparedRecipes.length);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6); // Set to 6 to include today
        startDate.setHours(0, 0, 0, 0); // Normalize startDate to 00:00:00

        // Initialize an array to store the count of recipes prepared each day
        const recipeCounts = new Array(7).fill(0);

        // Count the number of recipes prepared each day of last week
        preparedRecipes.forEach((recipe) => {
            const createdAt = new Date(recipe.createdAt);
            createdAt.setHours(0, 0, 0, 0); // Normalize createdAt to 00:00:00

            if (createdAt >= startDate && createdAt <= endDate) {
                const dayDiff = Math.floor(
                    (createdAt.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                );
                recipeCounts[dayDiff]++;
            }
        });

        setPreparedRecipesChartData(recipeCounts);
    }, [preparedRecipes]);

    return (
        <div className="">
            <PageHeader
                title="Analytics"
                subtitle="Hi, Name. Here you can view and print analytics!"
            />
            <div className="grid grid-cols-2 gap-[19px]">
                <StatisticCard
                    title="Total Recipes Prepared"
                    number={totalRecipesNumber}
                    percentage={0}
                />
                <StatisticCard
                    title="Daily Average Recipes Prepared"
                    number={50}
                    percentage={5}
                />
                <div className="">
                    <PreparedRecipesChart
                        weeklyData={preparedRecipesChartData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
