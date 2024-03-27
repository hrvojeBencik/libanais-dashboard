import DefaultButton from "../DefaultButton/DefaultButton";

interface PageHeaderProps {
    className?: string;
    handleIsOpen?: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    subtitle: string;
    buttonLabel?: string;
}
const PageHeader = ({
    className,
    handleIsOpen,
    title,
    subtitle,
    buttonLabel,
}: PageHeaderProps) => {
    return (
        <div className="flex justify-between">
            <div className="mb-10">
                <h1 className="text-[32px] font-medium text-grey-eclipse ">
                    {title}
                </h1>
                <h4 className="text-lg text-light-grey font-regular">
                    {subtitle}
                </h4>
            </div>
            {handleIsOpen && (
                <DefaultButton
                    text={buttonLabel}
                    onClick={handleIsOpen}
                    className="px-16 py-4 rounded-lg h-fit"
                />
            )}
        </div>
    );
};

export default PageHeader;
