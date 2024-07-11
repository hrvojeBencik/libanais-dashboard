interface StatisticCardProps {
    className?: string;
    title: string;
    number: number;
    percentage: number;
    includeDays?: boolean;
}

const StatisticCard = ({
    className,
    title,
    number,
    percentage,
    includeDays,
}: StatisticCardProps) => {
    return (
        <div
            className={`${className} border-[1.15px] p-7 sm:p-4 min-w-[236px] sm:w-full sm:min-w-fit rounded-[13.5px] border-[#E8DECF]`}
        >
            <h2 className="font-medium text-lg sm:text-sm sm:max-h-[60px] sm:h-full">
                {title}
            </h2>
            <h3 className="font-semibold text-[27px] leading-5 sm:text-2xl my-[9px] sm:my-2">
                {number}
            </h3>
            <p
                className={`font-medium text-lg sm:text-[10px] ${
                    percentage === 0
                        ? "hidden"
                        : percentage > 0
                        ? "text-[#009963]"
                        : "text-[#C22929]"
                }`}
            >
                {percentage > 0 ? `+${percentage}` : percentage}%{" "}
                {includeDays && "(3 days)"}
            </p>
        </div>
    );
};

export default StatisticCard;
