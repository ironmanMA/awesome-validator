console.log("Background.js")

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if (tab.url.indexOf("google") > -1 && changeInfo.url === undefined){
		console.log("Tab URL");
		console.log(tab);
		console.log(tabId);
		console.log(changeInfo);		
		chrome.tabs.executeScript(tabId, {file: "script.js"} );
	}
});

function returnStorage () {
	chrome.storage.local.get(null,function (obj){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
			console.log(response.farewell);
			});
		});	
	});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    var k={}
    k.freeting=request.state
    if( request.state == "update" ){
    	
    	chrome.storage.local.get(null,function (chromeObject){
    		console.log(chromeObject)
    		console.log(request);
    		for( sku in chromeObject.fetch ){
    			if( chromeObject.fetch[sku].srcSku == request.srcSku && chromeObject.fetch[sku].dstSku == request.dstSku ){
    				chromeObject.fetch[sku].verdict = request.verdict;
    				break;
    			}
    		}
    		console.log(chromeObject)
		chrome.storage.local.set(chromeObject,function (){
			console.log("Storage Hogayo update") 
			chrome.storage.local.get(null,function (fetchObject){
				console.log(fetchObject)
			});			
		});    		
    	});

    }else if( request.state == "clear"){
    	
	chrome.storage.local.clear(function (){
		console.log("Storage Hogayo") 
	});
    }else if( request.state == "create" ){
    	
	chrome.storage.local.get(null,function (fetchObject){
		if( fetchObject.fetch == undefined ){
			fetchObject.fetch=[];
		}
		fetchObject.fetch = JSON.parse(JSON.stringify(request.skus))
		console.log(fetchObject) 
		chrome.storage.local.set(fetchObject,function (){
			console.log("Storage Hogayo create") 
			chrome.storage.local.get(null,function (fetchObject){
				console.log(fetchObject)	
			});
		});
	});

    }
    	
    	
	// chrome.storage.local.get(null,function (obj){
	// 	console.log(JSON.stringify(obj));
	// 	console.log(obj);
	// 	if(obj.expressions == undefined){
	// 		obj.expressions = {};
	// 		obj.expressions.hi = "Local Chrome Storage, "
	// 	}
		
	// 	obj.expressions.hi +=request.greeting+", ";
		
	// 	chrome.storage.local.set(obj,function (){			
	// 		console.log("Storage Hogayo");
	// 	});
	// });	
	sendResponse( k );	
  });