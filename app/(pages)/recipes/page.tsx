"use client";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
import { useState, useEffect, lazy } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import ListCard from "@/app/_components/elements/ListCard/ListCard";
import { Recipe } from "@/app/_interfaces/Recipe";

const LazyRecipeForm = lazy(
    () => import("@/app/_components/modules/RecipeForm/RecipeForm")
);

const Recipes = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    useEffect(() => {
        loadRecipeList();
    }, [isOpen]);

    const loadRecipeList = async () => {
        const snapshot = await getDocs(query(collection(db, "recipeList")));
        const recipes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Recipe[];
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
                <LazyRecipeForm
                    text="Add Recipe"
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default Recipes;
