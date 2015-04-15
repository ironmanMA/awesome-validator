console.log("[BoomRevEXT] verdictFetch is onn baby")

function populateUIVerdict (dataObj) {
	// setValues for dropdowns
	// populateAngularUI(dataObj)
	window.postMessage(dataObj, "*");
}

function saveToChromeStorage (skuPairObject) {
	var pushObj = {}
	pushObj.state = "clear"

/*################## Talk from UI page to Extension START ############*/
	chrome.runtime.sendMessage( skuPairObject , function(response) {
		console.log(response);
	});
	// chrome.runtime.sendMessage( pushObj , function(response) {
	// 	console.log(response);
	// });
/*################## Talk from UI page to Extension END  ############*/

}

function testChrome (argument) {
	console.log("[BoomRevEXT] yes you can call this")
}

/*################## Talk from Extention to UI page START ############*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log("[BoomRevEXT] listening to chrome messge in verdictFetch!!!" + JSON.stringify(request) );
	// console.log(sender.tab ? "from a content script:" + sender.tab.url :"from the extension");
	// console.log(request)
	if( request.state == "update_boomrev_ui" ){
		
		if( window.name == "BoomRevUI" ){
			console.log("[BoomRevEXT] will update boomrev ui !!!" + JSON.stringify(request) );
			window.postMessage(request, "*");
		}

	}else if ( request.state == "update_src_window" ){
		
		var srcWindowName = "src_#_"+request.srcSku+"_#_dst_#_"+request.dstSku
		if( window.name ==  srcWindowName ){
			console.log("[BoomRevEXT] will update src window !!!" + JSON.stringify(request)+", prevVerdict: "+document.getElementById('verdict').innerHTML );
			document.getElementById('verdict').innerHTML = request.verdict;
			// window.postMessage(request, "*");
		}

	}else if ( request.state == "update_dst_window" ){
		
		var dstWindowName = "dst_#_"+request.dstSku+"_#_src_#_"+request.srcSku
		if( window.name == dstWindowName ){
			console.log("[BoomRevEXT] will update dst window !!!" + JSON.stringify(request) +", prevVerdict: "+document.getElementById('verdict').innerHTML );
			document.getElementById('verdict').innerHTML = request.verdict;
			// window.postMessage(request, "*");
		}

	}

	// populateUIVerdict( request )
	var k={}
	k.greeting="Hello"
	sendResponse( k );
  });

var port = chrome.runtime.connect();
/*################## Talk from Extention to UI page END  ############*/

window.addEventListener("message", function(event) {
	console.log("[BoomRevEXT] listening ot WINDOW.msg verdictFetch: " + JSON.stringify(event.data) );
  // We only accept messages from ourselves
  if (event.source != window)
    return;
	// saveToChrome(event.data)
  
  if (event.data.type && (event.data.type == "save_to_chrome_storage")) {  	
    	console.log("[BoomRevEXT] object to store received: " + event.data.text);
    	saveToChromeStorage(event.data.objToSave)
  }

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("[BoomRevEXT] Content script received: " + event.data.text);
  }
}, false);