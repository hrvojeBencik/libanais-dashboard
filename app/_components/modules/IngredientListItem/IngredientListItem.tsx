import ListCard from "@/app/_components/elements/ListCard/ListCard";
import MinusIcon from "public/assets/svg/minus";
import PlusIcon from "public/assets/svg/plus";
import { Ingredient } from "@/app/_interfaces/Ingredient";

interface IngredientListItemProps {
    ingredient: Ingredient;
    handleIsQuantityFormOpen: (ingredientId: string) => void;
}

const IngredientListItem = ({
    ingredient,
    handleIsQuantityFormOpen,
}: IngredientListItemProps) => {
    return (
        <ListCard
            key={ingredient.id}
            header={ingredient.quantity}
            text={ingredient.ingredient}
            subtext="LOT#"
            image={ingredient.photo}
        >
            <div className="flex absolute justify-center w-full gap-2.5 mt-2.5">
                <MinusIcon
                    className="cursor-pointer"
                    onClick={() => handleIsQuantityFormOpen(ingredient.id)}
                />
                <PlusIcon
                    className="cursor-pointer"
                    onClick={() => handleIsQuantityFormOpen(ingredient.id)}
                />
            </div>
        </ListCard>
    );
};

export default IngredientListItem;
