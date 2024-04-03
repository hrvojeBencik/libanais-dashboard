interface ButtonProps {
    className?: string;
    text?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const DefaultButton = ({
    className,
    text,
    onClick,
    type,
    children,
}: ButtonProps) => {
    return (
        <button
            className={`${className}  ${
                children
                    ? " "
                    : "bg-brown-derby bg-opacity-50 border  font-bold text-raisin-black"
            }`}
            onClick={onClick}
            type={type}
        >
            {text}
            {children}
        </button>
    );
};

export default DefaultButton;
