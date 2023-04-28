import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { database } from "../firebase/index";

const useStreamCollection = (col, ...queryConstraints) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const colRef = collection(database, col);
        const queryRef = query(colRef, ...queryConstraints);

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(data);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return { data, loading };
};

export default useStreamCollection;