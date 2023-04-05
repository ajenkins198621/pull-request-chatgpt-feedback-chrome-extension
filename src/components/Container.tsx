import React from 'react';
import BitbucketContainer from './BitbucketContainer';
import GithubContainer from './GithubContainer';
import useContainer from '../hooks/useContainer';

import './Container.css';

interface IProps {
    site: 'github' | 'bitbucket';
}
const Container = ({
    site
}: IProps): JSX.Element => {

    const {
        isExpanded,
        setIsExpanded,
    } = useContainer(false);


    let content = null;

    if(site === 'github') {
        content =  <GithubContainer />;
    } else if(site === 'bitbucket') {
        content = <BitbucketContainer />;
    }

    return (
        <div
            className={`pr-chatgpt-ext-inner-container ${isExpanded ? 'pr-chatgpt-ext-expanded' : 'pr-chatgpt-ext-collapsed'}`}
            onClick={() => {
                if(!isExpanded) {
                    setIsExpanded(true);
                }
            }}
        >
            <div className="pr-chatgpt-ext-header">
                <div className='pr-chatgpt-ext-title'>
                    PR FEEDBACK
                </div>

                <button
                    className='pr-chatgpt-ext-close-button'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    X
                </button>
            </div>
            {
                isExpanded && (
                    <div className="pr-chatgpt-ext-content">
                        {content}
                    </div>
                )
            }
        </div>
    )
};

export default Container;
