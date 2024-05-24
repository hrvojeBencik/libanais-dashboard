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
            <div className="flex justify-between items-center ">
                <Header
                    title={title}
                    subtitle={subtitle}
                />
                {buttonText && (
                    <DefaultButton
                        text={buttonText}
                        className="rounded-[100px] px-[105px] h-fit py-3 text-[18px]"
                        onClick={handleClick}
                    />
                )}
            </div>
            <SearchBar
                className="mt-8 sm:mt-6"
                searchbarClassName={searchbarClassName}
                dataList={dataList}
                handleFilteredData={handleFilteredData}
            />
        </div>
    );
};

export default PageHeader;
