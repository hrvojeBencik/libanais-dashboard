interface HeaderProps {
    title: string;
    subtitle: string;
}
const Header = ({ title, subtitle }: HeaderProps) => {
    return (
        <div>
            <h1 className=" text-black-chocolate font-extrabold text-[40px] mb-[13.5px] sm:mb-2 sm:text-2xl tracking-tight leading-tight">
                {title}
            </h1>
            <h2 className=" text-lg sm:text-sm">{subtitle}</h2>
        </div>
    );
};

export default Header;
