import { useEffect, useState } from "react";

export default function useContainer() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [diffs, setDiffs] = useState<string[]>([]);

    useEffect(() => {
        document.addEventListener("SET_DIFFS_IN_REACT", (event:any) => {
            if(event && event.detail && event.detail.diffs) {
                setDiffs(event.detail.diffs);
            }
            setLoading(false);
        
        });
    }, []);

    const getDiffsFromPage = () => {
        setLoading(true);
        document.dispatchEvent(new CustomEvent("GET_PR_DIFFS_FROM_VANILLA_JS"));
    };

    const fetchChatGPTDiffs = async () => {
        setLoading(true);
        await fetch("http://localhost:4175/api/analyze-code-diff", {
            method: "POST",
            body: JSON.stringify(diffs)
        })
            .then((res) => res.json())
            .then((data) => {
                // setDiffs(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    return {
        isExpanded,
        setIsExpanded,
        loading,
        diffs,
        getDiffsFromPage,
    }
}