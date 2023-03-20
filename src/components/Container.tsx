import React from 'react';
import useContainer from '../hooks/useContainer';

const Container: React.FC = (): JSX.Element => {

    const {
        diffs,
        fetchChatGPTDiffs,
        isExpanded,
        loading,
        setIsExpanded,
    } = useContainer();

    return (
        <div
            style={{
                color: 'black',
                position: 'fixed',
                top: '0', 
                right: '0',
                height: isExpanded ? 'auto' : '100%',
                backgroundColor: 'white',
                width: '300px',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '5px',
                    marginBottom: '5px',
                    borderBottom: '1px solid lightgray',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        fontSize: '24px',
                    }}
                >
                    PR Diff
                </div>

                <button
                    style={{
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        color: 'gray',
                        display: 'flex',
                        height: '40px',
                        justifyContent: 'center',
                        fontSize: '24px',
                        width: '40px',
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    X
                </button>
            </div>
            <button disabled={loading} onClick={fetchChatGPTDiffs}>
                Get Chat GPT Diffs
            </button>
            <div>Total Diffs: {diffs.length}</div>
        </div>
    );
};

export default Container;
