import Card from "../../elements/Card/Card";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import FormHeader from "../../elements/FormHeader/FormHeader";
import Modal from "../../elements/Modal/Modal";
import ImageInput from "../ImageInput/ImageInput";
import { db, storage } from "../../../firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";

interface IngredientFormProps {
    text?: string;
    handleClose: () => void;
    url?: string;
}

interface FormValues {
    ingredient: string;
    photo: File | string | null;
}

const IngredientForm = ({ text, handleClose, url }: IngredientFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(url || "");
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [file, setFile] = useState<File | null>(null);
    const [sendingForm, setSendingForm] = useState(false);

    function getDefaultFormValues(): FormValues {
        return {
            ingredient: "",
            photo: "",
        };
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Prevents user from changing input fields while form is sending
        if (sendingForm) {
            return;
        }

        const { name, value, files } = e.target;

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

        setSendingForm(true);

        let photoUrl = "";
        const docRef = await addDoc(collection(db, "ingredientList"), {
            ...formValues,
            date: new Date().toISOString(),
            quantity: "0",
            photo: "", // Initially set photo to empty string
        });

        const ingredientId = docRef.id;

        try {
            if (file) {
                const fileRef = ref(
                    storage,
                    `ingredients/${ingredientId}/${file.name}`
                );
                const snapshot = await uploadBytes(fileRef, file);
                photoUrl = await getDownloadURL(fileRef);

                await updateDoc(doc(db, "ingredientList", docRef.id), {
                    photo: photoUrl,
                });
            }
        } catch (error) {
            console.log(error);
        }

        setFormValues({
            ingredient: "",
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
                    action=""
                    className="flex flex-col min-w-[1070px] gap-10"
                    onSubmit={handleSubmit}
                >
                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Ingredient Name
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="ingredient"
                        required
                        value={formValues.ingredient}
                        onChange={handleInputChange}
                        placeholder="Enter Ingredient Name..."
                    />

                    <ImageInput
                        previewPhoto={previewPhoto}
                        handleInputChange={handleInputChange}
                        clearPreview={clearPreview}
                    />
                    <DefaultButton
                        type="submit"
                        text="Add Ingredient"
                        className="mt-64 mx-auto rounded-2xl px-28 py-6 text-2xl"
                    />
                </form>
            </Card>
        </Modal>
    );
};

export default IngredientForm;
