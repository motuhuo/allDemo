function setCookie(name,value,lifeCircle){
	var	cDate = new Date();
	cDate.setDate(new Date().getDate()+lifeCircle);
	document.cookie = name+"="+value+";expires="+cDate+";path=/";
}
function getCookie(name){
	var reg = /\s+/g;
	var cookie = document.cookie.replace(reg,"");
	var cookieArr = cookie.split(";");
	for(var i=0;i<cookieArr.length;i++){
		var attrArr = cookieArr[i].split("=");
		if(attrArr[0]==name){
			return attrArr[1];
		}
	}
}
function remove(name){
	var	cDate = new Date();
	cDate.setDate(new Date().getDate()-1);
	document.cookie = name+"=1;expires="+cDate+";path=/";
}
