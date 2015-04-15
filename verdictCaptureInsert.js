function giveVerdictObject (verdictStatus) {	
	var sendObj={}
	if( window.name.split("_#_")[0] == "src" ){
		sendObj.state = "updating_from_src";
		sendObj.srcSku = window.name.split("_#_")[1]
		sendObj.dstSku = window.name.split("_#_")[3]
		sendObj.verdict = verdictStatus
	}else if( window.name.split("_#_")[0] == "dst" ){
		sendObj.state = "updating_from_dst";
		sendObj.srcSku = window.name.split("_#_")[3]
		sendObj.dstSku = window.name.split("_#_")[1]
		sendObj.verdict = verdictStatus
	}

	return sendObj
}

setTimeout(function(){

		console.log('[BoomRevEXT] sdfsdfdssd')

		$("#test-submit-match").click(function(){
			console.log("[BoomRevEXT] The Verdict is MATCH!!!" );
			document.getElementById('verdict').innerHTML = "Match"
			var pushMsg = giveVerdictObject('MATCH')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-similar").click(function(){
			console.log("[BoomRevEXT] The Verdict is SIMILAR!!!" );
			document.getElementById('verdict').innerHTML = "Similar"
			var pushMsg = giveVerdictObject('SIMILAR')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-nomatch").click(function(){
			console.log("[BoomRevEXT] The Verdict is NOMATCH!!!" );
			document.getElementById('verdict').innerHTML = "No Match"
			var pushMsg = giveVerdictObject('NOMATCH')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

	}, 1500)

