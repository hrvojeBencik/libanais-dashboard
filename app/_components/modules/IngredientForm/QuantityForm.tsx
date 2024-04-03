"use client";
import Modal from "../../elements/Modal/Modal";
import Card from "../../elements/Card/Card";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import FormHeader from "../../elements/FormHeader/FormHeader";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

interface QunatityFormProps {
    text?: string;
    id: string;
    handleQuantityClose: () => void;
}

interface FormValues {
    quantity: string;
}

const QuantityForm = ({ text, handleQuantityClose, id }: QunatityFormProps) => {
    const [formValues, setFormValues] = useState(getDefaultFormValues());
    const [sendingForm, setSendingForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        quantity: "",
    });

    function getDefaultFormValues(): FormValues {
        return {
            quantity: "",
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
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSendingForm(true);

        await updateDoc(doc(db, "ingredientList", id), {
            quantity: formValues.quantity,
        });

        setFormValues({
            quantity: "",
        });

        handleQuantityClose();
    };

    return (
        <Modal>
            <Card>
                <FormHeader
                    text={text}
                    handleClose={handleQuantityClose}
                />
                <form
                    action=""
                    className="flex flex-col min-w-[1070px] gap-10"
                    onSubmit={handleSubmit}
                >
                    <label className="font-medium text-3xl text-grey-eclipse text-left">
                        Quantity
                    </label>
                    <input
                        className="p-4 border rounded-lg"
                        type="text"
                        name="quantity"
                        required
                        value={formValues.quantity}
                        onChange={handleInputChange}
                        placeholder="Enter Ingredient Quantity..."
                    />

                    <DefaultButton
                        type="submit"
                        text="Change Qunatity"
                        className="mt-64 mx-auto rounded-2xl px-28 py-6 text-2xl"
                    />
                </form>
            </Card>
        </Modal>
    );
};

export default QuantityForm;
