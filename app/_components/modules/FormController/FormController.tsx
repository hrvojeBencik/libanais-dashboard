import { useState } from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";

interface FormControllerProps {
    text: string;
    buttonLabel?: string;
    formComponent: React.ComponentType<any>;
    children?: React.ReactNode;
}
const FormController = ({
    text,
    buttonLabel,
    formComponent: FormComponent,
    children,
}: FormControllerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className=" relative z-20">
            {buttonLabel && (
                <div className="flex justify-between items-center mb-10">
                    {children}
                    <DefaultButton
                        text={buttonLabel}
                        onClick={handleIsOpen}
                        className="px-16 py-4 rounded-lg h-fit "
                    />
                </div>
            )}
            {isOpen && (
                <FormComponent
                    text={text}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
};

export default FormController;
