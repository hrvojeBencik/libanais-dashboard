"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const getLabels = () => {
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        labels.push(date.toLocaleDateString("en-US", { weekday: "long" }));
    }
    return labels;
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            enabled: true,
            mode: "index" as const,
            intersect: false,
            backgroundColor: "white",
            titleColor: "#5c4338",
            titleFont: (context: any) => {
                const width = context.chart.width;
                return {
                    size: width < 920 ? 10 : 14,
                    weight: "bold" as "bold",
                };
            },
            bodyColor: "#5c4338",
            bodyFont: function (context: any) {
                const width = context.chart.width;
                return {
                    size: width < 920 ? 10 : 14,
                };
            },
            padding: 10,
            displayColors: false,
            borderColor: "#E8DECF",
            borderWidth: 1,
            cornerRadius: 4,
            caretSize: 5,
            caretPadding: 6,
            callbacks: {
                title: () => "",
                label: (context: any) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - context.dataIndex));
                    const formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    });
                    return [`${context.raw} Recipes`, formattedDate];
                },
            },
        },
    },
    scales: {
        y: {
            display: false,
            grid: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 9.54,
                },
            },
        },
    },
    hover: {
        mode: "index" as const, // Explicitly type mode
        intersect: false,
    },
    interaction: {
        mode: "nearest" as const, // Explicitly type mode
    },
    elements: {
        point: {
            radius: 0,
            hoverRadius: 8,
            hoverBackgroundColor: "rgba(92,67,56, 1)",
            backgroundColor: "rgba(92,67,56, 1)",
            borderColor: "rgba(218,213,196)",
            borderWidth: 3,
            hoverBorderColor: "rgba(218,213,196)",
            hoverBorderWidth: 4,
            clip: false,
        },
    },
};

interface PreparedRecipesChartProps {
    weeklyData: number[];
    title: string;
}

const PreparedRecipesChart = ({
    weeklyData,
    title,
}: PreparedRecipesChartProps) => {
    const [gradientHeight, setGradientHeight] = useState(700);

    useEffect(() => {
        const handleResize = () => {
            setGradientHeight(
                window.innerWidth > 2200
                    ? 800
                    : window.innerWidth > 1000
                    ? 400
                    : 150
            );
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const gradient = (ctx: any) => {
        const gradient = ctx.chart.canvas
            .getContext("2d")
            .createLinearGradient(0, 0, 0, gradientHeight);
        gradient.addColorStop(0, "rgba(92,67,56,0.6)");
        gradient.addColorStop(0.1, "rgba(92,67,56,0.5)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        return gradient;
    };

    const labels = getLabels();

    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Recipes",
                borderColor: "#5c4338",
                borderWidth: 5,
                tension: 0.4,
                data: weeklyData,
                backgroundColor: gradient,
            },
        ],
    };

    return (
        <div className="w-full border-[1.15px] p-7 sm:p-4 pb-[54px] sm rounded-[13.5px] border-[#E8DECF]">
            <h2 className="text-black-chocolate font-medium mb-8 sm:mb-6">
                {title}
            </h2>
            <Line
                options={options}
                data={chartData}
            />
        </div>
    );
};

export default PreparedRecipesChart;
