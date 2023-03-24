import * as dotenv from 'dotenv';
import injectReactComponent from './injectReact';

type Site = '' | 'github' | 'bitbucket';

export default class PullRequestDrawer {
    private site: Site = '';
    private pullRequestId: string = '';
    private gitHubInfo: { owner: string, repo: string } = { owner: '', repo: '' };
    // TODO add bitbucket info
    private port: number = -1;
    private diffs: string[] = [];

    constructor(site: Site) {
        this.site = site;
        this.port = 4175;
        this.getPullRequestInfo();
        if (this.pullRequestId) {
            console.log('Injecting React...');
            injectReactComponent();
            this.addEventListeners();
        }
    }


    private getPullRequestInfo() {
        if (this.site === 'github') {
            this.getGitHubInfo();
        } else if (this.site === 'bitbucket') {
            this.getBitbucketInfo();
        }
    }


    private getGitHubInfo() {
        const githubPullRequestRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/i;
        const match = window.location.href.match(githubPullRequestRegex);
        if (match && match[1] && match[2] && match[3]) {
            this.gitHubInfo.owner = match[1];
            this.gitHubInfo.repo = match[2];
            this.pullRequestId = match[3];
        }
    }

    private getBitbucketInfo() {
        // TODO
    }

    private addEventListeners() {
        document.addEventListener("GET_PR_DIFFS_FROM_VANILLA_JS", async (event) => {
            await this.setDiffs();
            if (this.diffs.length > 0) {
                this.requestFetchDataFromChatGPTApi();
            } else {
                this.sendEventToReact('NO_DIFFS_FOUND', []);
            }
        });
    }


    private async setDiffs() {
        if (this.site === 'github') {
            await this.getGitHubDiff();
        } else if (this.site === 'bitbucket') {
            await this.getBitbucketDiff();
        }
    }

    private async getGitHubDiff() {

        const diffUrl =
            `https://patch-diff.githubusercontent.com/raw/${this.gitHubInfo.owner}/${this.gitHubInfo.repo}/pull/${this.pullRequestId}.diff`;
        try {
            const diffData = await this.requestFetchDataFromNewTab(diffUrl);
            this.processDiffs(diffData);
        } catch (error) {
            console.error("Error fetching diff data:", error);
        }
    }


    private async getBitbucketDiff() {

    }

    private processDiffs(diffString: string) {
        if (!diffString.length) {
            return;
        }
        this.diffs = this.removeTags(diffString).split('diff --git ').map(diff => {
            if (diff.trim() === '') {
                return '';
            }
            return `diff --git ${diff}`
        }).filter(diff => diff.trim() !== '');
    }

    private removeTags(str: string): string {
        if ((str === null) || (str === ''))
            return '';
        else
            str = str.toString();

        // Regular expression to identify HTML tags in
        // the input string. Replacing the identified
        // HTML tag with a null string.
        return str.replace(/(<([^>]+)>)/ig, '');
    }


    private sendEventToReact(eventName: string, data: any) {
        document.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                diffs: data
            }
        }));
    }



    private async requestFetchDataFromNewTab(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            console.log('Sending message to background.ts from pullRequestDrawer.ts');
            chrome.runtime.sendMessage({
                action: "fetchDataFromNewTab",
                url
            }, (response) => {
                console.log('response: ', response);
                if (response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            });
        });
    }

    private requestFetchDataFromChatGPTApi() {
        console.log('Sending message to background.ts from pullRequestDrawer.ts - request ChatGPT Info');
        chrome.runtime.sendMessage({
            action: "fetchDataFromChatGPTApi",
            diffs: this.diffs
        }, (response) => {
            console.log('response: ', response);
            if (response.success) {
                // TODO Send data to React
                console.log('Yay, success!');
            } else {
                // TODO Send error to React
                console.error(response.error);
            }
        })
    }
}
