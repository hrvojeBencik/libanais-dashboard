import { db } from "../firebase";
import {
    query,
    collection,
    orderBy,
    limit,
    getDocs,
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

export const checkAndUpdateSummary = async (
    collectionName: string,
    list: any[],
    dateKey: string,
    totalKey: string,
    filterCondition?: (item: any) => boolean
) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const summaryRef = collection(db, collectionName);
    const q = query(summaryRef, orderBy("date", "desc"), limit(1));

    try {
        const querySnapshot = await getDocs(q);
        const latestDocDate = !querySnapshot.empty
            ? querySnapshot.docs[0].id
            : null;

        const totalCount = filterCondition
            ? list.filter(filterCondition).length
            : list.length;

        if (latestDocDate !== currentDate) {
            await setDoc(doc(db, collectionName, currentDate), {
                [totalKey]: totalCount,
                timestamp: serverTimestamp(),
            });
        }
    } catch (error) {
        console.error(
            `Error checking and updating ${collectionName} summary:`,
            error
        );
    }
};
