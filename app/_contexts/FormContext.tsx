import { Dispatch, SetStateAction, createContext } from "react";

interface FormContextType {
    openForm: boolean;
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    editFormData: any;
    setEditFormData: Dispatch<SetStateAction<any>>;
}

export const FormContext = createContext<FormContextType>({
    openForm: false,
    setOpenForm: () => {},
    editFormData: {},
    setEditFormData: () => {},
});
