import FormButtons from "../../elements/FormButtons/FormButtons";

interface EmployeeFormProps {
    handleClose: boolean | (() => void);
}
const EmployeeForm = ({ handleClose }: EmployeeFormProps) => {
    const handleCloseForm = () => {
        if (typeof handleClose === "function") {
            handleClose();
        }
    };

    return (
        <div>
            <FormButtons
                text="Employee"
                handleCloseForm={handleCloseForm}
            />
        </div>
    );
};

export default EmployeeForm;
