$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	
	var windowWd=$(window).width(),windowHt=$(window).height();
	
	//sound
	var soundList={},soundMax=0,soundLoaded=0;
	var bgmTime,bgmPlay,bgmBtn;
	
	//chat
	var chatStep=0;
	var chatSpeed=1;
	
	//interface
	var interfaceBox=$('section.interface');
	
	//chatInterface
	var chatInterface=interfaceBox.children('.chatInterface');
	var chatContainer=chatInterface.find('.cont');
	
	//inputInterface
	var inputInterface=interfaceBox.children('.inputInterface');
	
	var inputPanel=inputInterface.children('.panel');
	var inputPanelSpan=inputPanel.children('span');
	
	var inputWay=inputInterface.children('.way');
	var inputWayBtn=inputWay.children('a');
	var inputWayHand=inputWay.children('i.hand');
	
	var inputIme=inputInterface.children('.ime');
	var inputImeCon=inputIme.children();
	
	
	var inputKeyboard=inputInterface.children('.keyboard');
	var inputKeyboardHand=inputKeyboard.children('i.hand');
	var btnSend=inputKeyboard.children('a.btnSend');
	
	
	
	//----------------------------------------页面初始化----------------------------------------
	iOrient.init();//屏幕翻转锁定，默认锁定竖屏，横屏提示
	icom.screenTo169(false,false);//article标签高度适配，把iphone4拉伸至iphone5
	loadBox.show();
	iuser.init(userGetted);
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		//loadBox.show();
		var loader = new PxLoader();
		loader.addImage('images/common/turn.gif');
		loader.addImage('images/common/share.png');
		loader.addImage('images/chat/voice.gif');
		loader.addImage('images/input/keyboard.png');
		
		loader.addProgressListener(function(e) {
			//var per=Math.round(e.completedCount/e.totalCount*100);
		}); 	

		loader.addCompletionListener(function() {
			console.log('页面图片加载完毕');
			sound_handler();
			loader=null;
		});
		loader.start();	
	}//end func	
	
	//----------------------------------------加载声音及处理----------------------------------------
	function sound_handler(){
		if(os.weixin) wx.ready(sound_creat);
		else sound_creat();
	}//end func
	
	function sound_creat(){	
		soundList.send=iaudio.on('sound/send.mp3',{onLoaded:sound_loaded});
		soundMax=Object.keys(soundList).length;
		console.log('sound length:'+soundMax);
	}//end func
	
	function sound_loaded(){
		soundLoaded++;
		console.log('soundLoaded:'+soundLoaded);
		if(soundLoaded==soundMax){
			console.log('all sounds loaded');
			bgm_init();
			init_handler();
		}//end if
	}//end func
	
	function bgm_init(){
		if(soundList.bgm){
			bgmPlay=icom.getQueryString('bgmPlay');
			bgmPlay=bgmPlay!=null?parseInt(bgmPlay):1;
			bgmTime=Number(icom.getQueryString('bgmTime'));
			bgmTime=bgmTime||0;
			bgmBtn=$('a.bgmBtn');
			if(bgmBtn.length>0) bgmBtn.show();
			if(bgmPlay==1) bgm_play();
			else bgm_stop();
		}//end if
	}//end func
	
	function bgm_play(){
		bgmPlay=1;
		soundList.bgm.currentTime=bgmTime;
		soundList.bgm.play();
		if(bgmBtn.length>0) bgmBtn.removeClass('bgmStop').addClass('bgmPlay').one('touchend',bgm_stop);
	}//end func
	
	function bgm_stop(){
		bgmPlay=0;
		bgmTime=soundList.bgm.currentTime;
		soundList.bgm.pause();
		if(bgmBtn.length>0) bgmBtn.removeClass('bgmPlay').addClass('bgmStop').one('touchend',bgm_play);
	}//end func
	
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		icom.fadeOut(loadBox,500);
		monitor_handler();
		chat_init();
	}//end func
	
	//----------------------------chat
	function chat_init(){
		time_handler();
		chatInterface.css({'height':windowHt-inputPanel.outerHeight()});
		inputInterface.css({visibility:'visible'});
		chatInterface.scrbar({panelFade:true,speed:0.5});
		chat_handler();
	}//end func
	
	function chat_next(delay){
		delay=delay||1500*chatSpeed;
		chatStep++;
		if(chatStep<chatData.length){
			setTimeout(chat_handler,delay);
		}//end if
		else{
			console.log('chat complete!');
		}//end else
	}//edn func
	
	function chat_handler(){
		var data=chatData[chatStep];
		icom.objectPrint(data);
		var style=data.style!=null?data.style:'me';
		var auto=data.auto!=null?data.auto:1;
		var type=data.type!=null?data.type:'text';
		if(style=='other'){
			if(type=='gif' || type=='pic'){
				icom.imageLoad(data.image,function(){
					chat_add(data);
					if(auto) chat_next();
				});
			}//end if
			else if(type=='voice'){
				chat_add(data);
			}//end else
			else{
				chat_add(data);
				if(auto) chat_next(data.delay);
			}//end else
		}//end if
		else{
			inputPanelSpan.html(data.text+'<i>|</i>');
			inputIme.show();
			inputImeCon.show();
			keyboard_slideIn();
			btnSend.one('touchend',{data:data},btnSend_click);
		}//end if 
	}//end func
	
	function btnSend_click(e){
		var data=e.data.data;
		chat_add(data);
		setTimeout(function(){
			keyboard_slideOut();
			chat_next();
		},1000*chatSpeed);
	}//end func
	
	function chat_add(data){
		var style=data.style!=null?data.style:'me';
		var type=data.type!=null?data.type:'text';
		var head=data.head!=null?data.head:'images/chat/other.jpg';
		head=style!='me'?head:iuser.info.headimage;
		var chat=$('<div class="chat clearFix"><img class="head" ><div class="dialog"><i class="ar"></i></div></div>').addClass(style+' '+type);
		var head=chat.children('img.head').attr({src:head});
		var dialog=chat.children('div.dialog');
		if(type=='text'){
			$('<span></span>').html(data.text).prependTo(dialog);
		}//end if
		else if(type=='gif' || type=='pic'){
			$('<img class="pic">').attr({src:data.image}).prependTo(dialog);
		}//end else
		else if(type=='voice'){
			var voice=$('<img class="voice">').attr({src:'images/chat/voice.png'}).prependTo(dialog);
			var point=$('<i class="point"></i>').appendTo(dialog);
			var dur=$('<i class="dur"></i>').html(data.dur+"''").appendTo(dialog);
			var hand=$('<i class="hand"><b></b></i>').appendTo(dialog);
			dialog.one('touchend',{src:data.voice},voice_play);
		}//end else
		else if(type=='html') dialog.html(data.html);
		chat.appendTo(chatContainer).css({opacity:0}).transition({opacity:1},500);
		chatInterface.scrbarBottom();
		soundList.send.play();
	}//end func
	
	function voice_play(e){
		var _this=$(this);
		var src=e.data.src;
		var point=$(this).children('i.point').hide();
		var hand=$(this).children('i.hand').hide();
		var img=$(this).children('img.voice');
		img.attr({src:'images/chat/voice.gif'});
		var voice=iaudio.on(src,{loop:false,autoplay:true,onEnded:function(event){
			img.attr({src:'images/chat/voice.png'});
			_this.one('touchend',{src:src},voice_play);
			if(!_this.hasClass('active')) chat_next();
			_this.addClass('active');
		}});
	}//end func
	
	function time_handler(){
		var time=new Date();
		var hours=time.getHours();
		var minutes=time.getMinutes();
		var halfday=hours<=12?'AM':'PM';
		var timeBox=chatContainer.find('div.time span');
		timeBox.html(hours+':'+minutes+' '+halfday);
	}//end func
	
	function keyboard_slideIn(){
		chatInterface.transition({'height':windowHt-inputInterface.outerHeight()},500,function(){
			chatInterface.scrbarBottom();
		});
	}//end func
	function keyboard_slideOut(){
		inputPanelSpan.html('')
		chatInterface.transition({'height':windowHt-inputPanel.outerHeight()},500,function(){
			chatInterface.scrbarBottom();
		});
	}//end func
	
	
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:inputWayBtn.eq(0),action:'touchend',category:'首页',label:'bsk_oct_adorable'});
//		imonitor.add({obj:inputWayBtn.eq(1),action:'touchend',category:'首页',label:'bsk_oct_annoying'});
//		imonitor.add({obj:btnSend,action:'touchend',category:'首页',label:'bsk_oct_send'});
	}//end func
	
});//end ready
