"use client";
import { useEffect, useState, useContext } from "react";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import { Ingredient } from "@/app/_interfaces/Ingredient";
import { InputType } from "../../elements/InputField/InputField";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { FormContext } from "@/app/_contexts/FormContext";
import { DataContext } from "@/app/_contexts/DataContext";
import validateForm from "@/app/_utils/validateForm";
import Header from "../../elements/Header/Header";
import InputField from "../../elements/InputField/InputField";
import TextareaField from "../../elements/TextareaField/TextareaField";
import IngredientForm from "../IngredientForm/IngredientForm";
import ImageInput from "../ImageInput/ImageInput";
import FormButtons from "../../elements/FormButtons/FormButtons";
import DotsLoader from "../../elements/DotsLoader/DotsLoader";

interface RecipeFormProps {
    className?: string;
    recipe?: any;
}

const RecipeForm = ({ className, recipe }: RecipeFormProps) => {
    const { setOpenForm, editFormData, setEditFormData } =
        useContext(FormContext);
    const { refreshData } = useContext(DataContext);
    const [previewPhoto, setPreviewPhoto] = useState(
        editFormData?.imageUrl || ""
    );
    const [closeForm, setCloseForm] = useState(false);
    const [formValues, setFormValues] = useState({
        name: editFormData?.name || "",
        description: editFormData?.description || "",
        imageUrl: editFormData?.imageUrl || "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [emptyIngredients, setEmptyIngredients] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: false,
        description: false,
        imageUrl: false,
    });
    const [sendingForm, setSendingForm] = useState(false);

    useEffect(() => {
        if (editFormData) {
            setFormValues({
                name: editFormData.name || "",
                description: editFormData.description || "",
                imageUrl: editFormData.imageUrl || "",
            });
            setPreviewPhoto(editFormData.imageUrl);
            setIngredientList(editFormData.ingredients || []);
        }
    }, [editFormData]);

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
        setFormValues({
            name: "",
            description: "",
            imageUrl: "",
        });
        setPreviewPhoto("");
        setIngredientList([]);
        setEditFormData(null);
        setOpenForm(false);
        setCloseForm(true);
        window.scrollTo(0, 0);
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

        try {
            if (editFormData && editFormData.id) {
                await updateDoc(doc(db, "recipeList", editFormData.id), {
                    ...formValues,
                    ingredients: ingredientList.map((ingredient) => ({
                        ...ingredient,
                        lotNumber: "",
                        quantityHalf: "",
                    })),
                });

                if (file) {
                    const fileRef = ref(
                        storage,
                        `recipes/${editFormData.id}/image.jpeg`
                    );
                    await uploadBytes(fileRef, file);
                    const photoUrl = await getDownloadURL(fileRef);

                    await updateDoc(doc(db, "recipeList", editFormData.id), {
                        imageUrl: photoUrl,
                    });
                }
            } else {
                const docRef = await addDoc(collection(db, "recipeList"), {
                    id: "",
                    ...formValues,
                    ingredients: ingredientList.map((ingredient) => ({
                        ...ingredient,
                        lotNumber: "",
                        quantityHalf: "",
                    })),
                    date: new Date().toISOString(),
                    imageUrl: "",
                });

                const recipeId = docRef.id;

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
            }
        } catch (error) {
            console.log(error);
        } finally {
            refreshData();
            handleCloseForm();
            setSendingForm(false);
        }
    };

    return (
        <div className={`${className} wrapper pl-[18px] sm:p-4 `}>
            <Header
                title={recipe ? "Edit Recipe" : "Add Recipe"}
                subtitle={`Hi, Name. Let's ${
                    recipe ? "edit reicpe in" : "add a new recipe to"
                }  your inventory!`}
            />
            <form
                onSubmit={handleSubmit}
                action=""
                className="mt-[58.5px] sm:mt-6"
                name="recipeForm"
            >
                <div className="flex sm:flex-col">
                    <div className="flex flex-col w-[52%] sm:w-full">
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
                        className="pl-[92px] sm:px-0 sm:w-full"
                        previewPhoto={previewPhoto}
                        handleInputChange={handleInputChange}
                        error={formErrors.imageUrl}
                    />
                </div>
                <IngredientForm
                    setIngredientList={setIngredientList}
                    emptyIngredients={emptyIngredients}
                    setEmptyIngredients={setEmptyIngredients}
                    ingredientList={ingredientList}
                    closeForm={closeForm}
                />
                {sendingForm && <DotsLoader className="top-16" />}
                <FormButtons
                    className="mt-[160px] sm:mt-6"
                    text="Recipe"
                    handleCloseForm={handleCloseForm}
                />
            </form>
        </div>
    );
};

export default RecipeForm;
