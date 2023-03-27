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
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    color: loading || !!chatGPTFeedback ? 'gray' : 'inherit',
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
                            {diff.fileName} ({diff.changes.length} lines)
                        </>
                }
            </a>
            {
                chatGPTFeedback && <p style={{color: 'green'}}>{chatGPTFeedback}</p>
            }

            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
        </div>
    )
}