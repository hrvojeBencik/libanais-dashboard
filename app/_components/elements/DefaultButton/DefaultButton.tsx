interface ButtonProps {
    className?: string;
    text?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton = ({ className, text, onClick }: ButtonProps) => {
    return (
        <button
            className={`${className} border bg-brown-derby bg-opacity-50 font-bold text-raisin-black`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default DefaultButton;
