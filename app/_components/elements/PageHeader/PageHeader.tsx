import DefaultButton from "../DefaultButton/DefaultButton";

interface PageHeaderProps {
    className?: string;
    title: string;
    subtitle: string;
    buttonLabel?: string;
}
const PageHeader = ({ className, title, subtitle }: PageHeaderProps) => {
    return (
        <div className="">
            <h1 className="text-[32px] font-medium text-grey-eclipse ">
                {title}
            </h1>
            <h4 className="text-lg text-light-grey font-regular">{subtitle}</h4>
        </div>
    );
};

export default PageHeader;
