console.log('test-main.js');

function doClick (argument) {
	// body...
	alert("The paragraph was clicked, MSG: "+$('#test-input').val()+" |||" );
}

$.get(chrome.extension.getURL('/test-template.html'), function(data) {
	$($.parseHTML(data)).appendTo('body');
});