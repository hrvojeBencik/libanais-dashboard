export const calculateChangePercentage = (summaryList: any[], key: string) => {
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    const todayDate = today.toISOString().split("T")[0];
    const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

    const todaySummary = summaryList.find(
        (summary) => summary.id === todayDate
    );

    const threeDaysAgoSummary = summaryList.find(
        (summary) => summary.id === threeDaysAgoDate
    );

    if (todaySummary && threeDaysAgoSummary) {
        const todayCount = todaySummary[key] || 0;
        const threeDaysAgoCount = threeDaysAgoSummary[key] || 0;

        if (threeDaysAgoCount !== 0) {
            const difference = todayCount - threeDaysAgoCount;
            const percentage = ((difference / threeDaysAgoCount) * 100).toFixed(
                2
            );
            return parseFloat(percentage);
        }
    }

    return 0;
};
