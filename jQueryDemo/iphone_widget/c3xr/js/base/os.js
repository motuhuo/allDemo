//2015.8.27
var os=importOS();
function importOS() {
	var	userAgent=navigator.userAgent;
	var os = {};
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp=userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
	if(os.ios) os.iosVer=parseInt(userAgent.match(/OS \d_/)[0].match(/\d/)[0]);
	else os.iosVer=0;
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
	os.netease = userAgent.indexOf("NewsApp")>=0 ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.iphone6Plus=os.ios && ( (screen.width==414 && screen.height==736) || (screen.width==736 && screen.height==414) && window.devicePixelRatio==3 );
	os.iphone6=os.ios && ( (screen.width==375 && screen.height==667) || (screen.width==667 && screen.height==375) );
	os.iphone5=os.ios && ( (screen.width==320 && screen.height==568) || (screen.width==568 && screen.height==320) );
	os.iphone4=(os.ios && ( (screen.width==320 && screen.height==480) || (screen.width==480 && screen.height==320) ) ) || (screen.width==540 && screen.height==702);
	os.screen169=screen.width/screen.height==9/16 || screen.height/screen.width==9/16 || (window.innerWidth==540 && window.innerHeight==850) ;
	return os;
}//end func

