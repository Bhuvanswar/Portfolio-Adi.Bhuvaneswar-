import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy, doc } from "firebase/firestore";

// Hook for collections (Projects, Achievements)
export function useCollection(collectionName, orderField = "id", orderDirection = "asc") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!db) {
            console.warn('Firebase not configured; returning empty data.');
            setLoading(false);
            setError(new Error('Firebase not configured'));
            return;
        }

        const q = query(
            collection(db, collectionName),
            orderBy(orderField, orderDirection)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const items = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setData(items);
                setLoading(false);
            },
            (err) => {
                console.error(`Error fetching collection ${collectionName}:`, err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [collectionName, orderField, orderDirection]);
    return { data, loading, error };
}

// Hook for a single document (Bio, Resume link)
export function useDocument(collectionName, docId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, collectionName, docId), (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.data());
            }
            setLoading(false);
        }, (err) => {
            console.error(`Error fetching document ${collectionName}/${docId}:`, err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, docId]);

    return { data, loading, error };
}
