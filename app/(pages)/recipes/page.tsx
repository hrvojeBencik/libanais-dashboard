"use client";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/app/_contexts/SidebarContext";
import { Recipe } from "@/app/_interfaces/Recipe";
import { DataContext } from "@/app/_contexts/DataContext";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";

const Recipes = () => {
    const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;
    const { recipeList } = useContext(DataContext);
    const { setOpenSidebar } = useContext(SidebarContext);
    const [filteredRecipeList, setFilteredRecipeList] =
        useState<Recipe[]>(recipeList);

    const controlPageOnResize = () => {
        const width = window.innerWidth;
        setOpenSidebar(!(width < SCREEN_WIDTH_LIMIT_FOR_MOBILE));
    };

    useEffect(() => {
        window.addEventListener("resize", controlPageOnResize);

        controlPageOnResize();

        return () => {
            window.removeEventListener("resize", controlPageOnResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilteredRecipeList(recipeList);
    }, [recipeList]);

    const handleFilteredData = (filteredData: Recipe[]) => {
        setFilteredRecipeList(filteredData);
    };

    return (
        <div className="relative">
            <div>
                <PageHeader
                    title="Recipe List"
                    subtitle="Hi, Name. Easily manage and add recipes!"
                    searchbar={true}
                    buttonText="Add Recipes"
                    dataList={recipeList}
                    handleFilteredData={handleFilteredData}
                    href="/recipes/add"
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
    );
};

export default Recipes;
