console.log("verdictFetch is onn baby")
function populateUIVerdict (dataObj) {
	//setValues for dropdowns
	// populateAngularUI(dataObj)
	window.postMessage(dataObj, "*");
}

function saveToChrome (skuPairObject) {
	var pushObj = {}
	pushObj.state = "clear"
	chrome.runtime.sendMessage( pushObj , function(response) {
		console.log(response);
		chrome.runtime.sendMessage( skuPairObject , function(response) {
			console.log(response);
		});		
	});

}

function testChrome (argument) {
	console.log("yes you can call this")
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log(sender.tab ? "from a content script:" + sender.tab.url :"from the extension");
	console.log(request)
	populateUIVerdict( request )
	var k={}
	k.freeting="Hello"
	sendResponse( k );
  });

var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;
	saveToChrome(event.data)
  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    // port.postMessage(event.data.text);
  }
}, false);