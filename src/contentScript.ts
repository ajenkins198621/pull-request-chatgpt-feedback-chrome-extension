import PullRequestDrawer from "./pullRequestDrawer";


const isGithub = () => {
  const currentURL = window.location.href;
  // TODO MAKE THIS WORK WITH MORE PAGES IN GITHUB
  // TODO Currently only works with: https://github.com/ajenkins198621/swaptimal/pull/1135
  const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/]+\/(?:pull\/\d+|tree\/[^/]+)$/i;
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

if (isPullRequestOrBranchPage()) {
  new PullRequestDrawer(isGithub() ? 'github' : 'bitbucket');
}
