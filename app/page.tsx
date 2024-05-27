"use client";
import { useState, useEffect } from "react";
import { Employee } from "./_interfaces/Employee";
import { Recipe } from "./_interfaces/Recipe";
import { loadData } from "./_utils/loadData";
import DashboardCard from "./_components/elements/DashboardCard.tsx/DashboardCard";
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
    const [currentChefCount, setCurrentChefCount] = useState(0);
    const [recipeChangePercentage, setRecipeChangePercentage] =
        useState<number>(0);
    const [chefChangePercentage, setChefChangePercentage] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            await loadData("recipeList", setRecipeList);
            await loadData("employeeList", setEmployeeList);
            await loadData("employeeSummary", setEmployeeSummary);
            await loadData("recipeSummary", setRecipeSummary);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkAndUpdateRecipeSummary = async () => {
            const currentDate = new Date().toISOString().split("T")[0];
            const recipeSummaryRef = collection(db, "recipeSummary");
            const q = query(
                recipeSummaryRef,
                orderBy("date", "desc"),
                limit(1)
            );

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const latestDocDate = querySnapshot.docs[0].id;
                    if (latestDocDate !== currentDate) {
                        await setDoc(doc(db, "recipeSummary", currentDate), {
                            totalRecipes: recipeList.length,
                            timestamp: serverTimestamp(),
                        });
                    }
                } else {
                    await setDoc(doc(db, "recipeSummary", currentDate), {
                        totalRecipes: recipeList.length,
                        timestamp: serverTimestamp(),
                    });
                }
            } catch (error) {
                console.error(
                    "Error checking and updating recipe summary:",
                    error
                );
            }
        };

        checkAndUpdateRecipeSummary();
        setCurrentRecipeCount(recipeList.length);
    }, [recipeList]);

    useEffect(() => {
        const checkAndUpdateEmployeeSummary = async () => {
            const currentDate = new Date().toISOString().split("T")[0];
            const employeeSummaryRef = collection(db, "employeeSummary");
            const q = query(
                employeeSummaryRef,
                orderBy("date", "desc"),
                limit(1)
            );

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const latestDocDate = querySnapshot.docs[0].id;
                    if (latestDocDate !== currentDate) {
                        const chefsCount = employeeList.filter(
                            (employee) => employee.rank.toLowerCase() === "chef"
                        ).length;
                        await setDoc(doc(db, "employeeSummary", currentDate), {
                            totalChefs: chefsCount,
                            timestamp: serverTimestamp(),
                        });
                    }
                } else {
                    const chefsCount = employeeList.filter(
                        (employee) => employee.rank.toLowerCase() === "chef"
                    ).length;
                    await setDoc(doc(db, "employeeSummary", currentDate), {
                        totalChefs: chefsCount,
                        timestamp: serverTimestamp(),
                    });
                }
            } catch (error) {
                console.error(
                    "Error checking and updating employee summary:",
                    error
                );
            }
        };

        checkAndUpdateEmployeeSummary();
    }, [employeeList]);

    useEffect(() => {
        const calculateRecipeChangePercentage = () => {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

            // Get the recipe summary for three days ago
            const threeDaysAgoSummary = recipeSummary.find(
                (summary) => summary.id === threeDaysAgoDate
            );

            if (threeDaysAgoSummary) {
                const threeDaysAgoCount = threeDaysAgoSummary.totalRecipes || 0;

                // Calculate percentage change
                if (threeDaysAgoCount !== 0) {
                    const currentTotalRecipes = recipeList.length;
                    const difference = currentTotalRecipes - threeDaysAgoCount;
                    const percentage = (
                        (difference / threeDaysAgoCount) *
                        100
                    ).toFixed(2);
                    setRecipeChangePercentage(parseFloat(percentage));
                }
            }
        };

        calculateRecipeChangePercentage();
    }, [recipeList, recipeSummary]);

    useEffect(() => {
        const calculateChefChangePercentage = () => {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

            // Get the recipe summary for three days ago
            const threeDaysAgoSummary = employeeSummary.find(
                (summary) => summary.id === threeDaysAgoDate
            );

            if (threeDaysAgoSummary) {
                const threeDaysAgoCount = threeDaysAgoSummary.totalChefs || 0;

                // Calculate percentage change
                if (threeDaysAgoCount !== 0) {
                    const currentTotalChefs = employeeList.filter(
                        (employee) => employee.rank.toLowerCase() === "chef"
                    ).length;
                    const difference = currentTotalChefs - threeDaysAgoCount;
                    const percentage = (
                        (difference / threeDaysAgoCount) *
                        100
                    ).toFixed(2);
                    setChefChangePercentage(parseFloat(percentage));
                }
            }
        };

        calculateChefChangePercentage();
    }, [employeeList, employeeSummary]);

    return (
        <main className="">
            <PageHeader
                title="Dashboard"
                subtitle="Hi, Name. Welcome back to Libanais Dashboard!"
                searchbarClassName="shadow"
            />
            <div className="flex gap-[18px] mt-8 sm:mt-6 sm:gap-4 sm:flex-col">
                <DashboardCard
                    title="Total Packages"
                    number={750}
                    percentage={5}
                />
                <DashboardCard
                    title="Total Recipes"
                    number={currentRecipeCount}
                    percentage={recipeChangePercentage}
                />
                <DashboardCard
                    title="Total Chefs"
                    number={
                        employeeList.filter(
                            (employee) => employee.rank.toLowerCase() === "chef"
                        ).length
                    }
                    percentage={chefChangePercentage}
                />
            </div>
        </main>
    );
}
