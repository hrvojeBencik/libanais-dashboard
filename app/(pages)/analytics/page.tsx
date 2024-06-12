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
    const [dailyAverageToday, setDailyAverageToday] = useState(0);
    const [dailyAverageYesterday, setDailyAverageYesterday] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0);
    const [totalRecipesPercentageIncrease, setTotalRecipesPercentageIncrease] =
        useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await loadData("prepared_recipes", setPreparedRecipes);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const totalRecipes = preparedRecipes.length;
        setTotalRecipesNumber(totalRecipes);

        if (totalRecipes === 0) {
            setDailyAverageToday(0);
            setDailyAverageYesterday(0);
            setPercentageIncrease(0);
            setTotalRecipesPercentageIncrease(0);
            return;
        }

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const recipeCounts = new Array(7).fill(0);

        const oldestRecipeDate = new Date(
            Math.min(
                ...preparedRecipes.map((recipe) =>
                    new Date(recipe.createdAt).getTime()
                )
            )
        );
        oldestRecipeDate.setHours(0, 0, 0, 0);

        preparedRecipes.forEach((recipe) => {
            const createdAt = new Date(recipe.createdAt);
            createdAt.setHours(0, 0, 0, 0);

            if (createdAt >= startDate && createdAt <= endDate) {
                const dayDiff = Math.floor(
                    (createdAt.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                );
                recipeCounts[dayDiff]++;
            }
        });

        setPreparedRecipesChartData(recipeCounts);

        const today = new Date();
        const diffTime = Math.abs(today.getTime() - oldestRecipeDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const averageToday = totalRecipes / diffDays;
        setDailyAverageToday(averageToday);

        const totalRecipesYesterday = totalRecipes - recipeCounts[6];
        const diffDaysYesterday = diffDays - 1;

        const averageYesterday = totalRecipesYesterday / diffDaysYesterday;
        setDailyAverageYesterday(averageYesterday);

        const percentage =
            ((averageToday - averageYesterday) / averageYesterday) * 100;
        setPercentageIncrease(Math.round(percentage));

        const totalPercentage =
            ((totalRecipes - totalRecipesYesterday) / totalRecipesYesterday) *
            100;
        setTotalRecipesPercentageIncrease(Math.round(totalPercentage));
    }, [preparedRecipes]);

    return (
        <div className="">
            <PageHeader
                title="Analytics"
                subtitle="Hi, Name. Here you can view and print analytics!"
            />
            <div className="grid grid-cols-2 gap-x-[19px] gap-y-[50px] sm:gap-4">
                <StatisticCard
                    title="Total Recipes Prepared"
                    number={totalRecipesNumber}
                    percentage={totalRecipesPercentageIncrease}
                />
                <StatisticCard
                    title="Daily Average Recipes Prepared Today"
                    number={Math.round(dailyAverageToday)}
                    percentage={percentageIncrease}
                />
                <div className="  sm:col-span-2">
                    <PreparedRecipesChart
                        weeklyData={preparedRecipesChartData}
                        title="Recipes Prepared"
                    />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
