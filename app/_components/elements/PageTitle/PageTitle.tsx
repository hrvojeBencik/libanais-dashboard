import React from "react";

interface PageTitleProps {
    className?: string;
    title?: string;
    subtitle?: string;
}

const PageTitle = ({ className, title, subtitle }: PageTitleProps) => {
    return (
        <div className={`${className}`}>
            <h1 className="text-[32px] font-medium text-grey-eclipse ">
                {title}
            </h1>
            <h4 className="text-lg text-[#8A8A8A] font-extralight">
                {subtitle}
            </h4>
        </div>
    );
};

export default PageTitle;
