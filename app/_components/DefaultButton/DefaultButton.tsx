interface ButtonProps {
    className?: string;
    text?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton = ({ className, text, onClick, type }: ButtonProps) => {
    return (
        <button
            className={`${className} bg-albescent-white text-brown-derby font-medium`}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};

export default DefaultButton;
