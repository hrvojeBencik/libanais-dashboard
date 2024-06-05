import DefaultButton from "../../elements/DefaultButton/DefaultButton";
import SearchBar from "../../elements/SearchBar/SearchBar";
import Header from "../../elements/Header/Header";
import { useContext } from "react";
import { FormContext } from "@/app/_contexts/FormContext";
interface PageHeaderProps {
    className?: string;
    searchbar?: boolean;
    searchbarClassName?: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    dataList?: any;
    handleFilteredData?: any;
}
const PageHeader = ({
    className,
    searchbar,
    searchbarClassName,
    title,
    subtitle,
    buttonText,
    dataList,
    handleFilteredData,
}: PageHeaderProps) => {
    const { openForm, setOpenForm } = useContext(FormContext);

    const handleClick = () => {
        setOpenForm(true);
        window.scrollTo(0, 0);
    };

    return (
        <div className={`${className} mb-8 sm:mb-6`}>
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
            {searchbar && (
                <SearchBar
                    className="mt-8 sm:mt-6"
                    searchbarClassName={`${searchbarClassName} bg-albescent-white py-[13.5px] text-lg`}
                    iconStyle="top-4"
                    dataList={dataList}
                    handleFilteredData={handleFilteredData}
                />
            )}
        </div>
    );
};

export default PageHeader;
