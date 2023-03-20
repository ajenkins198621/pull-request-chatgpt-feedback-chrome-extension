(() => {
    const data = document.documentElement.textContent;
    chrome.runtime.sendMessage({ action: "fetchedData", data });
  })();