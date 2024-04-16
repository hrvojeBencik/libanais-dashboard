import React from "react";
import DefaultButton from "../../DefaultButton/DefaultButton";
import SearchBar from "../SearchBar/SearchBar";

interface HeaderProps {
    className?: string;
    title: string;
    subtitle: string;
}
const Header = ({ className, title, subtitle }: HeaderProps) => {
    return (
        <div>
            <div className="flex justify-between items-center ">
                <div>
                    <h1 className=" text-black-chocolate font-extrabold text-[40px] mb-34">
                        {title}
                    </h1>
                    <h2>{subtitle}</h2>
                </div>
                <DefaultButton
                    text="Add Recipes"
                    className="rounded-[100px] px-[105px] h-fit py-3 text-[18px]"
                />
            </div>
            <SearchBar />
        </div>
    );
};

export default Header;
