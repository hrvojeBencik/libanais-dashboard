interface IngredientButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
}
const IngredientButton = ({ onClick, label }: IngredientButtonProps) => {
    return (
        <button
            className=" min-w-[144px] sm:text-[10px] sm:min-w-fit  py-[6.19px] px-[18px] bg-albescent-white rounded-[13.5px] w-auto font-medium text-black-chocolate"
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    );
};

export default IngredientButton;
