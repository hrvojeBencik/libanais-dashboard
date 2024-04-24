import React from "react";
import { useState } from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import Bin from "public/assets/svg/bin";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import InputField from "../../elements/InputField/InputField";
import IngredientButton from "./IngredientButton/IngredientButton";

interface FormValues {
    ingredient: string;
    amount: string;
    unit: string;
}

const IngredientForm = () => {
    const [ingredients, setIngredients] = useState<FormValues[]>([]);
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [unit, setUnit] = useState("grams");

    function getDefaultFormValues(): FormValues {
        return {
            ingredient: "",
            amount: "",
            unit: "",
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputChangeHandler(e, setFormValues);
    };

    const handleButtonClick = (unit: string) => {
        return () => {
            setUnit(unit);
        };
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            { ...formValues, unit: unit },
        ]);
        setFormValues(getDefaultFormValues());
        setUnit("grams");
    };

    const handleRemoveIngredient = (key: number) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((_, i) => i !== key)
        );
    };

    return (
        <form
            className="mt-[17.5px]"
            onSubmit={handleSubmit}
            name="ingredientForm"
        >
            <p className="mb-[53.5px] text-[20.25px] font-semibold tracking-tight leading-snug">
                Ingredients
            </p>
            <div className="flex max-h-[364px] ">
                <div className="flex flex-col w-[52%]">
                    <InputField
                        label="Ingredient Name"
                        type="text"
                        placeholder="Enter the ingredient name"
                        name="ingredient"
                        value={formValues.ingredient}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="flex gap-5 mt-[8px] items-end">
                        <div className="flex-column">
                            <InputField
                                label="Amount"
                                type="number"
                                placeholder="500"
                                name="amount"
                                value={formValues.amount}
                                onChange={handleInputChange}
                                required
                                className="[&::-webkit-inner-spin-button]:appearance-none "
                            />
                        </div>
                        <div className="mb-7 w-full h-fit pl-[18px] pt-[18px] pb-[18px] text-[18px] rounded-[13.5px] bg-albescent-white text-brown-coffee">
                            {unit}
                        </div>
                    </div>

                    <div className="flex justify-between mb-[42px] gap-[20px]">
                        <IngredientButton
                            label="Dry Ingredients"
                            onClick={handleButtonClick("grams")}
                        />
                        <IngredientButton
                            label="Nuts"
                            onClick={handleButtonClick("grams")}
                        />
                        <IngredientButton
                            label="Wet Ingredients"
                            onClick={handleButtonClick("ml")}
                        />
                    </div>
                    <DefaultButton
                        text="Add Ingredient"
                        type="submit"
                        className="p-2.5 rounded-[13.5px] "
                    />
                </div>
                <div className="flex-column w-1/2 pl-[92px] box-border">
                    <p className="font-medium mt-3.5 mb-2 tracking-tight text-[18px]">
                        Ingredients
                    </p>
                    <div className=" bg-albescent-white text-brown-coffee h-full overflow-auto text-[18px] rounded-[13.5px] p-[18px] min-h-[336px]">
                        {ingredients.length
                            ? ingredients.map((ingredient, key) => (
                                  <div
                                      key={key}
                                      className="flex w-3/4 justify-between"
                                  >
                                      {ingredient.ingredient} -{" "}
                                      {ingredient.amount} {ingredient.unit}
                                      <Bin
                                          onClick={() => {
                                              handleRemoveIngredient(key);
                                          }}
                                      />
                                  </div>
                              ))
                            : "Used Ingredients"}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default IngredientForm;
