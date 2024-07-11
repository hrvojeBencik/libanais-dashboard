import { db } from "../firebase";
import {
    query,
    collection,
    where,
    getDocs,
    doc,
    deleteDoc,
} from "firebase/firestore";

const removeOldData = async (collectionName: string) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 5); // Set the date to 5 days ago
    const sevenDaysAgo = currentDate;

    const summaryRef = collection(db, collectionName);
    const q = query(summaryRef, where("timestamp", "<", sevenDaysAgo));

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnapshot) => {
            deleteDoc(doc(db, collectionName, docSnapshot.id));
        });
    } catch (error) {
        console.error(
            `Error removing old documents from ${collectionName}:`,
            error
        );
    }
};

export default removeOldData;
