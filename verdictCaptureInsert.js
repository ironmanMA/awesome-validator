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

function giveMatchCodeObject (matchCode) {	
	var sendObj={}
	if( window.name.split("_#_")[0] == "src" ){
		sendObj.state = "updating_from_src_matchcode";
		sendObj.srcSku = window.name.split("_#_")[1]
		sendObj.dstSku = window.name.split("_#_")[3]
		sendObj.matchcode = matchCode
	}else if( window.name.split("_#_")[0] == "dst" ){
		sendObj.state = "updating_from_dst_matchcode";
		sendObj.srcSku = window.name.split("_#_")[3]
		sendObj.dstSku = window.name.split("_#_")[1]
		sendObj.matchcode = matchCode
	}

	return sendObj
}

setTimeout(function(){

		console.log('[BoomRevEXT] sdfsdfdssd')

		$("#test-submit-match").click(function(){
			console.log("[BoomRevEXT] The Verdict is MATCH!!!" );
			var matchStatusNow = document.getElementById("test-submit-match").getAttribute("value");
			document.getElementById('verdict').innerHTML = matchStatusNow
			var pushMsg = giveVerdictObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-similar").click(function(){
			console.log("[BoomRevEXT] The Verdict is SIMILAR!!!" );
			var matchStatusNow = document.getElementById("test-submit-match").getAttribute("value");
			document.getElementById('verdict').innerHTML = matchStatusNow
			var pushMsg = giveVerdictObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-nomatch").click(function(){
			console.log("[BoomRevEXT] The Verdict is NOMATCH!!!" );
			var matchStatusNow = document.getElementById("test-submit-match").getAttribute("value");
			document.getElementById('verdict').innerHTML = matchStatusNow
			var pushMsg = giveVerdictObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#matchcode-brand").click(function(){
			console.log("[BoomRevEXT] The MatchCode is Brand-Mis-Match !!!" );
			var matchStatusNow = document.getElementById("matchcode-brand").getAttribute("value");
			document.getElementById('matchcode').innerHTML = matchStatusNow
			var pushMsg = giveMatchCodeObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#matchcode-packsize").click(function(){
			console.log("[BoomRevEXT] The Verdict is PackSizeMisMatch!!!" );
			var matchStatusNow = document.getElementById("matchcode-packsize").getAttribute("value");
			document.getElementById('matchcode').innerHTML = matchStatusNow
			var pushMsg = giveMatchCodeObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#matchcode-otherattr").click(function(){
			console.log("[BoomRevEXT] The Verdict is OtheAttrMisMatch !!!" );
			var matchStatusNow = document.getElementById("matchcode-otherattr").getAttribute("value");
			document.getElementById('matchcode').innerHTML = matchStatusNow
			var pushMsg = giveMatchCodeObject(matchStatusNow)
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});						

	}, 1500)

