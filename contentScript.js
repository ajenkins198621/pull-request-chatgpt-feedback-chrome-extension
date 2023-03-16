chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeCodeDiff") {
      analyzeCodeDiff();
    }
  });
  
  async function analyzeCodeDiff() {
    const codeDiffs = getCodeDiffs();
    for (const codeDiff of codeDiffs) {
      const feedback = await getChatGPTFeedback(codeDiff);
      displayFeedback(feedback, codeDiff);
    }
  }
  
  function getCodeDiffs() {
    // Implement code to extract code diffs from the Bitbucket website
  }
  
  async function getChatGPTFeedback(codeDiff) {
    // Implement code to call ChatGPT API for code analysis
  }
  
  function displayFeedback(feedback, codeDiff) {
    // Implement code to display feedback on the Bitbucket website
  }
  