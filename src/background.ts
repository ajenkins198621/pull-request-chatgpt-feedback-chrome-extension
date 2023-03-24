chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // TOOD Need to listen for url changes

  if (request.action === "fetchDataFromNewTab") {
    const url = request.url;

    chrome.tabs.create({ url }, (tab) => {
      const dataListener = (request: any, sender: chrome.runtime.MessageSender) => {
        if (request.action === "fetchedData") {
          sendResponse({ success: true, data: request.data });
          chrome.tabs.remove(tab.id); // Close the tab after fetching the data
          chrome.runtime.onMessage.removeListener(dataListener); // Remove the listener after the data is fetched
        }
      };

      // Add a listener to wait for the data to be sent back from the content script
      chrome.runtime.onMessage.addListener(dataListener);
    });

    // Indicate that the response will be sent asynchronously
    return true;
  }


  if (request.action === "fetchDataFromChatGPTApi") {
    fetch(`http://localhost:4175/api/analyze-code-diff`, { // TODO Make Port configurable
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diffs: request.diffs }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ success: true, data })
      })
      .catch((error) => {
        sendResponse({ success: false, error })
      });
      return true; // Response asynchronously (important to keep);
  }
});
