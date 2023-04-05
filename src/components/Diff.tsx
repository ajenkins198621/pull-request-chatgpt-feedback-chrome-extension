import React from 'react';
import useDiff from '../hooks/useDiff';
import { FormattedDiff } from '../pullRequestDrawer';


interface IProps {
    diff: FormattedDiff;
}

export default function Diff({
    diff,
}: IProps): JSX.Element {

    const {
        loading,
        getChatGPTFeedbackOnDiff,
        chatGPTFeedback,
        error
    } = useDiff();

    return (
        <div>
            <a
                style={{
                    cursor: loading || !!chatGPTFeedback ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                    if(!chatGPTFeedback && !loading) {
                        getChatGPTFeedbackOnDiff(diff.originalDiff, diff.fileName)
                    }
                }}
            >
                {
                    loading ?
                        'Loading...'
                        :
                        <>
                            <span className="pr-chatgpt-ext-filename">{diff.fileName}</span><span className="pr-chatgpt-ext-line-count">{diff.changes.length} lines</span>
                        </>
                }
            </a>
            {
                chatGPTFeedback && <p style={{color: 'green'}} dangerouslySetInnerHTML={{__html: chatGPTFeedback}} />
            }

            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
        </div>
    )
}