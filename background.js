var attachedTabs = {};

console.log('background');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('message');
  var debuggeeId = request.debuggeeId;
  if(request.enable && !attachedTabs[debuggeeId.tabId]) {
    chrome.debugger.attach(debuggeeId, "1.1", onAttach.bind(null, debuggeeId));
  }
});

function onAttach(debuggeeId) {
  var tabId = debuggeeId.tabId;
  attachedTabs[tabId] = 'pausing';
  chrome.debugger.sendCommand(debuggeeId, 'Debugger.enable', {}, onDebuggerEnabled.bind(null, debuggeeId));
}

function onDebuggerEnabled(debuggeeId) {
  chrome.debugger.sendCommand(debuggeeId, "Debugger.pause", {}, function() {
  });
}
