try{
const cachename = "site-static";
const dyname = "site-dynamic";
const assname = "site-stat";
//install event 
const assets = [
	'/',
	'css/style.css',
	'css/dark.css',
	'css/fonts.css',
	'f2/css/all.css',
	'fonts/Lato-Italic.ttf',
	'fonts/Lato-Light.ttf',
	'fonts/Lato-Regular.ttf',
	'f2/webfonts/fa-solid-900.woff',
	'f2/webfonts/fa-regular-400.woff',
	'manifest.json',
	'images/icon.png']

	const asset = ["bible/0.json", "bible/1.json", "bible/2.json", "bible/3.json", "bible/4.json", "bible/5.json", "bible/6.json", "bible/7.json", "bible/8.json", "bible/9.json", "bible/10.json", "bible/11.json", "bible/12.json", "bible/13.json", "bible/14.json", "bible/15.json", "bible/16.json", "bible/17.json", "bible/18.json", "bible/19.json", "bible/20.json", "bible/21.json", "bible/22.json", "bible/23.json", "bible/24.json", "bible/25.json", "bible/26.json", "bible/27.json", "bible/28.json", "bible/29.json", "bible/30.json", "bible/31.json", "bible/32.json", "bible/33.json", "bible/34.json", "bible/35.json", "bible/36.json", "bible/37.json", "bible/38.json", "bible/39.json", "bible/40.json", "bible/41.json", "bible/42.json", "bible/43.json", "bible/44.json", "bible/45.json", "bible/46.json", "bible/47.json", "bible/48.json", "bible/49.json", "bible/50.json", "bible/51.json", "bible/52.json", "bible/53.json"]
	const ass = ["bible/54.json", "bible/55.json", "bible/56.json", "bible/57.json", "bible/58.json", "bible/59.json", "bible/60.json", "bible/61.json", "bible/62.json", "bible/63.json", "bible/64.json", "bible/65.json"]
// for(i=0;i<66;i++){
// 	var srcs = "bible/"+i+".json";
// 	assets.push(srcs);
// }
//console.log(assets);
// const limitcache=(name,size)=>{
// 	caches.open(name)
// 	.then((cache)=>{

// 	})
// }
self.addEventListener('install',evt=>{
//	console.log("service worker installed");
	evt.waitUntil(
	caches.open(cachename)
	.then((cache)=>{
		cache.addAll(assets);
	})
	
	.catch((err)=>{
		console.log(err);
	})

	);
	evt.waitUntil(
	caches.open(dyname)
	.then((cache)=>{
		cache.addAll(asset);
	})
	.catch((err)=>{
		console.log(err);
	})


	);
	evt.waitUntil(
	caches.open(assname)
	.then((cache)=>{
		cache.addAll(ass);
	})
	.catch((err)=>{
		console.log(err);
	})


	);
});
//activate service worker

self.addEventListener("activate",evt=>{
	//console.log("service worker acivated");
});

//fetch
self.addEventListener('fetch',(evt)=>{
	// console.log(evt);
	evt.respondWith(
		caches.match(evt.request)
		.then((cacheRes)=>{
			return cacheRes  || fetch(evt.request).then((fetchRes)=>{
				return caches.open(cachename).then((cache)=>{
					cache.put(evt.request.url,fetchRes.clone());
					return fetchRes;
				})
			})
			.catch((err)=>{
				console.log(err);
			})
		})
		);
});
}
catch(err){
	console.log(err);
}