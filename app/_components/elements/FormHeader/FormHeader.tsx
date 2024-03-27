import ArrowLeft from "@/public/assets/svg/arrow-left";
import Image from "next/image";

interface FormHeaderProps {
    text?: string;
    handleClose: React.MouseEventHandler<HTMLButtonElement>;
}
const FormHeader = ({ text, handleClose }: FormHeaderProps) => {
    return (
        <div className="pb-16 flex items-center justify-center relative">
            <button
                onClick={handleClose}
                className="absolute left-0"
            >
                <ArrowLeft />
            </button>

            <h4 className="font-medium text-3xl text-grey-eclipse">{text}</h4>
        </div>
    );
};

export default FormHeader;
