
chrome.storage.local.get(null,function (objStore){
	console.log(JSON.stringify(objStore ));
	for( var objIter =0 ; objIter < objStore.fetch.length; objIter++ ){

		/*Master Row*/
		var skuRow =  document.createElement("div");
		skuRow.setAttribute("class","row");

		/*src SKU bar*/
		var srcSkuRow =  document.createElement("div");
		srcSkuRow.setAttribute("class","col-xs-2 text-center");
		srcSkuRow.innerHTML = objStore.fetch[objIter].srcSku

		/*dst SKU bar*/
		var dstSkuRow =  document.createElement("div");
		dstSkuRow.setAttribute("class","col-xs-3 text-center");
		dstSkuRow.innerHTML = objStore.fetch[objIter].dstSku

		/*matchStatus bar*/
		var matchStatusRow =  document.createElement("div");
		matchStatusRow.setAttribute("class","col-xs-3 text-center");
		matchStatusRow.innerHTML = objStore.fetch[objIter].verdict

		/*matchCode bar*/
		var matchCodeRow =  document.createElement("div");
		matchCodeRow.setAttribute("class","col-xs-4 text-center");
		matchCodeRow.innerHTML = objStore.fetch[objIter].matchcode

		/*Mearge all into oneblock*/
		skuRow.appendChild(srcSkuRow)
		skuRow.appendChild(dstSkuRow)
		skuRow.appendChild(matchStatusRow)
		skuRow.appendChild(matchCodeRow)

		/*Merget to the bar man*/
		document.getElementById("action-bar").appendChild(skuRow)

	}
	
	// $("#storageAreaChrome").html( JSON.stringify(objStore) )
});

