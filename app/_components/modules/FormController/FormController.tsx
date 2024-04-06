import PageHeader from "../../elements/PageHeader/PageHeader";
import { useState } from "react";

interface FormControllerProps {
    text: string;
    title: string;
    subtitle: string;
    buttonLabel?: string;
    formComponent: React.ComponentType<any>;
}
const FormController = ({
    text,
    title,
    subtitle,
    buttonLabel,
    formComponent: FormComponent,
}: FormControllerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <PageHeader
                title={title}
                subtitle={subtitle}
                buttonLabel={buttonLabel}
                handleIsOpen={handleIsOpen}
            />

            {isOpen && (
                <FormComponent
                    text={text}
                    handleClose={handleClose}
                />
            )}
        </>
    );
};

export default FormController;
