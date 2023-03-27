import { useEffect, useState } from "react";
import { FormattedDiff } from "../pullRequestDrawer";

export default function useContainer() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [diffs, setDiffs] = useState<string[]>([]);
    const [formattedDiffs, setFormattedDiffs] = useState<FormattedDiff[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        document.addEventListener("SEND_DIFFS_TO_REACT", (event:any) => {
            if(event && event.detail) {
                if(event.detail.diffs) {
                    setDiffs(event.detail.diffs);
                }
                if(event.detail.formattedDiffs) {
                    setFormattedDiffs(event.detail.formattedDiffs);
                }
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
        formattedDiffs
    }
}