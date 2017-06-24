$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	//----------------------------------------页面初始化----------------------------------------
	icom.orient(init);//屏幕翻转初始化
	icom.screenTo169(true,false);//把非16:9屏幕的article标签拉伸至16:9,第一个参数是iphone4，第二个参数是非物理系统按键的安卓
	
	function init(){
//		loadBox.show();
		iuser.init(userGetted);
//		load_handler();		
	}//edn func

	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.png');
		
		//实际加载进度
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*50);
//			loadPer.html(per+'%');
//		});
		
		loader.addCompletionListener(function() {
			init_handler();
//			load_timer(50);//模拟加载进度
			loader=null;
		});
		loader.start();	
	}//end func
	
	//模拟加载进度
	function load_timer(per){
		per=per||0;
		per+=imath.randomRange(1,3);
		per=per>100?100:per;
		loadPer.html(per+'%');
		if(per==100) setTimeout(init_handler,200);
		else setTimeout(load_timer,33,per);
	}//edn func
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		console.log('init handler');
		icom.fadeOut(loadBox,500);
		monitor_handler();
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
