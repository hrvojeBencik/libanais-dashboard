"use client";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import ListCard from "@/app/_components/elements/ListCard/ListCard";

interface Recipe {
    id: string;
    recipe: string;
    ingredients: string;
    photo: string;
}

const Recipes = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        loadRecipeList();
    }, [isOpen]);

    const loadRecipeList = async () => {
        const recipes: Recipe[] = [];
        const snapshot = await getDocs(query(collection(db, "recipeList")));
        snapshot.forEach((doc) => {
            recipes.push({
                id: doc.id,
                ...doc.data(),
            } as Recipe);
        });
        setRecipeList(recipes);
    };

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <PageHeader
                title="Recipe List"
                subtitle="Easily manage and add recipes!"
                buttonLabel="Add Recipe"
                handleIsOpen={handleIsOpen}
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
            {isOpen && (
                <RecipeForm
                    text="Add Recipe"
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default Recipes;
