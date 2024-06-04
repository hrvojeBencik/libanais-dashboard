interface ButtonProps {
    className?: string;
    text?: string;
    type?: "button" | "submit" | "reset";
    light?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const DefaultButton = ({
    className,
    text,
    onClick,
    type,
    light,
    children,
}: ButtonProps) => {
    return (
        <button
            className={`${className} ${
                light
                    ? " bg-white border-2 border-albescent-white"
                    : " bg-albescent-white"
            } text-brown-derby font-medium hover:text-brown-coffee`}
            onClick={onClick}
            type={type}
        >
            {text}
            {children}
        </button>
    );
};

export default DefaultButton;
