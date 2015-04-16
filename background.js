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
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###dst### pair
						*/						
						request.state = "update_boomrev_ui";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_boomrev_ui "+JSON.stringify(response) );
						});
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###dst### pair = Done
						*/
						request.state = "update_dst_window";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_dst_window "+JSON.stringify(response) );
						});
					}
				});
				console.log(chromeObject)
			});
		});
	});    	

    }else if ( request.state == "updating_from_src_matchcode" ){
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
				chromeObject.fetch[sku].matchcode = request.matchcode;
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
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###dst### pair
						*/						
						request.state = "update_boomrev_ui_matchcode";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_boomrev_ui "+JSON.stringify(response) );
						});
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###dst### pair = Done
						*/
						request.state = "update_dst_window_matchcode";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_dst_window "+JSON.stringify(response) );
						});
					}
				});
				console.log(chromeObject)
			});
		});
	});

    }else if ( request.state == "updating_from_dst" ){
    	//store in chrome, send to valid UI, send to ###src### pair
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
			var toSendWindowName = "src_#_"+request.srcSku+"_#_dst_#_"+request.dstSku
			var currentWindowName = "dst_#_"+request.dstSku+"_#_src_#_"+request.srcSku
			/*
				store in chrome = Done
				send to valid UI,
				send to ###src### pair
			*/
			console.log("[BoomRevEXT] Action:"+request.state+" SET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
			chrome.storage.local.get(null,function (chromeObject){
				console.log("[BoomRevEXT] Action:"+request.state+" Confirm-GET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
				chrome.tabs.query({}, function(allTabs) {
					for (var iterTabs=0; iterTabs<allTabs.length; ++iterTabs) {
						//send to Validation UI
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###src### pair
						*/
						request.state = "update_boomrev_ui";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_boomrev_ui "+JSON.stringify(response) );
						});
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###src### pair = Done
						*/
						request.state = "update_src_window";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_dst_window "+JSON.stringify(response) );
						});
					}
				});
				console.log(chromeObject)
			});
		});
	});

    }else if ( request.state == "updating_from_dst_matchcode" ){
    	//store in chrome, send to valid UI, send to ###src### pair
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
				chromeObject.fetch[sku].matchcode = request.matchcode;
				break;
			}
		}
		console.log(chromeObject)
		chrome.storage.local.set(chromeObject,function (){
			var boomrevWindowName = "BoomRevUI"
			var toSendWindowName = "src_#_"+request.srcSku+"_#_dst_#_"+request.dstSku
			var currentWindowName = "dst_#_"+request.dstSku+"_#_src_#_"+request.srcSku
			/*
				store in chrome = Done
				send to valid UI,
				send to ###src### pair
			*/
			console.log("[BoomRevEXT] Action:"+request.state+" SET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
			chrome.storage.local.get(null,function (chromeObject){
				console.log("[BoomRevEXT] Action:"+request.state+" Confirm-GET: Chrome Storage !!!"+JSON.stringify(chromeObject) );
				chrome.tabs.query({}, function(allTabs) {
					for (var iterTabs=0; iterTabs<allTabs.length; ++iterTabs) {
						//send to Validation UI
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###src### pair
						*/
						request.state = "update_boomrev_ui_matchcode";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_boomrev_ui "+JSON.stringify(response) );
						});
						/*
							store in chrome = Done
							send to valid UI = Done
							send to ###src### pair = Done
						*/
						request.state = "update_src_window_matchcode";
						chrome.tabs.sendMessage(allTabs[iterTabs].id, request, function(response) {
							console.log("[BoomRevEXT] update_dst_window "+JSON.stringify(response) );
						});
					}
				});
				console.log(chromeObject)
			});
		});
	});

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

    }
	sendResponse( respMsg );	
  });
