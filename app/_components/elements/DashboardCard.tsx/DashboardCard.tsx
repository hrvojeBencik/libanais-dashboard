interface DashboardCardProps {
    className?: string;
    title: string;
    number: number;
    percentage: number;
}

const DashboardCard = ({
    className,
    title,
    number,
    percentage,
}: DashboardCardProps) => {
    return (
        <div className="border-[1.15px] p-7 min-w-[236px] rounded-[13.5px] border-[#E8DECF]">
            <h2 className="font-medium text-[18px] ">{title}</h2>
            <h3 className="font-semibold text-[27px] my-[8px]">{number}</h3>
            <p
                className={`font-medium text-[18px] ${
                    percentage === 0
                        ? "hidden"
                        : percentage > 0
                        ? "text-[#009963]"
                        : "text-[#C22929]"
                }`}
            >
                {percentage > 0 ? `+${percentage}` : percentage}% (3 days)
            </p>
        </div>
    );
};

export default DashboardCard;
