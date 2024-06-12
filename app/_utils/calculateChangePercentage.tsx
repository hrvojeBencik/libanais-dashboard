export const calculateChangePercentage = (
    currentList: any[],
    summaryList: any[],
    key: string,
    filterCondition?: (item: any) => boolean
) => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const threeDaysAgoDate = threeDaysAgo.toISOString().split("T")[0];

    const threeDaysAgoSummary = summaryList.find(
        (summary) => summary.id === threeDaysAgoDate
    );
    if (threeDaysAgoSummary) {
        const threeDaysAgoCount = threeDaysAgoSummary[key] || 0;
        const currentTotalCount = filterCondition
            ? currentList.filter(filterCondition).length
            : currentList.length;
        if (threeDaysAgoCount !== 0) {
            const difference = currentTotalCount - threeDaysAgoCount;
            const percentage = ((difference / threeDaysAgoCount) * 100).toFixed(
                2
            );
            return parseFloat(percentage);
        }
    }
    return 0;
};
