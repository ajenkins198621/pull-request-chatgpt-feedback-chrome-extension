chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('background.ts');
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
  });
  