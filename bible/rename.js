var fs  = require('fs');
var path = require("path");
var folderPath = '/xampp/htdocs/bible/bible';

fs.readdirSync(folderPath).map(fileName => {
	var spl = fileName.split(".")[1];
	if (spl=='json') {
		let f = fileName.split(".")[0];
		var arr = [];
		for(i=10;i<66;i--){
			arr.push((i).toString());
		}
		console.log(fileName,arr.indexOf(f))
// 		if(arr.indexOf(fileName)>-1){
// 			fs.rename(fileName, f+".json", function (err) {
//   if (err) throw err;
//   console.log(fileName +' File Renamed! to '+f+".json");
// });
// 		}
	}
	
})