import { Recipe } from "@/app/_interfaces/Recipe";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import RecipeForm from "@/app/_components/modules/RecipeForm/RecipeForm";

export async function generateStaticParams() {
    const snapshot = await getDocs(query(collection(db, "recipeList")));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data.map((recipe) => ({
        id: recipe.id,
    }));
}

const EditRecipePage = ({ recipe }: { recipe: Recipe }) => {
    return <RecipeForm recipe={recipe} />;
};

export default EditRecipePage;
