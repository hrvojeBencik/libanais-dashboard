import DefaultButton from "../DefaultButton/DefaultButton";

interface FormButtonsProps {
    className?: string;
    text: string;
    handleCloseForm: () => void;
}

const FormButtons = ({
    className,
    text,
    handleCloseForm,
}: FormButtonsProps) => {
    return (
        <div className={`${className} flex gap-[51px]`}>
            <DefaultButton
                text="Go Back"
                className="form-button"
                light={true}
                onClick={(e) => {
                    e.preventDefault();
                    handleCloseForm();
                }}
            />

            <DefaultButton
                text={`Save ${text}`}
                type="submit"
                className="form-button"
            />
        </div>
    );
};

export default FormButtons;
