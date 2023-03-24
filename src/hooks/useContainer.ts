import { useEffect, useState } from "react";

export default function useContainer() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [diffs, setDiffs] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        document.addEventListener("SET_DIFFS_IN_REACT", (event:any) => {
            if(event && event.detail && event.detail.diffs) {
                setDiffs(event.detail.diffs);
            }
            setLoading(false);
        });

        document.addEventListener("NO_DIFFS_FOUND", (event:any) => {
            setError("No diffs found");
            setLoading(false);
        });
    }, []);

    const getDiffsFromPage = () => {
        setLoading(true);
        document.dispatchEvent(new CustomEvent("GET_PR_DIFFS_FROM_VANILLA_JS"));
    };


    return {
        isExpanded,
        setIsExpanded,
        loading,
        diffs,
        getDiffsFromPage,
        error,
    }
}