"use client";
import { useState } from "react";

interface FormValues {
    [key: string]: any;
}

interface FormHandlers {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
}

const useFormValues = (initialFormValues: FormValues) => {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((previousFormValues) => ({
            ...previousFormValues,
            [name]: value,
        }));
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

    return {
        formValues,
        handleInputChange,
        handleDescriptionChange,
    };
};

export default useFormValues;