import SearchBar from "../../elements/SearchBar/SearchBar";
import UserGreeting from "../../elements/UserGreeting/UserGreeting";

const Header = () => {
    return (
        <div className="flex justify-between">
            <SearchBar className="w-1/2" />
            <UserGreeting className="" />
        </div>
    );
};

export default Header;
