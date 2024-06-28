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
            const filtered = dataList.filter((data: any) => {
                // Check if the item is a recipe by checking the presence of 'ingredients' field
                const isRecipe = data.hasOwnProperty("ingredients");
                if (isRecipe) {
                    return (
                        (typeof data.name === "string" &&
                            data.name
                                .toLowerCase()
                                .includes(query.toLowerCase())) ||
                        (typeof data.description === "string" &&
                            data.description
                                .toLowerCase()
                                .includes(query.toLowerCase())) ||
                        data.ingredients.some((ingredient: any) =>
                            Object.values(ingredient).some(
                                (value) =>
                                    typeof value === "string" &&
                                    value
                                        .toLowerCase()
                                        .includes(query.toLowerCase())
                            )
                        )
                    );
                } else {
                    // Default search logic for other collections
                    return Object.values(data).some(
                        (value) =>
                            typeof value === "string" &&
                            value.toLowerCase().includes(query.toLowerCase())
                    );
                }
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
