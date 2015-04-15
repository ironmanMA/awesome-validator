console.log("[BoomRevEXT] Background.js")

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
    var respMsg={}
    respMsg.freeting=request.state
    console.log(request)
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

    }else if ( request.state == "updating_from_src" ){
    	respMsg.status = "updating from src to Chrome Storage"
	/*	
		store in chrome, 
		send to valid UI, 
		send to ###dst### pair
	*/
	chrome.storage.local.get(null,function (chromeObject){
		console.log("[BoomRevEXT] Action:"+request.state+" GET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
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
			var boomrevWindowName = "BoomRevUI"
			var currentWindowName = "src_#_"+request.srcSku+"_#_dst_#_"+request.dstSku
			var toSendWindowName = "dst_#_"+request.dstSku+"_#_src_#_"+request.srcSku
			/*
				store in chrome = Done
				send to valid UI, 
				send to ###dst### pair
			*/
			console.log("[BoomRevEXT] Action:"+request.state+" SET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
			chrome.storage.local.get(null,function (chromeObject){
				console.log("[BoomRevEXT] Action:"+request.state+" Confirm-GET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
				chrome.tabs.query({}, function(allTabs) {
					for (var iterTabs=0; iterTabs<allTabs.length; ++iterTabs) {
						//send to Validation UI
						
						request.state = "update_boomrev_ui";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_boomrev_ui "+JSON.stringify(response) );
						});

						request.state = "update_dst_window";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_dst_window "+JSON.stringify(response) );
						});
						
						// var codeToWork = "window.name+'_#_tabID_#_"+iterTabs+"';"
						// chrome.tabs.executeScript( allTabs[iterTabs].id, {code: codeToWork }, function(codeResult){
						// 	if( codeResult != undefined ){
						// 		var reqWindowName = codeResult[0].split("_#_tabID_#_")[0]
						// 		var reqTabID = parseInt(codeResult[0].split("_#_tabID_#_")[1])
						// 		console.log("[BoomRevEXT] window object for "+codeResult[0]+", winName: "+reqWindowName+", tabID: "+reqTabID);
						// 		if( reqWindowName.indexOf( boomrevWindowName ) >=0 ){
						// 			var requestToBeSent = jQuery.extend(true, {}, request);
						// 			requestToBeSent.state = "update_boomrev_ui";
						// 			console.log("[BoomRevEXT] sending update_boomrev_ui msg"); 
						// 			console.log(requestToBeSent)
									
						// 				// store in chrome = Done
						// 				// send to valid UI = Done
						// 				// send to ###dst### pair
									
						// 			chrome.tabs.sendMessage(allTabs[reqTabID].id, requestToBeSent, function(response) {
						// 				console.log(response);
						// 			});

						// 		}else if ( reqWindowName.indexOf( toSendWindowName ) >=0 ){
						// 			var requestToBeSent = jQuery.extend(true, {}, request);
						// 			requestToBeSent.state = "update_dst_window";
						// 			console.log("[BoomRevEXT] sending update_dst_window msg"); 
						// 			console.log(requestToBeSent)
									
						// 				// store in chrome = Done
						// 				// send to valid UI = Done
						// 				// send to ###dst### pair = Done
									
						// 			chrome.tabs.sendMessage(allTabs[reqTabID].id, requestToBeSent, function(response) {
						// 				console.log(response);
						// 			});
						// 		}else{
						// 			console.log("[BoomRevUI] nai mila for "+codeResult[0]+", winName: "+reqWindowName+", tabID: "+reqTabID+", dst req: "+toSendWindowName)
						// 		}
						// 			console.log("[BoomRevUI] wasdone??? "+codeResult[0]+", winName: "+reqWindowName+", tabID: "+reqTabID+", dst req: "+toSendWindowName)
						// 	}
						// } );
						// chrome.tabs.get(allTabs[iterTabs].id, function(tab){
						// 	chrome.windows.get(tab.windowId, function(win){
						// 		console.log("[BoomRevEXT] window object for "+tab.url)
						// 		console.log(win);
						// 	});
						// });
					}
				});
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					console.log("[BoomRevEXT] Action:"+request.state+" sending request to verdictFetch !!!"+JSON.stringify(tabs) );
					chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
					console.log(response.farewell);
					});
				});				
				console.log(chromeObject)
			});
		});
	});    	

    }else if ( request.state == "updating_from_dst" ){
    	//store in chrome, send to valid UI, send to ###src### pair

    }else if( request.state == "clear"){
    	
	chrome.storage.local.clear(function (){
		console.log("Storage Hogayo") 
	});
    }else if( request.state == "create" ){
    	respMsg.status = "saving to Chrome Storage"
	/*############## Clearing Chrome Storage ##############*/
	chrome.storage.local.clear(function (){
		console.log("[BoomRevEXT] Action:"+request.state+" Chrome Storage Cleared !!!");
		/*############## Getting Chrome Storage ##############*/
		chrome.storage.local.get(null,function (fetchObject){
			console.log("[BoomRevEXT] Action:"+request.state+" Chrome Storage GET: "+JSON.stringify(fetchObject) );
			fetchObject.fetch = JSON.parse(JSON.stringify(request.skus))
			// console.log(fetchObject)
			/*############## Setting Chrome Storage ##############*/
			chrome.storage.local.set(fetchObject,function (){
				console.log("[BoomRevEXT] Action:"+request.state+" Chrome Storage SET: "+JSON.stringify(fetchObject) );
				/*############## Confirm-Getting Chrome Storage ##############*/
				chrome.storage.local.get(null,function (fetchObject){
					console.log("[BoomRevEXT] Action:"+request.state+" Chrome Storage Confirm-SET: "+JSON.stringify(fetchObject) );
					// console.log(fetchObject)
				});
			});
		});
	});

	// chrome.storage.local.get(null,function (fetchObject){
	// 	if( fetchObject.fetch == undefined ){
	// 		fetchObject.fetch=[];
	// 	}
	// 	fetchObject.fetch = JSON.parse(JSON.stringify(request.skus))
	// 	console.log(fetchObject) 
	// 	chrome.storage.local.set(fetchObject,function (){
	// 		console.log("Storage Hogayo create") 
	// 		chrome.storage.local.get(null,function (fetchObject){
	// 			console.log(fetchObject)
	// 		});
	// 	});
	// });

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
	sendResponse( respMsg );	
  });
