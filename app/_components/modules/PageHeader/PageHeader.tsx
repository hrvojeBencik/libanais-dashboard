import React from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import SearchBar from "../../elements/SearchBar/SearchBar";
import Header from "../../elements/Header/Header";

interface PageHeaderProps {
    className?: string;
    title: string;
    subtitle: string;
    handleOpen: boolean | (() => void);
}
const PageHeader = ({
    className,
    title,
    subtitle,
    handleOpen,
}: PageHeaderProps) => {
    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center ">
                <Header
                    title={title}
                    subtitle={subtitle}
                />
                <DefaultButton
                    text="Add Recipes"
                    className="rounded-[100px] px-[105px] h-fit py-3 text-[18px]"
                    onClick={handleClick}
                />
            </div>
            <SearchBar />
        </div>
    );
};

export default PageHeader;
