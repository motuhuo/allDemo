//2015.8.13
var icom=importCom();

//------------------------------------------------------------------------------公共方法------------------------------------------------------------------------------
function importCom(){
	var com={};
	
	com.screenTo169=function(iphone4,android){
		iphone4=iphone4!=null?iphone4:true;
		android=android!=null?android:true;
		var article=$('article');
		if(article.length>0){
			if(os.ios){
				if(os.iphone4){
					if(iphone4){
						com.screenScrollEnable();
						if(os.weixin) article.css({height:'121.2%'});
						else article.css({height:'123.6%'});
					}//end if
					else{
						com.screenScrollUnable();
						article.css({height:'100%'});
					}//end else
				}//end if
				else com.screenScrollUnable();
			}//end if
			else{
				com.screenScrollUnable();
				if(!os.screen169) article.css({height:'109%','-webkit-transform-origin':'0 0 0',scaleY:0.9174});
			}//end else if
		}//end if
	}//end func
	
	com.screenScrollEnable=function(){
		$(document).off('touchmove',noScroll);
	}//end func
	
	com.screenScrollUnable=function(){
		$(document).on('touchmove',noScroll);
	}//end func
	
	function noScroll(e){
		e.preventDefault();
	}//end func
	
	//取代jquery的fadeIn
	com.fadeIn=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.show().css({opacity:0}).transition({opacity:1},dur,function(){
				if(callback) callback();
			});
		}//end if
	}//end func
	
	//取代jquery的fadeOut
	com.fadeOut=function(obj,dur,callback){
		if(obj){
			dur=dur||500;
			obj.transition({opacity:0},dur,function(){
				$(this).hide();
				if(callback) callback();
			});
		}//end if
	}//end func
	
	//简易版popOn
	com.popOn=function(option){
		if(option && option.obj){
			var _obj=option.obj;
			var _fade=option.fade;
			var _text=option.text;
			var onOpen=option.onOpen;
			var onClose=option.onClose;
			var _remove=option.remove;
			var _closeEvent=option.closeEvent||'touchend';
			var _closeType=option.closeType||'button';
			var _closeBtn=_obj.find('a.close');
			if(_text) _obj.find('.text').html(_text);
			if(_fade) com.fadeIn(_obj,_fade);
			else _obj.show();
			if(onOpen) onOpen();
			if(_closeBtn.length>0 && _closeType=='button') _closeBtn.one(_closeEvent,obj_close);
			else _obj.one(_closeEvent,obj_close);
		}//end if
		function obj_close(e){
			if(_closeBtn.length>0 && _closeType=='button') _closeBtn.off(_closeEvent,obj_close);
			else _obj.off(_closeEvent,obj_close);
			if(_fade) com.fadeOut(_obj,_fade,function(){
				if(_remove) _obj.remove();
			});
			else if(_remove) _obj.remove();
			else _obj.hide();
			if(onClose) onClose();
		}//end func
	}//end func
	
	//取代系统alert
	com.alert=function(text,callback){
		if(text && text!=''){
			var box=$('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a class="close">确认</a></p></div></aside>').appendTo($('body'));
			com.popOn({obj:box,text:text,onClose:callback,remove:true,closeEvent:'click'});
		}//end if
	}//end func
	
	//获得http url参数
	com.getQueryString=function(name) {
		if(name && name!=''){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}//end if
		else return null;
	}//end func
	
	//获得http url文件名末尾的数字
	com.getQueryInt=function(len){
		len=len!=null?len:1;
		var path=window.location.pathname.split('/');
		var file=path[path.length-1];
		var str=file.split('.');
		return parseInt(str[0].substr(str[0].length-len));
	}//end func
	
	//带Loading的载入图片函数
	com.imageLoad=function(src,callback){
		if(src && src!=''){
			var loader = new PxLoader();
			if($.type(src) === "string" && src!='') loader.addImage(src);
			else if($.type(src) === "array" && src.length>0){
				for(var i=0; i<src.length; i++){
					loader.addImage(src[i]);
				}//end for
			}//end else
			loader.addCompletionListener(function() {
				console.log('images load complete');
				loader=null;
				if(callback) callback(src);
			});			
			loader.start();	
		}//end if
	}//end func	
	
	//新增测试版提示信息
	com.addSignBar=function(text){
		if(text && text!=''){
			var sign=$('#signBar');
			if(sign.length>0) sign.find('.text').html(text);
			else{
				sign=$('<div id="signBar"></div>').appendTo('body');
				$('<span></span>').html(text).appendTo(sign);
			}//end if
		}//end if
	}//end func
	
	//打印object数据
	com.hover=function(btn,delay){
		delay=delay||0;
		delay=Math.abs(delay);
		if(btn && btn.length>0){
			btn.one('touchstart',btn_touchstart);
		}//end if
		function btn_touchstart(e){
			$(this).addClass('active');
			if(delay==0) $(this).one('touchend',btn_touchend);
			else setTimeout(function(){
				$(this).removeClass('active');
				$(this).one('touchstart',btn_touchstart);
			},delay);
		}//end func
		function btn_touchend(e){
			$(this).removeClass('active');
			$(this).one('touchstart',btn_touchstart);
		}//end func
	}//end func
	
	//打印object数据
	com.objectPrint=function(data){
		if(data){
			console.log("-----------------------------------------------------------------------------");
			var info="";
			for(var i in data) info+=i+":"+data[i]+"  "
			console.log(info);
			console.log("-----------------------------------------------------------------------------");
		}//end if
	}//end func
	
	//常用正则
	com.checkStr=function(str,type){
		if(str && str!=''){
			type=type||0;
			switch(type){
				case 0:
					var reg= new RegExp(/^1[3-9]\d{9}$/);//手机号码验证
					break;
				case 1:
					var reg= new RegExp(/\w+@\w+/);//匹配EMAIL
					break;
				case 2:
					var reg= new RegExp(/^\d+$/);//是否为0-9的数字
					break;
				case 3:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/);//不能以数字或符号开头
					break;
				case 4:
					var reg= new RegExp(/^\w+$/);//匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 5:
					var reg= new RegExp(/^[\u0391-\uFFE5]+$/);//匹配中文
					break;
				case 6:
					var reg= new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/);//不能包含数字和符号
					break;
			}//end switch
			if(reg.exec($.trim(str))) return true;
			else return false;
		}//end if
		else return false;
	}//end func
	
	return com;
}//end import