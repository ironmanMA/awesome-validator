console.log('[BoomRevEXT] test-main.js');

$.get(chrome.extension.getURL('/verdict-template.html'), function(data) {
	$($.parseHTML(data)).appendTo('body');
});