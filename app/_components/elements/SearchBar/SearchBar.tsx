import SearchIcon from "@/public/assets/svg/search";

interface SearchBarProps {
    className?: string;
    searchbarClassName?: string;
}

const SearchBar = ({ className, searchbarClassName }: SearchBarProps) => {
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
            />
            <SearchIcon className="absolute left-4 top-4" />
        </form>
    );
};

export default SearchBar;
