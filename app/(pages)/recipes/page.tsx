"use client";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "@/app/_interfaces/Recipe";
import { FormContext } from "@/app/_contexts/FormContext";
import { DataContext } from "@/app/_contexts/DataContext";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";

const Recipes = () => {
    const { openForm } = useContext(FormContext);
    const { recipeList } = useContext(DataContext);
    const [filteredRecipeList, setFilteredRecipeList] =
        useState<Recipe[]>(recipeList);

    useEffect(() => {
        setFilteredRecipeList(recipeList);
    }, [recipeList]);

    const handleFilteredData = (filteredData: Recipe[]) => {
        setFilteredRecipeList(filteredData);
    };

    return (
        <div className="relative">
            <div>
                <RecipeForm
                    className={`${openForm ? "form-visible" : "form-hidden"}`}
                />
                <div className={` ${openForm ? "page-hidden" : "slide"} `}>
                    <PageHeader
                        title="Recipe List"
                        subtitle="Hi, Name. Easily manage and add recipes!"
                        searchbar={true}
                        buttonText="Add Recipes"
                        dataList={recipeList}
                        handleFilteredData={handleFilteredData}
                    />
                    <div className="flex flex-col gap-[36px] sm:gap-[22px]">
                        {filteredRecipeList.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipes;
