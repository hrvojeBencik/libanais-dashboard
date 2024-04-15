"use client";
import { useState, useEffect } from "react";
import PageHeader from "./_components/elements/PageHeader/PageHeader";
import { Employee } from "./_interfaces/Employee";
import { Recipe } from "./_interfaces/Recipe";
import { Ingredient } from "./_interfaces/Ingredient";
import { loadData } from "./_utils/loadData";
import ListCard from "./_components/elements/ListCard/ListCard";
import IngredientsImage from "public/assets/eggs.png";
import RecipesImage from "public/assets/food.png";
import EmployeesImage from "public/assets/profile.png";
import ChefsImage from "public/assets/chefs.png";

export default function Home() {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    const [previousRecipeCount, setPreviousRecipeCount] = useState(0);
    const [recipeCountDifference, setRecipeCountDifference] = useState(0);
    const [currentRecipeCount, setCurrentRecipeCount] = useState(0);
    const [percentageChange, setPercentageChange] = useState<number>(0);

    useEffect(() => {
        loadData("recipeList", setRecipeList);
        loadData("ingredientList", setIngredientList);
        loadData("employeeList", setEmployeeList);
    }, []);

    useEffect(() => {
        // Calculate the count of recipes in the past 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recipesInPast30Days = recipeList.filter(
            (recipe) => new Date(recipe.date) > thirtyDaysAgo
        );

        // Set current recipe count
        setCurrentRecipeCount(recipeList.length);

        // Set previous recipe count
        setPreviousRecipeCount(recipesInPast30Days.length);

        // Calculate the difference in counts
        const difference = currentRecipeCount - previousRecipeCount;
        setRecipeCountDifference(difference);

        // Calculate percentage change
        const percentage = ((difference / previousRecipeCount) * 100).toFixed(
            2
        );
        setPercentageChange(parseFloat(percentage));
    }, [recipeList]);
    //console.log(percentageChange);
    console.log(recipeCountDifference);
    console.log(currentRecipeCount);
    console.log(previousRecipeCount);

    return (
        <main>
            <PageHeader
                title="Dashboard"
                subtitle="Hi, John. Welcome back  to Libanais Dashboard!"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <ListCard
                    header={ingredientList.length}
                    image={IngredientsImage}
                    text="Total Ingedients"
                    subtext="(30 days)"
                />
                <ListCard
                    header={recipeList.length}
                    image={RecipesImage}
                    text="Total Recipes"
                    subtext="(30 days)"
                />
                <ListCard
                    header={employeeList.length}
                    image={EmployeesImage}
                    text="Total Employees"
                    subtext="(30 days)"
                />
                <ListCard
                    header={
                        employeeList.filter(
                            (employee) =>
                                employee.position.toLowerCase() ===
                                "executive chef"
                        ).length
                    }
                    image={ChefsImage}
                    text="Total Chefs"
                    subtext="(30 days)"
                />
            </div>
        </main>
    );
}
