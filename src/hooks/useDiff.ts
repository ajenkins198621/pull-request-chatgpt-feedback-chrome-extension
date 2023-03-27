import { useEffect, useState } from "react";
import { FormattedDiff } from "../pullRequestDrawer";

export default function useDiff() {
    const [loading, setLoading] = useState<boolean>(false);
    const [chatGPTFeedback, setChatGPTFeedback] = useState<string>('');
    const [error, setError] = useState<string>("");

    const getChatGPTFeedbackOnDiff = (diff: string, fileName: string) => {
        setLoading(true);

        document.dispatchEvent(new CustomEvent(`GET_CHAT_GPT_FROM_VANILLA_JS`, {
            detail: {
                diff,
                fileName
            }
        }));

        document.addEventListener(`SEND_CHAT_GPT_TO_REACT_${fileName}`, (event: any) => {
            handleEventListenerResponses(event);
        });

        document.addEventListener(`SEND_ERROR_REACT_${fileName}`, (event: any) => {
            handleEventListenerResponses(event);
        });
    };

    const handleEventListenerResponses = (event: {
        detail?: {
            chatGPTFeedback?: string;
            error?: string;
        }
    }) => {
        console.log({event});
        if(!event || !event.detail) {
            setError('There were no details provided from the event listener');
        } else {
            const { chatGPTFeedback, error } = event.detail;
            if (chatGPTFeedback) {
                setChatGPTFeedback(chatGPTFeedback);
            }
            if (error) {
                setError(error);
            }
        }
        setLoading(false);
    }

    return {
        loading,
        getChatGPTFeedbackOnDiff,
        error,
        chatGPTFeedback
    }
}