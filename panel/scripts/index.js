var tabId = chrome.devtools.inspectedWindow.tabId;
var debuggeeId = {tabId: tabId};

chrome.runtime.sendMessage({enable: true, debuggeeId: debuggeeId});
