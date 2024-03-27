import DefaultButton from "./_components/elements/DefaultButton/DefaultButton";
import ListCard from "./_components/elements/ListCard/ListCard";
import Modal from "./_components/elements/Modal/Modal";
import employee from "public/assets/avatar.png";
import IngredientForm from "./_components/modules/IngredientForm/IngredientForm";
import PageHeader from "./_components/elements/PageHeader/PageHeader";

export default function Home() {
    return (
        <main>
            <PageHeader
                title="Dashboard"
                subtitle="Hi, John. Welcome back  to Libanais Dashboard!"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"></div>
        </main>
    );
}
