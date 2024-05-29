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
    dataList?: any;
    handleFilteredData?: any;
}
const PageHeader = ({
    className,
    searchbarClassName,
    title,
    subtitle,
    buttonText,
    handleOpen,
    dataList,
    handleFilteredData,
}: PageHeaderProps) => {
    const handleClick = () => {
        if (typeof handleOpen === "function") {
            handleOpen();
        }
    };

    return (
        <div className={className}>
            <div className="flex justify-between items-center sm:flex-col sm:items-baseline">
                <Header title={title} subtitle={subtitle} />
                {buttonText && (
                    <DefaultButton
                        text={buttonText}
                        className="rounded-[100px] max-w-[327px] sm:max-w-fit sm:px-6 w-full  h-fit py-3 text-[18px] sm:text-sm sm:mt-6"
                        onClick={handleClick}
                    />
                )}
            </div>
            <SearchBar
                className="mt-8 sm:mt-6"
                searchbarClassName={`${searchbarClassName} bg-albescent-white py-[13.5px] text-lg`}
                iconStyle="top-4"
                dataList={dataList}
                handleFilteredData={handleFilteredData}
            />
        </div>
    );
};

export default PageHeader;
