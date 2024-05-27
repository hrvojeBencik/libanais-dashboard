"use client";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import useOpenForm from "@/app/_helpers/useOpenForm";
import { loadData } from "@/app/_utils/loadData";
import { useState, useEffect } from "react";
import { Recipe } from "@/app/_interfaces/Recipe";

const Recipes = () => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [recipeToUpdate, setRecipeToUpdate] = useState<Recipe[]>([]);
    const [filteredRecipeList, setFilteredRecipeList] =
        useState<Recipe[]>(recipeList);

    useEffect(() => {
        setIsUpdated(false);
        loadData("recipeList", setRecipeList);
    }, [isOpen, isUpdated]);

    const handleFilteredData = (filteredData: Recipe[]) => {
        setFilteredRecipeList(filteredData);
    };

    const updateRecipe = () => {
        setIsUpdated(true);
    };

    return (
        <div className="">
            <RecipeForm
                handleClose={handleClose}
                className={`${isOpen ? "form-visible" : "form-hidden"}`}
                recipe={recipeToUpdate}
                updateRecipe={updateRecipe}
                setRecipeToUpdate={setRecipeToUpdate}
            />
            <div className={`${isOpen ? "page-hidden" : "slide"}`}>
                <PageHeader
                    title="Recipe List"
                    subtitle="Hi, Name. Easily manage and add recipes!"
                    buttonText="Add Recipes"
                    handleOpen={handleOpen}
                    dataList={recipeList}
                    handleFilteredData={handleFilteredData}
                    className=""
                />
                <div className=" mt-8 sm:mt-6 flex flex-col gap-[36px] sm:gap-[22px]">
                    {filteredRecipeList.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            updateRecipe={updateRecipe}
                            setRecipeToUpdate={setRecipeToUpdate}
                            handleOpen={handleOpen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recipes;
