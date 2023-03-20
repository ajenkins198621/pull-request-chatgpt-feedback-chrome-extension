import { useState } from "react";

export default function useContainer() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [diffs, setDiffs] = useState<string[]>([]);

    console.log(diffs);

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
        fetchChatGPTDiffs
    }
}