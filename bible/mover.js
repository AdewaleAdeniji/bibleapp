var fs  = require('fs');
var path = require("path");
var folderPath = '/Xampp/htdocs/bible/bible';

fs.readdirSync(folderPath).map(fileName => {
	var a = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1Samuel", "2Samuel", "1Kings", "2Kings", "1Chronicles", "2Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts","Romans", "1Corinthians", "2Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1Thessalonians", "2Thessalonians", "1Timothy", "2Timothy", "Titus", "Philemon", "Hebrews", "James", "1Peter", "2Peter", "1John", "2John", "3 John", "Jude", "Revelation"];
	var found = 0;
	a.forEach((item,index)=>{
		if(fileName.indexOf(item)>-1){
			found = index;
		}

	})
	if(found>0){
	fs.rename(fileName, found+".json", function (err) {
  if (err) throw err;
  console.log(fileName +' File Renamed! to '+found+".json");
});
	}
	
})