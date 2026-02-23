import { useState, useEffect } from "react";

// Placeholder hook for collections
export function useCollection(collectionName, orderField = "id", orderDirection = "asc") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.warn(`useCollection called for ${collectionName}, but Firestore is removed.`);
    }, [collectionName, orderField, orderDirection]);

    return { data, loading, error };
}

// Placeholder hook for a single document
export function useDocument(collectionName, docId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.warn(`useDocument called for ${collectionName}/${docId}, but Firestore is removed.`);
    }, [collectionName, docId]);

    return { data, loading, error };
}