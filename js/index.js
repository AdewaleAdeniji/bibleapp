if('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js')
	.then(()=>{
		//console.log("serviceworker registered"); 
	})
	.catch((err)=>{
		//console.log("serviceworker not registered"+err);
	})
}
window.setTimeout(()=>{
	$(".loader").hide(200);
},5000);
	var arr = ["Gen", "Exo", "Lev", "Num", "Deu", "Jos", "Jud", "Ruth", "1 Sam", "2 Sam", "1st Kings", "2nd Kings", "1st Chron", "2nd Chron", "Ezra", "Neh", "Est", "Job", "Psm", "Prov", "Eccl", "SoS", "Isa", "Jer", "Lam", "Eze", "Dan", "Hos", "Joel", "Amos", "Oba", "Jon", "Mic", "Nah", "Haba", "Zeph", "Hag", "Zech", "Mal", "Mat", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phi", "Col", "1st Thes", "2nd Thes", "1st Tim", "2nd Tim", "Titus", "Phil", "Heb", "James", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev"];
	//var bible = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','']
	// document.querySelectorAll("td").forEach((item)=>{
	// 	arr.push(item.innerText);
	// });
	//console.log(arr);
	var lastbook = localStorage.lastbook;
	if(lastbook==undefined||lastbook==null){
		//use 0.json:1
		openbook("0.json:0");
	}
	else {
		//use this.json:2
		openbook(lastbook);
	}
	function openbook(e) {
		var books = e.split(":");
		var book = books[0];
		var inside = books[1];
		// body...
		fetch("bible/"+book)
		.then(response =>response.json())
		.then((data)=>{
			var bible = data;
			var chapters = data.chapters;
			var lent = chapters.length+1;
			var book = bible.book;
				let rt = parseInt(inside)+1;
				console.log(inside,rt);
				document.getElementById("titletext").innerHTML=book+'<i> '+rt+'</i>';
				var c = bible.chapters[inside];
				//console.log(c);
				var r = '';
			notifyM(book+':'+rt,c.verses[0].text);

				c.verses.forEach((item,index)=>{
					r += '<div class="verse"><i>'+item.verse+'</i> &nbsp;'+item.text+'</div>';
				})
				//console.log(r);
				document.getElementById("verses").innerHTML=r;
				
			})
		.catch((err)=>{
			console.log(err);
			openbook("0.json:0");
		})
	
	}
	var darkmode = localStorage.darkmode;
	if(darkmode==undefined||darkmode==null||darkmode=="false"||darkmode==false){
		$("#state").removeClass("fa-sun");
		$("#state").addClass("fa-moon");
		$("#state").attr("mode","light")
		//console.log("fa-moon");
		change(false);
	}
	else{
		$("#state").removeClass("fa-moon");
		$("#state").addClass("fa-sun");
		$("#state").attr("mode","dark")
		//console.log("fa-sun");
		change(true);
	}
	
	$(".mode").click(function(){
		var mode = $("#state").attr("mode");
		//console.log("mode");
		if(mode=="light"){
		$("#state").removeClass("fa-moon");
		$("#state").addClass("fa-sun");
		$("#state").attr("mode","dark")
		localStorage.setItem("darkmode",true);
		change(true);
		}
		else {
		$("#state").removeClass("fa-sun");
		$("#state").addClass("fa-moon");
		$("#state").attr("mode","light")
		localStorage.setItem("darkmode",false);
		change(false);
		}

	})
	function change(r){
		if(r){
			$("#stylesheet").attr('href','css/dark.css');	
		}
		else {
			$("#stylesheet").attr('href','css/style.css');
		}
		
	}
	$("#backbtn").click(function(){
		$("#choose").hide();
	})
	$(".open").click(function(){
		$("#choose").show();
		$("#chapter").show();
		$("#chapters").hide();
	})
	$("td").click(function(){
		var clicked = $(this)[0].innerText;

		var a = window.location.href;
		//window.history.pushState("Chapters","/me",a+"books/");
		let find = arr.indexOf(clicked);
		if(find>-1){
		var book = find+".json";
		// console.log(book);
		var d = window.location.href;
		$("#chapter").show();
		$("#chapters").hide();
		//window.history.pushState("clicked","/me",d+find);
		//console.log(book);
		document.getElementById("chaptersarea").innerHTML='<td>Loading...</td>';
		fetch("bible/"+book)
		.then(response =>response.json())
		.then((data)=>{
			var bible = data;
			var chapters = data.chapters;
			var lent = chapters.length+1;
			var book = bible.book;
			$("#chapter").hide();
			$("#chapters").show();
			var count = 0;
			var a = '';
			for(i=1;i<lent;i++){

			if(count==0){
			var back = '';
			var front = '<tr>';count++;
			} else if(count==5){
			var back = '</tr>';
			var front = '';
			count = 0;
			}
			else {
			var front = '';
			var back = '';count++;
			}
			//console.log(i,count,front,back);

			 var obj = front+'<td class="'+i+' chaptersclicked">'+i+'</td>'+back;

			 a += obj;
			}
			//console.log(a);
			document.getElementById("chaptersarea").innerHTML='';
			$("#chaptersarea").append(a);
			$(".chaptersclicked").click(function(){
				var inside = $(this)[0].innerText;
				var e = window.location.href;
				var bo = find+".json:";
				var br = inside-1;
				var bro = bo+br;
				// console.log(bo);
				// console.log(br);
				// console.log(bro);
				//console.log(parseInt(inside));
				localStorage.setItem("lastbook",bro);
				//window.history.pushState("clicked","/me",e+"/"+inside);
				document.getElementById("titletext").innerHTML=book+'<i> '+inside+'</i>';
				var c = bible.chapters[inside-1];
				//console.log(c);
				var r = '';
				notifyM(book+':'+inside,c.verses[0].text);
				c.verses.forEach((item,index)=>{
					r += '<div class="verse"><i>'+item.verse+'</i> &nbsp;'+item.text+'</div>';
				})
				//console.log(r);
				document.getElementById("verses").innerHTML=r;
				
				$('#choose').hide();
			});
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	else {
		//console.log("chaper clicked");
	}
	})

function notifyM(e,a) {
    // if (!window.Notification) {
    //     console.log('Browser does not support notifications.');
    // } else {
    //     // check if permission is already granted
    //     if (Notification.permission === 'granted') {
    //         // show notification here
    //         var notify = new Notification(e, {
    //                      body: a,
    //                     icon: 'images/icon.png',
    //                     badge:"2",
    //                     onclick:function(){
    //                     	console.log("clicked");
    //                     }
    //                 });
    //          //console.log(notify);
    //     } else {
    //         // request permission from user
    //         Notification.requestPermission().then(function (p) {
    //             if (p === 'granted') {
    //                 // show notification here
    //                 var notify = new Notification(e, {
    //                    body: a,
    //                     icon: 'images/icon.png',
    //                     badge:"2",
    //                     onclick:function(){
    //                     	console.log("clicked");
    //                     }

    //                 });
    //                   //  console.log(notify);
    //             } else {
    //                 console.log('User blocked notifications.');
    //             }
    //         }).catch(function (err) {
    //             console.error(err);
    //         });
    //     }
    // }
}
