"use client";
import IngredientForm from "@/app/_components/modules/IngredientForm/IngredientForm";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
import { useState } from "react";

const Ingredients = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <PageHeader
                title="Ingredient List"
                subtitle="Efficienlty manage ingredients!"
                buttonLabel="Add Ingredient"
                handleIsOpen={handleIsOpen}
            />

            {isOpen && (
                <IngredientForm
                    text="Add Ingredient"
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default Ingredients;
