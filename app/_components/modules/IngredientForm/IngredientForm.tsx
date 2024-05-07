import React, { useEffect } from "react";
import { useState } from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import Bin from "public/assets/svg/bin";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import InputField from "../../elements/InputField/InputField";
import IngredientButton from "./IngredientButton/IngredientButton";
import { Dispatch, SetStateAction } from "react";
import validateForm from "@/app/_utils/validateForm";
import { error } from "console";

interface IngredientFormProps {
    setIngredientList: Dispatch<SetStateAction<FormValues[]>>;
    emptyIngredients: boolean;
    setEmptyIngredients: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
    name: string;
    quantityFull: number | "";
    unit: string;
}

const IngredientForm = ({
    setIngredientList,
    emptyIngredients,
    setEmptyIngredients,
}: IngredientFormProps) => {
    const [ingredients, setIngredients] = useState<FormValues[]>([]);
    const [unit, setUnit] = useState("grams");
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [formErrors, setFormErrors] = useState({
        name: false,
        quantityFull: false,
    });

    function getDefaultFormValues(): FormValues {
        return {
            name: "",
            quantityFull: "",
            unit: "grams",
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name) {
            setFormErrors((previousValues) => ({
                ...previousValues,
                [name]: false,
            }));
        }
        inputChangeHandler(e, setFormValues);
    };

    const handleButtonClick = (unit: string) => {
        return () => {
            setUnit(unit);
        };
    };

    const handleAddIngredient = () => {
        const errors = validateForm(formValues);

        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        setIngredients((prevIngredients) => [
            ...prevIngredients,
            {
                ...formValues,
                unit: unit,
            },
        ]);
        setFormValues(getDefaultFormValues());
        setUnit("grams");
        setEmptyIngredients(false);
    };

    useEffect(() => {
        setIngredientList(ingredients);
    }, [ingredients]);

    const handleRemoveIngredient = (key: number) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((_, i) => i !== key)
        );
    };

    return (
        <div className="mt-[17.5px]">
            <p className="mb-[53.5px] text-[20.25px] font-semibold tracking-tight leading-snug">
                Ingredients
            </p>
            <div className="flex max-h-[364px] ">
                <div className="flex flex-col w-[52%]">
                    <InputField
                        label="Ingredient Name"
                        type="text"
                        placeholder="Enter the ingredient name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        error={formErrors.name}
                    />
                    <InputField
                        label="Amount"
                        type="number"
                        placeholder="500"
                        name="quantityFull"
                        value={formValues.quantityFull}
                        onChange={handleInputChange}
                        className="[&::-webkit-inner-spin-button]:appearance-none"
                        error={formErrors.quantityFull}
                    >
                        <div className="w-full pl-[18px] py-[19px] text-[18px] rounded-[13.5px] bg-albescent-white text-brown-coffee">
                            {unit}
                        </div>
                    </InputField>

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
                        type="button"
                        onClick={handleAddIngredient}
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
                                      {ingredient.name} -{" "}
                                      {ingredient.quantityFull}{" "}
                                      {ingredient.unit}
                                      <Bin
                                          onClick={() => {
                                              handleRemoveIngredient(key);
                                          }}
                                      />
                                  </div>
                              ))
                            : "Used Ingredients"}
                    </div>
                    {emptyIngredients && <p>Add Ingredients.</p>}
                </div>
            </div>
        </div>
    );
};

export default IngredientForm;
