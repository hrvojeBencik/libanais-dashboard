import DefaultButton from "../DefaultButton/DefaultButton";
import { Ingredient } from "@/app/_interfaces/Ingredient";
import useOpenForm from "@/app/_helpers/useOpenForm";
import RecipeForm from "../../modules/RecipeForm/RecipeForm";
import { Recipe } from "@/app/_interfaces/Recipe";

interface RecipeCardProps {
    recipe: Recipe;
    updateRecipe: () => void;
}
const RecipeCard = ({ recipe, updateRecipe }: RecipeCardProps) => {
    const ingredientList = recipe.ingredients
        .map((ingredient) => ingredient.name)
        .join(", ");

    const [isOpen, handleOpen, handleClose] = useOpenForm(false);

    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    return (
        <div className="w-full flex bg-white rounded-xl p-[18px] mb-[36px] justify-between">
            <div>
                <h4 className=" text-brown-coffee">
                    Ingredients: {ingredientList}
                </h4>
                <h2 className=" text-black-chocolate text-lg font-bold my-1">
                    {recipe.name}
                </h2>
                <h4 className=" text-brown-coffee">{recipe.description}</h4>
                <DefaultButton
                    text="Edit Recipe"
                    className="rounded-[18px] py-1.5 px-14 mt-[18px]"
                    onClick={handleClick}
                />
            </div>
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={recipe.imageUrl}
                    alt=""
                    className="max-h-44 w-auto"
                />
                <div className="absolute inset-0 h-[347px] bg-gradient-to-b from-transparent to-black "></div>
            </div>

            <div className="absolute top-0 left-0 right-0 bg-white-smoke z-10">
                {isOpen && (
                    <RecipeForm
                        handleClose={handleClose}
                        recipe={recipe}
                        updateRecipe={updateRecipe}
                    />
                )}
            </div>
        </div>
    );
};

export default RecipeCard;
