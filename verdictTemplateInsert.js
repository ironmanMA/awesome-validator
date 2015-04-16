console.log('[BoomRevEXT] test-main.js');

if( window.name.split("_#_")[0] == "src" || window.name.split("_#_")[0] == "dst" ){
	$.get(chrome.extension.getURL('/verdict-template.html'), function(data) {
		$($.parseHTML(data)).appendTo('body');
	});
}
