interface ButtonProps {
    className?: string;
    text?: string;
    buttonType?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton = ({
    className,
    text,
    onClick,
    buttonType,
}: ButtonProps) => {
    return (
        <button
            className={`${className} border bg-brown-derby bg-opacity-50 font-bold text-raisin-black`}
            onClick={onClick}
            type={buttonType}
        >
            {text}
        </button>
    );
};

export default DefaultButton;
