"use client";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import useOpenForm from "@/app/_helpers/useOpenForm";
import { useEffect } from "react";
import { loadData } from "@/app/_utils/loadData";
import { useState } from "react";
import { Recipe } from "@/app/_interfaces/Recipe";

const Recipes = () => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        setIsUpdated(false);
        loadData("recipeList", setRecipeList);
    }, [isOpen, isUpdated]);

    const updateRecipe = () => {
        setIsUpdated(true);
    };
    return (
        <div className="w-full pt-[40.5px]">
            {isOpen ? (
                <RecipeForm handleClose={handleClose} />
            ) : (
                <div className="pl-16 pr-6 relative">
                    <PageHeader
                        title="Recipe List"
                        subtitle="Hi, Name. Easily manage and add recipes!"
                        handleOpen={handleOpen}
                    />
                    <div className=" box-border">
                        {recipeList.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                name={recipe.name}
                                description={recipe.description}
                                ingredients={recipe.ingredients}
                                image={recipe.imageUrl}
                                updateRecipe={updateRecipe}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipes;
