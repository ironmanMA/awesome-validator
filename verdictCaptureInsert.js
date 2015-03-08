function giveVerdictObject (verdictStatus) {
	var sendObj={}
	sendObj.state = "update"
	sendObj.srcSku = window.location.href.split('?boomrev')[1].split('_client_pair=')[1];
	sendObj.dstSku = window.location.href.split('?boomrev')[2].split('_comp_pair=')[1];
	sendObj.verdict = verdictStatus
	return sendObj
}

setTimeout(function(){

		console.log('sdfsdfdssd')

		$("#test-submit-match").click(function(){
			console.log("The Verdict is MATCH!!!" );
			document.getElementById('verdict').innerHTML = "Match"
			var pushMsg = giveVerdictObject('MATCH')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-similar").click(function(){
			console.log("The Verdict is SIMILAR!!!" );
			document.getElementById('verdict').innerHTML = "Similar"
			var pushMsg = giveVerdictObject('SIMILAR')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

		$("#test-submit-nomatch").click(function(){
			console.log("The Verdict is NOMATCH!!!" );
			document.getElementById('verdict').innerHTML = "No Match"
			var pushMsg = giveVerdictObject('NOMATCH')
			console.log(pushMsg)
			chrome.runtime.sendMessage(pushMsg, function(response) {
			  console.log(response);
			});
		});

	}, 1500)