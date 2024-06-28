"use client";
import { useState, useEffect } from "react";
import SearchIcon from "@/public/assets/svg/search";

interface SearchBarProps {
    className?: string;
    searchbarClassName?: string;
    dataList?: any;
    handleFilteredData?: any;
    iconStyle: string;
}

const SearchBar = ({
    className,
    searchbarClassName,
    dataList,
    handleFilteredData,
    iconStyle,
}: SearchBarProps) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (dataList && handleFilteredData) {
            const queryLowerCase = query.toLowerCase();
            const filtered = dataList.filter((data: any) => {
                const isRecipe = data.hasOwnProperty("ingredients");

                const matchesLotNumber = (recipe: any) =>
                    recipe.ingredients.some(
                        (ingredient: any) =>
                            typeof ingredient.lotNumber === "string" &&
                            ingredient.lotNumber
                                .toLowerCase()
                                .includes(queryLowerCase)
                    );

                const matchesOtherFields = (item: any) =>
                    Object.values(item).some(
                        (value) =>
                            typeof value === "string" &&
                            value.toLowerCase().includes(queryLowerCase)
                    );

                return isRecipe
                    ? matchesLotNumber(data) || matchesOtherFields(data)
                    : matchesOtherFields(data);
            });
            handleFilteredData(filtered);
        }
    }, [query, dataList]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <form
            noValidate
            action=""
            role="search"
            className={`${className} relative z-20`}
        >
            <input
                id="search-input"
                name="search"
                placeholder="Search here"
                title="Search bar"
                className={`${searchbarClassName} pr-4 pl-14 w-full 
                font-sans rounded-[27px] focus:outline-0 text-brown-derby 
                placeholder-brown-derby`}
                value={query}
                onChange={handleInputChange}
            />
            <SearchIcon className={`${iconStyle} absolute left-4 `} />
        </form>
    );
};

export default SearchBar;
