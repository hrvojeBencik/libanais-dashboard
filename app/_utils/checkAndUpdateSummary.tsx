import { db } from "../firebase";
import {
    query,
    collection,
    orderBy,
    limit,
    getDocs,
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";

export const checkAndUpdateSummary = async (
    collectionName: string,
    list: any[],
    dateKey: string,
    totalKey: string,
    filterCondition?: (item: any) => boolean
) => {
    try {
        const summaryRef = collection(db, collectionName);
        const totalCount = filterCondition
            ? list.filter(filterCondition).length
            : list.length;

        // Calculate dates for today and the past four days
        const datesToCheck = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split("T")[0];
            datesToCheck.push(formattedDate);
        }

        for (const date of datesToCheck) {
            const docRef = doc(db, collectionName, date);
            const docSnapshot = await getDoc(docRef);

            if (!docSnapshot.exists()) {
                // Document doesn't exist, set it
                await setDoc(docRef, {
                    [totalKey]: totalCount,
                    timestamp: serverTimestamp(),
                });
            } else if (date === datesToCheck[0]) {
                // Always update today's document
                await setDoc(docRef, {
                    [totalKey]: totalCount,
                    timestamp: serverTimestamp(),
                });
            }
        }
    } catch (error) {
        console.error(
            `Error checking and updating ${collectionName} summary:`,
            error
        );
    }
};
