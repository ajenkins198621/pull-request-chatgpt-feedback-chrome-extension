import { useEffect, useState } from "react";
import { FormattedDiff } from "../pullRequestDrawer";

export default function useContainer(defaultLoading: boolean) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(defaultLoading);
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
                    // Remove any diffs with empty changes and store in state
                    setFormattedDiffs([...event.detail.formattedDiffs].filter(diff => {
                        if(diff.changes.length === 0) {
                            return false;
                        }
                        if(diff.path === 'Unknown' || diff.fileName === 'Unknown') {
                            return false;
                        }
                        return true;
                    }));
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