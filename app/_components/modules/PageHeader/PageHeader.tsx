import React from "react";
import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import SearchBar from "../../elements/SearchBar/SearchBar";
import Header from "../../elements/Header/Header";

interface PageHeaderProps {
    className?: string;
    searchbarClassName?: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    handleOpen?: boolean | (() => void);
}
const PageHeader = ({
    className,
    searchbarClassName,
    title,
    subtitle,
    buttonText,
    handleOpen,
}: PageHeaderProps) => {
    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    return (
        <div className={className}>
            <div className="flex justify-between items-center ">
                <Header
                    title={title}
                    subtitle={subtitle}
                />
                {buttonText && (
                    <DefaultButton
                        text={buttonText}
                        className="rounded-[100px] px-[105px] h-fit py-3 text-[18px]"
                        onClick={handleClick}
                    />
                )}
            </div>
            <SearchBar searchbarClassName={searchbarClassName} />
        </div>
    );
};

export default PageHeader;
