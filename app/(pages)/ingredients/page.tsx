"use client";
import PageHeader from "@/app/_components/elements/PageHeader/PageHeader";
import IngredientListItem from "@/app/_components/modules/IngredientListItem/IngredientListItem";
import IngredientForm from "@/app/_components/modules/IngredientForm/IngredientForm";
import QuantityForm from "@/app/_components/modules/IngredientForm/QuantityForm";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Ingredient } from "@/app/_interfaces/Ingredient";

const Ingredients = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isQuantityFormOpen, setIsQuantityFormOpen] = useState(false);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");

    useEffect(() => {
        loadIngredientList();
    }, [isOpen, isQuantityFormOpen]);

    const loadIngredientList = async () => {
        const snapshot = await getDocs(query(collection(db, "ingredientList")));
        const ingredients = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Ingredient[];
        setIngredientList(ingredients);
    };

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
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
            <PageHeader
                title="Ingredient List"
                subtitle="Efficienlty manage ingredients!"
                buttonLabel="Add Ingredient"
                handleIsOpen={handleIsOpen}
            />

            <div className="grid grid-cols-4 gap-10">
                {ingredientList.map((ingredient, key) => (
                    <IngredientListItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIsQuantityFormOpen={handleIsQuantityFormOpen}
                    />
                ))}
            </div>

            {isOpen && (
                <IngredientForm
                    text="Add Ingredient"
                    handleClose={handleClose}
                />
            )}
            {isQuantityFormOpen && (
                <QuantityForm
                    id={selectedIngredientId}
                    handleQuantityClose={handleQuantityClose}
                />
            )}
        </div>
    );
};

export default Ingredients;
