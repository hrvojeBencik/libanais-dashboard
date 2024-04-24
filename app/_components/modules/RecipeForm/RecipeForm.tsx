"use client";
import { useState } from "react";
import Header from "../../elements/Header/Header";
import InputField from "../../elements/InputField/InputField";
import TextareaField from "../../elements/TextareaField/TextareaField";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import IngredientForm from "../IngredientForm/IngredientForm";
import ImageInput from "../ImageInput/ImageInput";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";

interface RecipeFormProps {
    handleClose: boolean | (() => void);
    url?: string;
}

interface FormValues {
    recipe: string;
    description: string;
    photo: File | string | null;
    ingredients: string;
}

const RecipeForm = ({ handleClose, url }: RecipeFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(url || "");
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [file, setFile] = useState<File | null>(null);
    // const [sendingForm, setSendingForm] = useState(false);

    const [ingredients, setIngredients] = useState([]);
    function getDefaultFormValues(): FormValues {
        return {
            recipe: "",
            description: "",
            photo: "",
            ingredients: "",
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputChangeHandler(e, setFormValues, setPreviewPhoto, setFile);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormValues((previousFormValues) => ({
            ...previousFormValues,
            [name]: value,
        }));
    };

    // const clearPreview = () => {
    //     setPreviewPhoto(url || "");
    //     const fileInput = document.querySelector(
    //         'input[type="file"]'
    //     ) as HTMLInputElement;
    //     if (fileInput) {
    //         fileInput.value = ""; // Reset the input file field value
    //     }
    // };

    const handleClick = () => {
        if (typeof handleClose === "function") {
            handleClose();
        }
    };

    return (
        <div className="wrapper pl-[18px] ">
            <Header
                title="Add Recipe"
                subtitle="Hi, Name. Let's add a new recipe to your inventory!"
            />
            <form
                onSubmit={() => {}}
                action=""
                className="mt-[58.5px] flex"
                name="recipeForm"
            >
                <div className="flex flex-col w-[52%]">
                    <InputField
                        label="Recipe Name"
                        type="text"
                        name="recipe"
                        required
                        value={formValues.recipe}
                        onChange={handleInputChange}
                        placeholder="Enter the recipe name"
                    />
                    <TextareaField
                        label="Short Description"
                        rows={3}
                        value={formValues.description}
                        name="description"
                        placeholder="Enter recipe's short description"
                        onChange={handleDescriptionChange}
                    />
                </div>
                <ImageInput
                    //clearPreview={clearPreview}
                    className="pl-[92px]"
                    previewPhoto={previewPhoto}
                    handleInputChange={handleInputChange}
                />
            </form>
            <IngredientForm />
            <div className="mt-[180px] flex gap-[51px]">
                <DefaultButton
                    text="Go Back"
                    className="form-button"
                    light={true}
                    onClick={() => {
                        handleClick();
                    }}
                />
                <DefaultButton
                    text="Save Recipe"
                    className="form-button"
                />
            </div>
        </div>
    );
};

export default RecipeForm;
