

const isPullRequestOrBranchPage = () => {
  const currentURL = window.location.href;
  const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/]+\/(?:pull\/\d+|tree\/[^/]+)$/i;
  const bitbucketRegex = /^(?:https?:\/\/)?(?:www\.)?bitbucket\.org\/[^/]+\/[^/]+\/(?:pull-requests\/\d+|branch\/[^/]+)$/i;

  return githubRegex.test(currentURL) || bitbucketRegex.test(currentURL);
};

if (isPullRequestOrBranchPage()) {
  console.log("You are on a GitHub or Bitbucket pull request or branch page.");
} else {
  console.log("You are not on a GitHub or Bitbucket pull request or branch page.");
}
