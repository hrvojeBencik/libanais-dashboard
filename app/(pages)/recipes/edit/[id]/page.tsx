// app/recipes/[id]/edit.tsx

"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";
import { DataContext } from "@/app/_contexts/DataContext";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import { Recipe } from "@/app/_interfaces/Recipe";

const EditRecipePage = () => {
    const { id } = useParams();
    const { recipeList } = useContext(DataContext);

    if (!id || typeof id !== "string") {
        return <div>Invalid recipe ID</div>;
    }

    const recipe: Recipe | undefined = recipeList.find(
        (recipe) => recipe.id === id
    );

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return <RecipeForm recipe={recipe} />;
};

export default EditRecipePage;
