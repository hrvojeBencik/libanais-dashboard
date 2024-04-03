"use client";
import Card from "../../elements/Card/Card";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import FormHeader from "../../elements/FormHeader/FormHeader";
import Modal from "../../elements/Modal/Modal";
import ImageInput from "../ImageInput/ImageInput";
import { useState } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/firebase";

interface EmployeeFormProps {
    text?: string;
    handleClose: () => void;
    url?: string;
}

interface FormValues {
    name: string;
    position: string;
    pin: string;
    photo: File | string | null;
}

const EmployeeForm = ({ text, handleClose, url }: EmployeeFormProps) => {
    const [previewPhoto, setPreviewPhoto] = useState(url || "");
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [file, setFile] = useState<File | null>(null);
    const [sendingForm, setSendingForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formErrors, setFormErrors] = useState({
        name: "",
        position: "",
        pin: "",
        photo: "",
    });

    function getDefaultFormValues(): FormValues {
        return {
            name: "",
            position: "",
            pin: "",
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
        const docRef = await addDoc(collection(db, "employeeList"), {
            ...formValues,
            photo: "", // Initially set photo to empty string
        });

        const employeeId = docRef.id;

        try {
            if (file) {
                const fileRef = ref(
                    storage,
                    `employees/${employeeId}/${file.name}`
                );
                const snapshot = await uploadBytes(fileRef, file);
                photoUrl = await getDownloadURL(fileRef);

                await updateDoc(doc(db, "employeeList", docRef.id), {
                    photo: photoUrl,
                });
            }
        } catch (error) {
            console.log(error);
        }

        setFormValues({
            name: "",
            position: "",
            pin: "",
            photo: "",
        });
        clearPreview();
        handleClose();
        setSendingForm(true);
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
                        Name
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="name"
                        required
                        value={formValues.name}
                        onChange={handleInputChange}
                        placeholder="Enter Full Name..."
                    />

                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Position
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="position"
                        required
                        value={formValues.position}
                        onChange={handleInputChange}
                        placeholder="Enter Position..."
                    />

                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        PIN
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="pin"
                        required
                        value={formValues.pin}
                        onChange={handleInputChange}
                        placeholder="Enter 4-Digit Pin..."
                    />

                    <ImageInput
                        previewPhoto={previewPhoto}
                        handleInputChange={handleInputChange}
                        clearPreview={clearPreview}
                    />

                    <DefaultButton
                        text="Add Employee"
                        className="mt-32 mx-auto rounded-2xl px-28 py-6 text-2xl"
                        type="submit"
                    />
                </form>
            </Card>
        </Modal>
    );
};

export default EmployeeForm;