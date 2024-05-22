"use client";
import { useState, useEffect } from "react";
import SearchIcon from "@/public/assets/svg/search";

interface SearchBarProps {
    className?: string;
    searchbarClassName?: string;
    dataList?: any;
    handleFilteredData?: any;
}

const SearchBar = ({
    className,
    searchbarClassName,
    dataList,
    handleFilteredData,
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
            className={`${className} relative mt-8`}
        >
            <input
                placeholder="Search here"
                title="Search bar"
                className={`${searchbarClassName} py-4 pr-4 pl-16 w-full bg-albescent-white 
                font-sans tracking-wider rounded-[27px] focus:outline-0 text-brown-derby 
                placeholder-brown-derby`}
                value={query}
                onChange={handleInputChange}
            />
            <SearchIcon className="absolute left-4 top-4" />
        </form>
    );
};

export default SearchBar;
