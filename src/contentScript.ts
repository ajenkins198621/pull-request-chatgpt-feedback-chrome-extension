

const isPullRequestOrBranchPage = () => {
  const currentURL = window.location.href;
  const githubRegex = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^/]+\/[^/]+\/(?:pull\/\d+|tree\/[^/]+)$/i;
  const bitbucketRegex = /^(?:https?:\/\/)?(?:www\.)?bitbucket\.org\/[^/]+\/[^/]+\/(?:pull-requests\/\d+|branch\/[^/]+)$/i;
  return githubRegex.test(currentURL) || bitbucketRegex.test(currentURL);
};

const showAnalysisHtml = () => {
  createAndAppendDivElement();
};

const createAndAppendDivElement = () => {
  const divElement = document.createElement("div");
  divElement.id = 'gpt-analysis-from-extension';
  divElement.style.width = '600px';
  divElement.style.backgroundColor = 'white';
  divElement.style.display = 'flex';
  divElement.style.justifyContent = 'center';
  divElement.style.alignItems = 'center';
  divElement.style.position = 'fixed';
  divElement.style.right = '0';
  divElement.style.top = '100';
  divElement.style.zIndex = '1000';
  divElement.style.height = '100%';
  divElement.innerHTML = "Loading Chat GPT info... Remember to run the script in the console!";
  document.querySelector('body').prepend(divElement);
}

if (isPullRequestOrBranchPage()) {
  console.log("You are on a GitHub or Bitbucket pull request or branch page.");
  showAnalysisHtml();
} else {
  console.log("You are not on a pull request or branch page.");
}
