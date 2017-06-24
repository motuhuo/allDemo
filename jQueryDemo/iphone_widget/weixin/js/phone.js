$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	console.log('window size:'+windowWd+'/'+windowHt);
	
	
	//income
	var bgBox=$('div.bg');
	var incomeBox=$('aside.income');
	var incomeAnswer=$('aside.answer');
	var btnAnswer=$('.btnAnswer');
	
	//answer
	var timerBox=$('div.timer');
	var phone;
	var btnHangup=$('.btnHangup');
	
	//----------------------------------------页面初始化----------------------------------------
	iOrient.init();//屏幕翻转锁定，默认锁定竖屏，横屏提示
	icom.screenTo169(false,false);//把article标签拉伸至iphone5的高宽比例
	//icom.screenToPx(320,504,true);//把以px为单位的article标签拉伸到适应屏幕的高宽比例，iphone4默认等比压缩左右留白
	loadBox.show();
	iuser.init(userGetted);
//	load_handler();
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('页面图片加载完毕');
			//sound_handler();
			init_handler();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		console.log('init handler');
		icom.fadeOut(loadBox,500);
		monitor_handler();
		income_handler();
	}//end func
	
	function income_handler(){
		btnAnswer.one('touchend',answer_handler);
	}//end func
	
	function answer_handler(){
		incomeBox.hide();
		incomeAnswer.show();
		bgBox.addClass('blur');
		timer_handler();
		voice_handler();
	}//edn func
	
	function timer_handler(timer){
		timer=timer||0;
		console.log('timer:'+timer);
		var second=timer%60;
		var minute=Math.floor(timer/60);
		timerBox.html(num_handler(minute)+':'+num_handler(second));
		setTimeout(timer_handler,1000,timer+1);
	}//end func
	
	function num_handler(num){
		return num<10?'0'+num:num;
	}//end func
	
	function voice_handler(){
		loadBox.show();
		phone=iaudio.on('sound/phone.mp3',{onLoaded:phone_loaded,onEnded:page_next});
		btnHangup.one('touchend',function(e){
			phone.pause();
			page_next();
		});
	}//edn func
	
	function phone_loaded(sound){
		loadBox.hide();
		sound.play();
	}//end func
	
	function page_next(){
		location.href='chat.html';
	}//end func
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
		//imonitor.add({obj:$('a.btnTest'),action:'touchend',category:'首页',label:'测试按钮'});
	}//end func
	
});//end ready
