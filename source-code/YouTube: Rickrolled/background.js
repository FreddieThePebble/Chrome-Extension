let isEnabled = true; // Default to enabled

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'enable') {
    isEnabled = true;
  } else if (message.action === 'disable') {
    isEnabled = false;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("https://www.youtube.com/watch?v=") && isEnabled) {
    const currentVideoId = new URL(tab.url).searchParams.get('v');
    if (currentVideoId !== 'pqPWVOgoYXc') {
      let newUrl = tab.url.replace(/(https:\/\/www\.youtube\.com\/watch\?v=)[\w-]+/, '$1pqPWVOgoYXc');
      chrome.tabs.update(tabId, { url: newUrl });
    }
  }
});
