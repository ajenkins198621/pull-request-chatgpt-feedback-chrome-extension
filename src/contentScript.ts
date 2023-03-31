import PullRequestDrawer from "./pullRequestDrawer";

let currentPullRequestId = -1;
let pullRequestDrawerInstance : any = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'urlChanged' && isPullRequestOrBranchPage()) {
    instantiateNewPullRequestDrawer();
  }
});


const isGithub = () => {
  const currentURL = window.location.href;
  const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/]+\/(?:pull\/\d+(?:[^\/\s]+)*|tree\/[^/]+)(?:\/[^/\s]+)*$/i;

  return githubRegex.test(currentURL);
}

const isBitbucket = () => {
  const currentURL = window.location.href;
  const bitbucketRegex = /^(?:https?:\/\/)?(?:www\.)?bitbucket\.org\/[^/]+\/[^/]+\/(?:pull-requests\/\d+|branch\/[^/]+)$/i;
  return bitbucketRegex.test(currentURL);
}


const isPullRequestOrBranchPage = () => {
  return isGithub() || isBitbucket();
};

const instantiateNewPullRequestDrawer = () => {
  if (pullRequestDrawerInstance !== null) {
    // Call the destroy method on the previous instance
    pullRequestDrawerInstance.destroy();
  }
  pullRequestDrawerInstance = new PullRequestDrawer(isGithub() ? 'github' : 'bitbucket');
}

if (isPullRequestOrBranchPage()) {
  instantiateNewPullRequestDrawer();
}

