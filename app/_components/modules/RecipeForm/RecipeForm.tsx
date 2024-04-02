import Card from "../../elements/Card/Card";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import FormHeader from "../../elements/FormHeader/FormHeader";
import Modal from "../../elements/Modal/Modal";
import PlaceholderIcon from "public/assets/svg/image";
import RemoveIcon from "public/assets/svg/close";
import { useState } from "react";
import { db, storage } from "../../../firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface RecipeFormProps {
    text?: string;
    handleClose: () => void;
    url?: string;
}

interface FormValues {
    recipe: string;
    ingredients: string;
    photo: File | string | null;
}

const RecipeForm = ({ text, handleClose, url }: RecipeFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(url || "");
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [file, setFile] = useState<File | null>(null);
    const [sendingForm, setSendingForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formErrors, setFormErrors] = useState({
        recipe: "",
        ingredients: "",
        photo: "",
    });

    function getDefaultFormValues(): FormValues {
        return {
            recipe: "",
            ingredients: "",
            photo: "",
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Prevents user from changing input fields while form is sending
        if (sendingForm) {
            return;
        }

        const { name, value, files } = e.target;

        //When user starts to edit input field with error, then field error message should disappear
        if (formErrors[name as keyof FormValues]) {
            setFormErrors((previousValues) => ({
                ...previousValues,
                [name]: "",
            }));
        }

        //When user starts to edit input fields, then error/success message should disappear
        if (errorMessage) {
            setErrorMessage("");
        }

        if (successMessage) {
            setSuccessMessage("");
        }

        setFormValues((previousFormValues) => ({
            ...previousFormValues,
            [name]: value,
        }));

        const file = files?.[0];
        if (files) {
            if (file) {
                if (file.size >= 100 * 1024) {
                    console.log("File size exceeds 100KB");

                    const fileInput = document.querySelector(
                        'input[type="file"]'
                    ) as HTMLInputElement;

                    fileInput.value = ""; // Reset the input file field value
                } else {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setPreviewPhoto(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                    setFile(files[0]);
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let photoUrl = "";
        const docRef = await addDoc(collection(db, "recipeList"), {
            ...formValues,
            photo: "", // Initially set photo to empty string
        });

        const recipeId = docRef.id;

        try {
            if (file) {
                const fileRef = ref(
                    storage,
                    `recipes/${recipeId}/${file.name}`
                );
                const snapshot = await uploadBytes(fileRef, file);
                photoUrl = await getDownloadURL(fileRef);

                await updateDoc(doc(db, "recipeList", docRef.id), {
                    photo: photoUrl,
                });
            }
        } catch (error) {
            console.log(error);
        }

        setFormValues({
            recipe: "",
            ingredients: "",
            photo: "",
        });
        clearPreview();
        handleClose();
    };

    const clearPreview = () => {
        setPreviewPhoto(url || "");
        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ""; // Reset the input file field value
        }
    };

    return (
        <Modal>
            <Card>
                <FormHeader
                    text={text}
                    handleClose={handleClose}
                />
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className="flex flex-col min-w-[1070px] gap-3"
                >
                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Recipe Name
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="recipe"
                        required
                        value={formValues.recipe}
                        onChange={handleInputChange}
                        placeholder="Enter Recipe Name..."
                    />

                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Ingredients
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="ingredients"
                        required
                        value={formValues.ingredients}
                        onChange={handleInputChange}
                        placeholder="Enter Ingredients Amount..."
                    />
                    <div className="flex items-center mt-12">
                        <div className="h-24 w-24 mr-5 rounded-full overflow-hidden bg-gray-100">
                            {!previewPhoto && (
                                <PlaceholderIcon className="p-6" />
                            )}
                            {previewPhoto && (
                                <div className="h-24 w-24 rounded-full overflow-hidden">
                                    <img
                                        src={previewPhoto}
                                        alt=""
                                        className="h-24 w-24 "
                                    />
                                </div>
                            )}
                        </div>
                        <div className=" text-left">
                            <label className="font-medium text-xl text-grey-eclipse">
                                Please upload recipe image, size less than 100KB
                            </label>
                            <div>
                                <input
                                    onChange={handleInputChange}
                                    type="file"
                                    accept="image/*"
                                    name="photo"
                                    className="mt-5 ml-2.5  file:border file:bg-white file:rounded-md file:py-2.5 file:px-5 file:mr-8 text-grey-eclipse"
                                />
                                {previewPhoto && (
                                    <button
                                        onClick={clearPreview}
                                        type="button"
                                        aria-label="Remove image"
                                        className="w-4 ml-4"
                                    >
                                        <RemoveIcon className=" [&>*]:stroke-white" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <DefaultButton
                        text="Add Recipe"
                        className="mt-32 mx-auto rounded-2xl px-28 py-6 text-2xl"
                        buttonType="submit"
                    />
                </form>
            </Card>
        </Modal>
    );
};

export default RecipeForm;
