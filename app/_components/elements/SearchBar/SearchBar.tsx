import SearchIcon from "@/public/assets/svg/search";

interface SearchBarProps {
    className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
    return (
        <form
            noValidate
            action=""
            role="search"
            className={`${className} relative`}
        >
            <input
                placeholder="Search here"
                title="Search bar"
                className=" p-4 w-full font-sans tracking-wider rounded-lg  border border-solid border-[#D0D0D0] text-grey-eclipse focus:outline-0"
            />
            <SearchIcon className="absolute right-4 top-4" />
        </form>
    );
};

export default SearchBar;
