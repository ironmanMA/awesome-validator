console.log('insert')

console.log($("#test-submit"))
setTimeout(function(){
		console.log('sdfsdfdssd')
		$("#test-submit").click(function(){
			console.log("The paragraph was clicked, MSG: "+$('#test-input').val()+" |||" );
			var msg = $('#test-input').val();
			chrome.runtime.sendMessage({greeting: msg }, function(response) {
			  console.log(response);
			});
		});


		}, 500)

$("#test-submit").click(function(){
	alert("The paragraph was clicked, MSG: "+$('#test-input').val()+" |||" );
});

function doClick (argument) {
	// body...
	alert("The paragraph was clicked, MSG: "+$('#test-input').val()+" |||" );
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request)
    	var k={}
    	k.freeting="Hello"
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