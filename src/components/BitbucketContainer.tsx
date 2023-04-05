import React,{ useEffect} from 'react';
import useContainer from '../hooks/useContainer';
import Diff from './Diff';

export default function BitbucketContainer() {

    const {
        getDiffsFromPage,
        loading,
        formattedDiffs
    } = useContainer(true);

    useEffect(() => {
        getDiffsFromPage();
    }, []);

    return (
        <div>
            <div className='pr-chatgpt-ext-total-count'>
                Total Diffs: {loading ? 'Loading...' : formattedDiffs.length}
            </div>
            <ul className="pr-chatgpt-ext-diff-list">
                {
                    formattedDiffs.map((diff, index) => (
                        <li key={index}>
                            <Diff diff={diff} />
                        </li>   
                    ))
                }
            </ul>
        </div>
    )
}