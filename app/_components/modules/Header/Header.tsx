import SearchBar from "../../elements/SearchBar/SearchBar";
import UserGreeting from "../../elements/UserGreeting/UserGreeting";

interface HeaderProps {
    className?: string;
}
const Header = ({ className }: HeaderProps) => {
    return (
        <div className={`${className} flex justify-between`}>
            <SearchBar className="w-1/2" />
            <UserGreeting className="" />
        </div>
    );
};

export default Header;
