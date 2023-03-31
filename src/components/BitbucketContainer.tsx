import React,{ useEffect} from 'react';
import useContainer from '../hooks/useContainer';
import Diff from './Diff';

export default function BitbucketContainer() {

    const {
        getDiffsFromPage,
        loading,
        isExpanded,
        setIsExpanded,
        formattedDiffs
    } = useContainer(true);

    useEffect(() => {
        getDiffsFromPage();
    }, []);

    return (
        <div
        style={{
            color: 'black',
            position: 'fixed',
            top: '0', 
            right: '0',
            height: isExpanded ? 'auto' : '100%',
            backgroundColor: 'gray',
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
        <div>Total Diffs: {loading ? 'Loading...' : formattedDiffs.length}</div>
        <ul>
        {
            formattedDiffs.map((diff, index) => (
                <li key={index}>
                    <Diff
                        diff={diff}
                    />
                </li>   
            ))
        }
        </ul>
    </div>

    )
}