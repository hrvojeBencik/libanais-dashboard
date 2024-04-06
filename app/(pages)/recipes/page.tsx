"use client";
import { useState, useEffect } from "react";
import ListCard from "@/app/_components/elements/ListCard/ListCard";
import { Recipe } from "@/app/_interfaces/Recipe";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import FormController from "@/app/_components/modules/FormController/FormController";
import { loadData } from "@/app/_utils/loadData";

const Recipes = () => {
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        loadData("recipeList", handleLoadedData);
    }, []);

    const handleLoadedData = (data: any) => {
        setRecipeList(data);
    };

    return (
        <div>
            <FormController
                title="Recipe List"
                subtitle="Easily manage and add recipes!"
                buttonLabel="Add Recipe"
                formComponent={RecipeForm}
                text="Add Recipe"
            />

            <div className="grid grid-cols-3 gap-7">
                {recipeList.map((recipe, key) => (
                    <ListCard
                        key={key}
                        header={recipe.recipe}
                        text="Total Ingredients"
                        subtext={recipe.ingredients}
                        image={recipe.photo}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recipes;
