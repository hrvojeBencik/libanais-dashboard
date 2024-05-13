"use client";
import { useEffect, useState } from "react";
import Header from "../../elements/Header/Header";
import InputField from "../../elements/InputField/InputField";
import TextareaField from "../../elements/TextareaField/TextareaField";
import IngredientForm from "../IngredientForm/IngredientForm";
import ImageInput from "../ImageInput/ImageInput";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import { Ingredient } from "@/app/_interfaces/Ingredient";
import validateForm from "@/app/_utils/validateForm";
import { db, storage } from "../../../firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { InputType } from "../../elements/InputField/InputField";
import FormButtons from "../../elements/FormButtons/FormButtons";

interface RecipeFormProps {
    handleClose: boolean | (() => void);
    recipe?: any;
    updateRecipe?: any;
}

interface FormValues {
    name: string;
    description: string;
    imageUrl: string;
    [key: string]: string;
}

const RecipeForm = ({ handleClose, recipe, updateRecipe }: RecipeFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(recipe?.imageUrl || "");
    const [formValues, setFormValues] = useState(
        recipe || getDefaultFormValues()
    );
    const [file, setFile] = useState<File | null>(null);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [emptyIngredients, setEmptyIngredients] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: false,
        description: false,
        imageUrl: false,
    });
    const [sendingForm, setSendingForm] = useState(false);

    function getDefaultFormValues(): FormValues {
        return {
            name: "",
            description: "",
            imageUrl: "",
        };
    }

    const handleInputChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (sendingForm) {
            return;
        }

        const { name } = e.target;

        if ([name]) {
            setFormErrors((previousValues) => ({
                ...previousValues,
                [name]: false,
            }));
        }

        inputChangeHandler(e, setFormValues, setPreviewPhoto, setFile);
    };

    const handleCloseForm = () => {
        if (typeof handleClose === "function") {
            handleClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (sendingForm) {
            return;
        }

        setSendingForm(true);

        const errors = validateForm(formValues);
        setFormErrors(errors);

        if (
            Object.values(errors).some((error) => error) ||
            ingredientList.length < 1
        ) {
            if (ingredientList.length < 1) {
                setEmptyIngredients(true);
            }
            setSendingForm(false);

            return;
        }

        if (recipe) {
            await updateDoc(doc(db, "recipeList", recipe.id), {
                ...formValues,
                ingredients: ingredientList.map((ingredient) => ({
                    ...ingredient,
                    lotNumber: "", //
                    quantityHalf: "",
                })),
            });

            if (file) {
                const fileRef = ref(storage, `recipes/${recipe.id}/image.jpeg`);
                await uploadBytes(fileRef, file);
                const photoUrl = await getDownloadURL(fileRef);

                await updateDoc(doc(db, "recipeList", recipe.id), {
                    imageUrl: photoUrl,
                });
            }
            updateRecipe();
            handleCloseForm();
            setSendingForm(false);
        } else {
            const docRef = await addDoc(collection(db, "recipeList"), {
                id: "",
                ...formValues,
                ingredients: ingredientList.map((ingredient) => ({
                    ...ingredient,
                    lotNumber: "", //
                    quantityHalf: "",
                })),
                date: new Date().toISOString(),
                imageUrl: "", // Initially set photo to empty string
            });

            const recipeId = docRef.id;

            try {
                if (file) {
                    const fileRef = ref(
                        storage,
                        `recipes/${recipeId}/image.jpeg`
                    );
                    await uploadBytes(fileRef, file);
                    const photoUrl = await getDownloadURL(fileRef);

                    await updateDoc(doc(db, "recipeList", docRef.id), {
                        id: docRef.id,
                        imageUrl: photoUrl,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        handleCloseForm();
        setSendingForm(false);
    };

    return (
        <div className="wrapper pl-[18px] ">
            <Header
                title={recipe ? "Edit Recipe" : "Add Recipe"}
                subtitle={`Hi, Name. Let's ${
                    recipe ? "edit reicpe in" : "add a new recipe to"
                }  your inventory!`}
            />
            <form
                onSubmit={handleSubmit}
                action=""
                className="mt-[58.5px]"
                name="recipeForm"
            >
                <div className="flex">
                    <div className="flex flex-col w-[52%]">
                        <InputField
                            label="Recipe Name"
                            type={InputType.Text}
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            placeholder="Enter the recipe name"
                            error={formErrors.name}
                        />
                        <TextareaField
                            label="Short Description"
                            rows={3}
                            value={formValues.description}
                            name="description"
                            placeholder="Enter recipe's short description"
                            onChange={handleInputChange}
                            error={formErrors.description}
                        />
                    </div>
                    <ImageInput
                        className="pl-[92px]"
                        previewPhoto={previewPhoto}
                        handleInputChange={handleInputChange}
                        error={formErrors.imageUrl}
                    />
                </div>
                <IngredientForm
                    setIngredientList={setIngredientList}
                    emptyIngredients={emptyIngredients}
                    setEmptyIngredients={setEmptyIngredients}
                    ingredientList={recipe?.ingredients}
                />
                <FormButtons
                    className="mt-[160px]"
                    text="Recipes"
                    handleCloseForm={handleCloseForm}
                />
            </form>
        </div>
    );
};

export default RecipeForm;
