$(function() {
  $('#lauchWebsite').click(function() {
     chrome.tabs.create({url: 'http://boomerangcommerce.com'});
  });
});

$(function() {
$('#test-submit-now').click(function() {
	console.log(" clicked send")
	chrome.storage.local.get(null,function (obj){
		console.log(obj)
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs)
			chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
				console.log(response);
			});
		});	
	});	
});
});

document.addEventListener('DOMContentLoaded');

chrome.storage.local.get(null,function (obj){
	console.log(JSON.stringify(obj));
	console.log(obj);
	// if(obj.expressions == undefined){
	// 	obj.expressions = {};
	// 	obj.expressions.hi = "Local Chrome Storage, "
	// }
	$("#storageAreaChrome").html( JSON.stringify(obj) )
});

$('#test-submit-now').click(function() {
	console.log(" clicked send")
	chrome.storage.local.get(null,function (obj){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, obj, function(response) {
			console.log(response.farewell);
			});
		});	
	});	
});

