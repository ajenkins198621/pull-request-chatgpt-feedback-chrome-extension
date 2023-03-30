import injectReactComponent from './injectReact';

type Site = '' | 'github' | 'bitbucket';

export interface FormattedDiff {
    path: string,
    fileName: string;
    originalDiff: string;
    changes: {
        type: string,
        line: string,
    }[]
}

export default class PullRequestDrawer {
    private site: Site = '';
    private pullRequestId: string = '';
    private gitHubInfo: { owner: string, repo: string } = { owner: '', repo: '' };
    // TODO add bitbucket info
    private port: number = -1;
    private diffs: string[] = [];
    private formattedDiffs: FormattedDiff[] = [];

    constructor(site: Site) {
        this.site = site;
        this.port = 4175;
        this.getPullRequestInfo();
        if (this.pullRequestId) {
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

    destroy() {
        // Detach event listeners
        document.removeEventListener("GET_PR_DIFFS_FROM_VANILLA_JS", this.handleGetPRDiffsFromVanillaJS);
        document.removeEventListener("GET_CHAT_GPT_FROM_VANILLA_JS", this.handleGetChatGPTFromVanillaJS);
      }
    

    private addEventListeners() {
        document.addEventListener("GET_PR_DIFFS_FROM_VANILLA_JS", this.handleGetPRDiffsFromVanillaJS);
        document.addEventListener("GET_CHAT_GPT_FROM_VANILLA_JS", this.handleGetChatGPTFromVanillaJS);
    }

    private handleGetPRDiffsFromVanillaJS = async (event: any) => {
        await this.setDiffs();
        if (this.diffs.length == 0) {
            this.sendEventToReact('NO_DIFFS_FOUND', {});
            return;
        }
        this.sendEventToReact('SEND_DIFFS_TO_REACT', {
            diffs: this.diffs,
            formattedDiffs: this.formattedDiffs
        });
    }

    private handleGetChatGPTFromVanillaJS = async (event: any) => {
        if (event && event.detail && event.detail.diff && event.detail.fileName) {
            const { diff, fileName } = event.detail;
            await this.requestFetchDataFromChatGPTApi(diff, fileName);
        } else {
            // TODO SEND ERROR TO REACT
        }
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
            const newDiff = `diff --git ${diff}`;
            return this.removeIndentationChanges(newDiff);

        }).filter(diff => diff.trim() !== '');

        this.createFormattedDiffs();
    }

    // TODO Is this what we really want???
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

    private removeIndentationChanges(diff: string): string {
        const lines = diff.split('\n');
        const resultLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const prevLine = lines[i - 1];

            if (line.startsWith('+') && prevLine && prevLine.startsWith('-')) {
                const addedLine = line.slice(1);
                const removedLine = prevLine.slice(1);
                const addedLineNoIndent = addedLine.trimStart();
                const removedLineNoIndent = removedLine.trimStart();

                if (addedLineNoIndent === removedLineNoIndent) {
                    // Remove the previous line (the removal part of the indentation change)
                    resultLines.pop();
                    continue; // Skip the current line (the addition part of the indentation change)
                }
            }

            resultLines.push(line);
        }

        return resultLines.join('\n');
    }


    private sendEventToReact(eventName: string, data: any) {
        document.dispatchEvent(new CustomEvent(eventName, {
            detail: data
        }));
    }


    private createFormattedDiffs() {
        this.formattedDiffs = [...this.diffs].map((diff): FormattedDiff => {
            const fileInfoRegex = /^diff --git a\/(.+?) b\/\1$/m;
            const changeRegex = /^([-+])(?!\1).*/gm;

            const fileInfoMatch = fileInfoRegex.exec(diff);
            if (!fileInfoMatch) {
                return {
                    path: 'Unknown',
                    fileName: 'Unknown',
                    originalDiff: diff,
                    changes: [],
                }
            }
            const path = fileInfoMatch[1];
            const fileName = this.getFilenameFromPath(path);

            const changeTypeMap: { [key: string]: string } = {
                '-': 'deletion',
                '+': 'addition',
            };

            const changes = [];
            let changeMatch;
            while ((changeMatch = changeRegex.exec(diff)) !== null) {
                const changeType = changeTypeMap[changeMatch[1]];
                const changeLine = changeMatch[0].slice(1);
                changes.push({
                    type: changeType,
                    line: changeLine
                });
            }

            return {
                fileName,
                originalDiff: diff,
                path,
                changes,
            };
        });
    }

    private getFilenameFromPath(path: string): string {
        // Replace backslashes with forward slashes for cross-platform compatibility
        const normalizedPath = path.replace(/\\/g, '/');

        // Split the path by forward slashes
        const pathParts = normalizedPath.split('/');

        // Get the last element of the array, which is the filename
        const filename = pathParts.pop();

        return filename;
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

    private async requestFetchDataFromChatGPTApi(diff: string, fileName: string) {
        console.log('Sending message to background.ts from pullRequestDrawer.ts - request ChatGPT Info');
        chrome.runtime.sendMessage({
            action: "fetchDataFromChatGPTApi",
            diff
        }, (response) => {
            if (response.success) {
                try {
                    this.sendEventToReact(`SEND_CHAT_GPT_TO_REACT_${fileName}`, {
                        chatGPTFeedback: response.data.data[0].text
                    });
                } catch (e) {
                    this.sendEventToReact(`SEND_ERROR_REACT_${fileName}`, {
                        error: 'There was an error with the ChatGPT API response values'
                    });
                }
            } else {
                this.sendEventToReact(`SEND_ERROR_REACT_${fileName}`, {
                    error: 'There was an error getting the feedback from the ChatGPT API'
                });
            }
        })
    }
}
