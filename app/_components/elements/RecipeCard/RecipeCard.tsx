import DefaultButton from "../DefaultButton/DefaultButton";
import { Recipe } from "@/app/_interfaces/Recipe";
import { useContext } from "react";
import { FormContext } from "@/app/_contexts/FormContext";
import Image from "next/image";
interface RecipeCardProps {
    recipe: Recipe;
}
const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const { setOpenForm, setEditFormData } = useContext(FormContext);

    const handleClick = () => {
        setEditFormData(recipe);
        setOpenForm(true);
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex  bg-white rounded-xl p-[18px] sm:p-4 justify-between sm:flex-col-reverse box-border">
            <div className="flex-1">
                <div className=" text-brown-coffee sm:mt-4 sm:text-sm sm:flex-col sm:items-start flex ">
                    <h4>Ingredients: &nbsp;</h4>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className="flex flex-col ml-4 sm:mb-1"
                        >
                            <span>{ingredient.name}</span>
                            <span className="text-[10px]">
                                LOT # {ingredient.lotNumber}
                            </span>
                        </div>
                    ))}
                </div>
                <h2 className=" text-black-chocolate text-lg font-bold my-1 sm:my-5 sm:text-sm">
                    {recipe.name}
                </h2>
                <h4 className=" text-brown-coffee sm:text-sm">
                    {recipe.description}
                </h4>
                <DefaultButton
                    text="Edit Recipe"
                    className="rounded-[18px] py-1.5 px-14 mt-[18px] sm:text-sm sm:w-full"
                    onClick={handleClick}
                />
            </div>
            <div className="relative overflow-hidden rounded-xl flex-shrink-0 ml-4">
                <Image
                    src={recipe.imageUrl}
                    width={347}
                    height={212}
                    priority
                    alt=""
                    sizes="(max-width: 920px) 100vw, 15vw"
                    className="max-h-44 max-w-80  w-auto h-auto sm:w-full sm:max-w-full sm:max-h-24 object-cover object-center"
                />
                <div className="absolute inset-0 h-[347px] bg-gradient-to-b from-transparent to-black "></div>
            </div>
        </div>
    );
};

export default RecipeCard;
