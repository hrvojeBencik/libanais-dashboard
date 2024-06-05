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

export const options = {
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
            mode: "nearest",
            intersect: false,
            callbacks: {
                label: (context: any) => {
                    return `Recipes: ${context.raw}`;
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
        },
    },
};

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

interface PreparedRecipesChartProps {
    weeklyData: number[];
}

const PreparedRecipesChart = ({ weeklyData }: PreparedRecipesChartProps) => {
    const [gradientHeight, setGradientHeight] = useState(700);

    useEffect(() => {
        const handleResize = () => {
            setGradientHeight(
                window.innerWidth > 1800
                    ? 700
                    : window.innerWidth > 1400
                    ? 400
                    : 200
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
                pointRadius: 8,
                pointHoverBorderWidth: 9,
                pointBorderWidth: 3,
                pointBackgroundColor: "rgba(92,67,56)",
                pointBorderColor: "rgba(218,213,196)",
                pointHoverBorderColor: "rgba(218,213,196)",
                data: weeklyData,
                backgroundColor: gradient,
            },
        ],
    };

    return (
        <div className="w-full">
            <Line options={options} data={chartData} />
        </div>
    );
};

export default PreparedRecipesChart;
