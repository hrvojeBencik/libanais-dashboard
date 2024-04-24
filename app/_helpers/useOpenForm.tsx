"use client";
import { useState } from "react";

const useOpenForm = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return [isOpen, handleOpen, handleClose];
};

export default useOpenForm;
