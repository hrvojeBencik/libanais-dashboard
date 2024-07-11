import { Dispatch, SetStateAction, createContext } from "react";

interface FormContextType {
    editFormData: any;
    setEditFormData: Dispatch<SetStateAction<any>>;
}

export const FormContext = createContext<FormContextType>({
    editFormData: {},
    setEditFormData: () => {},
});
