import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/index";

const useStreamDocument = (col, id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const docRef = doc(database, col, id);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const data = { id: snapshot.id, ...snapshot.data() };
            setData(data);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return { data, loading };

};

export default useStreamDocument;