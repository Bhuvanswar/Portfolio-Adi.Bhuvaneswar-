import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

// Hook for fetching a collection of records
export function useCollection(collectionName, orderField = "id", orderDirection = "asc") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const orderDir = orderDirection === "desc" ? { ascending: false } : { ascending: true };
                
                const { data: result, error: fetchError } = await supabase
                    .from(collectionName)
                    .select("*")
                    .order(orderField, orderDir);

                if (fetchError) throw fetchError;
                setData(result || []);
            } catch (err) {
                console.error(`Error fetching ${collectionName}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName, orderField, orderDirection]);

    return { data, loading, error };
}

// Hook for fetching a single document
export function useDocument(collectionName, docId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: result, error: fetchError } = await supabase
                    .from(collectionName)
                    .select("*")
                    .eq("id", docId)
                    .single();

                if (fetchError) throw fetchError;
                setData(result);
            } catch (err) {
                console.error(`Error fetching ${collectionName}/${docId}:`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (docId) {
            fetchData();
        }
    }, [collectionName, docId]);

    return { data, loading, error };
}

// Hook for bio data specifically
export function useBio() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: result, error: fetchError } = await supabase
                    .from("bio")
                    .select("*")
                    .limit(1)
                    .single();

                if (fetchError) throw fetchError;
                setData(result);
            } catch (err) {
                console.error("Error fetching bio:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}
