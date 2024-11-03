let requestCount = {};

chrome.webRequest.onCompleted.addListener(
    (details) => {
        const { tabId } = details;
        if (tabId in requestCount) {
            requestCount[tabId]++;
        } else {
            requestCount[tabId] = 1;
        }
    },
    { urls: ["<all_urls>"] }
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "loading") {
        requestCount[tabId] = 0;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getRequestCount") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTabId = tabs[0]?.id;
            sendResponse({ count: requestCount[activeTabId] || 0 });
        });
        return true;
    }
});
