import React from 'react';
import useContainer from '../hooks/useContainer';
import Diff from './Diff';

export default function GithubContainer() {

    const {
        getDiffsFromPage,
        loading,
        formattedDiffs
    } = useContainer(false);

    return (
        <div>
            <button
                className="pr-chatgpt-ext-button" 
                disabled={loading}
                onClick={getDiffsFromPage}
            >
                Get Diffs
            </button>
            <div className='pr-chatgpt-ext-total-count'>
                Total Diffs: {formattedDiffs.length}
            </div>
            <ul className="pr-chatgpt-ext-diff-list">
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