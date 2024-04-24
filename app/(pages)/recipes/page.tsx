"use client";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";
import PageHeader from "@/app/_components/modules/PageHeader/PageHeader";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";
import useOpenForm from "@/app/_helpers/useOpenForm";
import { SidebarContext } from "@/app/_components/modules/Sidebar/SidebarHandler";
import { useContext, useEffect } from "react";
const Recipes = () => {
    const [isOpen, handleOpen, handleClose] = useOpenForm(false);
    const { setOpenSidebar } = useContext(SidebarContext);

    useEffect(() => {
        setOpenSidebar(!isOpen);
    }, [isOpen]);

    return (
        <div className="w-full pt-[40.5px]">
            {isOpen ? (
                <RecipeForm handleClose={handleClose} />
            ) : (
                <div className="pl-16 pr-6 ">
                    <PageHeader
                        title="Recipe List"
                        subtitle="Hi, Name. Easily manage and add recipes!"
                        handleOpen={handleOpen}
                    />
                </div>
            )}
        </div>
    );
};

export default Recipes;
