import { getDocs, collection, query } from "firebase/firestore";
import { db } from "@/app/firebase";

export const loadData = async (
    collectionName: string,
    handleLoadedData: (data: any) => void
) => {
    const snapshot = await getDocs(query(collection(db, collectionName)));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    handleLoadedData(data);
};
