import DefaultButton from "../DefaultButton/DefaultButton";
import { Ingredient } from "@/app/_interfaces/Ingredient";

interface RecipeCardProps {
    name: string;
    description: string;
    ingredients: Ingredient[];
    image: string;
}
const RecipeCard = ({
    name,
    description,
    ingredients,
    image,
}: RecipeCardProps) => {
    const ingredientList = ingredients
        .map((ingredient) => ingredient.name)
        .join(", ");

    return (
        <div className="w-full flex bg-white rounded-xl p-[18px] mb-[36px] justify-between">
            <div>
                <h4 className=" text-brown-coffee">
                    Ingredients: {ingredientList}
                </h4>
                <h2 className=" text-black-chocolate text-lg font-bold my-1">
                    {name}
                </h2>
                <h4 className=" text-brown-coffee">{description}</h4>
                <DefaultButton
                    text="Edit Recipe"
                    className="rounded-[18px] py-1.5 px-14 mt-[18px]"
                />
            </div>
            <div className="relative overflow-hidden rounded-xl">
                <img
                    src={image}
                    alt=""
                    className="max-h-44 w-auto"
                />
                <div className="absolute inset-0 h-[347px] bg-gradient-to-b from-transparent to-black "></div>
            </div>
        </div>
    );
};

export default RecipeCard;
