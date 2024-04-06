"use client";
import IngredientListItem from "@/app/_components/modules/IngredientListItem/IngredientListItem";
import { useState, useEffect } from "react";
import FormController from "@/app/_components/modules/FormController/FormController";
import { Ingredient } from "@/app/_interfaces/Ingredient";
import QuantityForm from "@/app/_components/modules/IngredientForm/QuantityForm";
import IngredientForm from "@/app/_components/modules/IngredientForm/IngredientForm";
import { loadData } from "@/app/_utils/loadData";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";

const Ingredients = () => {
    const [isQuantityFormOpen, setIsQuantityFormOpen] = useState(false);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");

    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

    useEffect(() => {
        loadData("ingredientList", handleLoadedData);
    }, []);

    const handleLoadedData = (data: any) => {
        setIngredientList(data);
    };

    const handleIsQuantityFormOpen = (ingredientId: string) => {
        setSelectedIngredientId(ingredientId);
        setIsQuantityFormOpen(true);
    };

    const handleQuantityClose = () => {
        setIsQuantityFormOpen(false);
    };

    return (
        <div>
            <FormController
                buttonLabel="Add Ingredient"
                formComponent={IngredientForm}
                text="Add Ingerdient"
            >
                <PageHeader
                    title="Ingerdient List"
                    subtitle="Efficiently manage ingredients!"
                />
            </FormController>

            <div className="grid grid-cols-4 gap-10">
                {ingredientList.map((ingredient, key) => (
                    <IngredientListItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIsQuantityFormOpen={handleIsQuantityFormOpen}
                    />
                ))}
            </div>

            {isQuantityFormOpen && (
                <QuantityForm
                    text="Change Quantity"
                    id={selectedIngredientId}
                    handleQuantityClose={handleQuantityClose}
                />
            )}
        </div>
    );
};

export default Ingredients;
