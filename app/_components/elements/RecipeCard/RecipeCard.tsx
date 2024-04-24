import Image from "next/image";
import baklava from "public/assets/baklava.png";
import DefaultButton from "../DefaultButton/DefaultButton";
const RecipeCard = () => {
    return (
        <div className="w-full flex bg-white rounded-xl p-4 justify-between">
            <div>
                <h4 className=" text-brown-coffee">
                    Ingredients: Phyllo Dough, Clarified Butter, Pistachios,
                    Walnuts, Sugar Syrup
                </h4>
                <h2 className=" text-black-chocolate text-lg font-bold my-1">
                    47 Pieces Assorted Baklava - Original
                </h2>
                <h4 className=" text-brown-coffee">
                    Rich and indulgent dessert
                </h4>
                <DefaultButton
                    text="Edit Recipe"
                    className="rounded-[18px] py-1.5 px-14 mt-[18px]"
                />
            </div>
            <div className="relative overflow-hidden rounded-xl">
                <Image
                    src={baklava}
                    alt=""
                    className="max-h-44 w-auto"
                />
                <div className="absolute inset-0 h-[347px] bg-gradient-to-b from-transparent to-black "></div>
            </div>
        </div>
    );
};

export default RecipeCard;
