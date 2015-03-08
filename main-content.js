console.log("Lowes.js")

$.get(chrome.extension.getURL('/test-template.html'), function(data) {
	$($.parseHTML(data)).appendTo('body');
});

// var postURL = "http://boombar.lowes.rboomerang.com/priceintel/Widgets/visualisation/Category/all/skus?offset=0&searchTerm=";
// var productClient ="Lowes"


// if ( (window.location.pathname.indexOf('ProductDisplay') > -1) || (  window.location.pathname.indexOf('/pd_') > -1 ) ){
// 	appendUI()
// }

// function appendUI (data) {
// 	$('html').attr("ng-app", "boomcomm-app")

// 	console.log("DO it")
// 	$.get(chrome.extension.getURL('/template.html'), function(data) {
// 	    $($.parseHTML(data)).appendTo('body');
// 	});
// }
