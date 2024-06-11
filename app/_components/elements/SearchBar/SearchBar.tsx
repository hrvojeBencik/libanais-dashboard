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
            const filtered = dataList.filter((data: any) =>
                Object.values(data).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(query.toLowerCase())
                )
            );
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
