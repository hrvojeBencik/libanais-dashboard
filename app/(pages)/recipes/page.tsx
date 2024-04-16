import Header from "@/app/_components/elements/Header/Header";
import RecipeCard from "@/app/_components/elements/RecipeCard/RecipeCard";

const Recipes = () => {
    return (
        <div className="w-full pl-16 pr-6 pt-10">
            <Header
                title="Recipe List"
                subtitle="Hi, Name. Easily manage and add recipes!"
            />
            <RecipeCard />
        </div>
    );
};

export default Recipes;
