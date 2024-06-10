"use client";
import { useState, useEffect } from "react";
import { Employee } from "./_interfaces/Employee";
import { Recipe } from "./_interfaces/Recipe";
import { loadData } from "./_utils/loadData";
import StatisticCard from "./_components/elements/StatisticCard/StatisticCard";
import PageHeader from "./_components/modules/PageHeader/PageHeader";
import { db } from "./firebase";
import {
    query,
    collection,
    orderBy,
    limit,
    getDocs,
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

interface EmployeeSummary {
    id: string;
    date: string;
    totalChefs: number;
}

interface RecipeSummary {
    id: string;
    date: string;
    totalRecipes: number;
}

export default function Home() {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [employeeSummary, setEmployeeSummary] = useState<EmployeeSummary[]>(
        []
    );
    const [recipeSummary, setRecipeSummary] = useState<RecipeSummary[]>([]);
    const [currentRecipeCount, setCurrentRecipeCount] = useState(0);
    const [recipeChangePercentage, setRecipeChangePercentage] =
        useState<number>(0);
    const [chefChangePercentage, setChefChangePercentage] = useState<number>(0);

    const fetchData = async () => {
        try {
            await loadData("recipeList", setRecipeList);
            await loadData("employeeList", setEmployeeList);
            await loadData("employeeSummary", setEmployeeSummary);
            await loadData("recipeSummary", setRecipeSummary);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to check and update summary
    const checkAndUpdateSummary = async (
        collectionName: string,
        list: any[],
        dateKey: string,
        totalKey: string,
        filterCondition?: (item: any) => boolean
    ) => {
        const currentDate = new Date().toISOString().split("T")[0];
        const summaryRef = collection(db, collectionName);
        const q = query(summaryRef, orderBy("date", "desc"), limit(1));

        try {
            const querySnapshot = await getDocs(q);
            const latestDocDate = !querySnapshot.empty
                ? querySnapshot.docs[0].id
                : null;

            const totalCount = filterCondition
                ? list.filter(filterCondition).length
                : list.length;

            if (latestDocDate !== currentDate) {
                await setDoc(doc(db, collectionName, currentDate), {
                    [totalKey]: totalCount,
                    timestamp: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error(
                `Error checking and updating ${collectionName} summary:`,
                error
            );
        }
    };

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

    const calculateChangePercentage = (
        currentList: any[],
        summaryList: any[],
        key: string,
        filterCondition?: (item: any) => boolean
    ) => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

        const threeDaysAgoSummary = summaryList.find(
            (summary) => summary.id === threeDaysAgoDate
        );
        if (threeDaysAgoSummary) {
            const threeDaysAgoCount = threeDaysAgoSummary[key] || 0;
            const currentTotalCount = filterCondition
                ? currentList.filter(filterCondition).length
                : currentList.length;
            if (threeDaysAgoCount !== 0) {
                const difference = currentTotalCount - threeDaysAgoCount;
                const percentage = (
                    (difference / threeDaysAgoCount) *
                    100
                ).toFixed(2);
                return parseFloat(percentage);
            }
        }
        return 0;
    };

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
