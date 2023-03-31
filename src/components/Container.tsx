import React from 'react';
import BitbucketContainer from './BitbucketContainer';
import GithubContainer from './GithubContainer';

interface IProps {
    site: 'github' | 'bitbucket';
}
const Container = ({
    site
}: IProps): JSX.Element => {

    if(site === 'github') {
        return <GithubContainer />
    } else if(site === 'bitbucket') {
        return <BitbucketContainer />
    }
    return null;
};

export default Container;
