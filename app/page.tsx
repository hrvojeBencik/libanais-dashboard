// Home.tsx
"use client";
import PageHeader from "./_components/modules/PageHeader/PageHeader";
import DashboardAnalytics from "./_components/modules/DashboardAnalytics/DashboardAnalytics";
import StatisticCard from "./_components/elements/StatisticCard/StatisticCard";

export default function Home() {
    return (
        <main className="">
            <PageHeader
                title="Dashboard"
                subtitle="Hi, Name. Welcome back to Libanais Dashboard!"
                searchbar={true}
            />
            <div className="flex gap-[18px] sm:gap-4 sm:flex-col">
                <StatisticCard
                    title="Total Packages"
                    number={750}
                    percentage={5}
                    includeDays={true}
                />
                <DashboardAnalytics />
            </div>
        </main>
    );
}
