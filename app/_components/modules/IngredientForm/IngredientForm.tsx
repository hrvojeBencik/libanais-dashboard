"use client";
import { useState, useEffect } from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import Bin from "public/assets/svg/bin";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import InputField from "../../elements/InputField/InputField";
import IngredientButton from "./IngredientButton/IngredientButton";
import { Dispatch, SetStateAction } from "react";
import validateForm from "@/app/_utils/validateForm";
import { InputType } from "../../elements/InputField/InputField";

interface IngredientFormProps {
    setIngredientList: Dispatch<SetStateAction<FormValues[]>>;
    emptyIngredients: boolean;
    setEmptyIngredients: Dispatch<SetStateAction<boolean>>;
    ingredientList: any;
    closeForm: boolean;
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
    ingredientList,
    closeForm,
}: IngredientFormProps) => {
    const [ingredients, setIngredients] = useState<FormValues[]>(
        ingredientList || []
    );
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
        const { name } = e.target;

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

    useEffect(() => {
        if (closeForm) {
            setFormValues(getDefaultFormValues());
        }
    }, [closeForm]);

    useEffect(() => {
        if (ingredientList) {
            setIngredients(ingredientList);
        }
    }, [ingredientList]);

    const handleRemoveIngredient = (key: number) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((_, i) => i !== key)
        );
    };

    return (
        <div className="mt-[17.5px] sm:mt-6">
            <p className="mb-[53.5px] sm:mb-4 text-[20.25px] font-semibold tracking-tight leading-snug">
                Ingredients
            </p>
            <div className="flex max-h-[364px] sm:flex-col sm:max-h-fit">
                <div className="flex flex-col w-[52%] sm:w-full">
                    <InputField
                        label="Ingredient Name"
                        type={InputType.Text}
                        placeholder="Enter the ingredient name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        error={formErrors.name}
                    />
                    <InputField
                        label="Amount"
                        type={InputType.Number}
                        placeholder="500"
                        name="quantityFull"
                        value={formValues.quantityFull}
                        onChange={handleInputChange}
                        className="[&::-webkit-inner-spin-button]:appearance-none"
                        error={formErrors.quantityFull}
                    >
                        <div className="w-full pl-[18px] py-[19px] sm:p-3 text-[18px] sm:text-sm rounded-[13.5px] sm:rounded-lg bg-albescent-white text-brown-coffee">
                            {unit}
                        </div>
                    </InputField>

                    <div className="flex justify-between mb-[42px] sm:mb-6 gap-[20px] sm:gap-0">
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
                <div className="flex-column w-1/2 pl-[92px] sm:p-0 box-border sm:w-full">
                    <p className="font-medium mt-3.5 mb-2 tracking-tight text-[18px]">
                        Ingredients
                    </p>
                    <div className=" bg-albescent-white text-brown-coffee h-full overflow-auto text-[18px] sm:text-sm rounded-[13.5px] p-[18px] min-h-[336px]">
                        {ingredients.length
                            ? ingredients.map((ingredient, key) => (
                                  <div
                                      key={key}
                                      className="flex w-3/4 justify-between sm:w-full"
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
                    {emptyIngredients && (
                        <p className="sm:text-sm">Add Ingredients.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IngredientForm;
