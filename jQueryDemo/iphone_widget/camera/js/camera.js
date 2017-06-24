//2016.2.16

$(document).ready(function(e) {
	
	var loadBox=$('aside.loadBox');
	
	//camera
	var cameraBox=$('div.camera');
	var imgShell=$('div.shell');
	var imgPanel=$('div.panel');
	var imgAdd=imgPanel.children('a.btnAdd');
	var imgSub=imgPanel.children('a.btnSub');
	var imgRotate=imgPanel.children('a.btnRotate');
	var btnSubmit=$('a.btnSubmit');
	var btnShot=$('a.btnShot');
	var imgCanvas,imgLayer;
	var imgScale=1,imgSaleMin=0.1,imgScaleMax=2.5,imgScaleTimer;
    var fileBox,fileInput;
	
	
	icom.screenTo169(true);//article标签高度适配，把iphone4拉伸至iphone5，默认值true
	
	init();
	
	function init(){
		fileBox=$('<div id="fileBox"><input type="file" capture="camera" accept="image/*" name="fileInput"/></div>').appendTo($('body'));
		fileInput=fileBox.children();
		fileInput.on('change',file_select);
		btnShot.on('touchend',btnShot_click);
		btnSubmit.on('touchend',btnSubmit_click);
	}//end func
	
	//---------------------------------------------------拍照事件
	
	//图片确定按钮，图片编辑步骤控制
	function btnSubmit_click(e){
		canvas_send(imgCanvas,btnSubmit_complete,'45yhp3bMq5ujaM5vwBVtAtDajatCfk58');
	}//end func
	
	function canvas_send(canvas,callback,secretkey){
		loadBox.show();
		var data=canvas.getCanvasImage('jpeg', 0.8).split(",")[1];//图片BASE64数据
		base64_send(data,callback,secretkey);
	}//end func
	
	function base64_send(data,callback,secretkey){
		loadBox.show();
		icom.post('http://orange.be-xx.com/api/upload/upload_base64',{secret_key:secretkey,data:data},callback,function(error){
			loadBox.hide();
			icom.alert(error);
		});
	}//end func
	
	function btnSubmit_complete(resp){
		loadBox.hide();
		console.log('image src:'+resp.result);
	}//end func
	
	//拍照按钮
	function btnShot_click(e){
		fileInput.click();
	}//end func
	
	//拍照或打开本地图片
	function file_select(e) {
        var file = this.files[0];
        if (file) {
			loadBox.show();
		  	var reader = new FileReader();  
		  	reader.onloadend = function() {
				loadBox.hide();
				//console.log('result.length: '+this.result.length);
				if(this.result.length>0) img_creat(this.result);
				else icom.alert('无法正确读取图片');
		  	}//end onload	
			reader.readAsDataURL(file);	
        }//end if
      }//end select
	
	//复制图片至canvas
	function img_creat(src){	
		loadBox.hide();
		imgPanel.show();
		btnSubmit.show();
		imgShell.empty();
		imgCanvas=$('<canvas></canvas>').attr({width:imgShell.width(),height:imgShell.height()}).prependTo(imgShell);
		imgCanvas.clearCanvas().drawImage({
		  layer: true,
		  source: src,
		  x: imgCanvas.width()/2, y: imgCanvas.height()/2,
		  scale:imgScale,
		  fromCenter: true
		}).drawLayers();
		imgLayer=imgCanvas.getLayer(0);
		img_addEvent(imgLayer);
		if(os.android) setTimeout(android_fix,100);//修复安卓载入图片后不渲染问题
	}//end func
	
	function android_fix(offset,n){
		n=n||0;
		n++;
		if(n<=10){
			offset=offset||0.01;
			offset=offset==0.01?-0.01:0.01;
			imgLayer.x+=offset;
			imgCanvas.drawLayers();
			setTimeout(android_fix,100,offset,n);
		}//end if
	}//edn func
	
	//添加图片编辑事件
	function img_addEvent(obj){
		imgAdd.off().on('touchstart',{obj:obj,offset:1},imgScale_touchstart).on('touchend',imgScale_touchend);
		imgSub.off().on('touchstart',{obj:obj,offset:-1},imgScale_touchstart).on('touchend',imgScale_touchend);
		imgRotate.off().on('click',{obj:obj},img_rotate);
		imgShell.off().on('pinch',{obj:obj},img_pinch).on('pinchmove',{obj:obj},img_pinchmove).on('pinchscale',{obj:obj},img_pinchscale).on('pinchrotate',{obj:obj},img_pinchrotate);
	}//end func
	
	//单指双指触控
	function img_pinchmove(e,xOffset,yOffset){
		var obj=e.data.obj;
   		obj.x+=xOffset;
		obj.y+=yOffset;
   	}//end func
   	
   	function img_pinchscale(e,scaleOffset){
   		var obj=e.data.obj;
   		obj.scale+=scaleOffset*0.5;
   	}//end func
   	
   	function img_pinchrotate(e,rotateOffset){
   		var obj=e.data.obj;
   		obj.rotate+=rotateOffset;
   	}//end func
	
	function img_pinch(e){
		imgCanvas.drawLayers();
	}//end func
	
	//图片缩放
	function imgScale_touchstart(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
		imgScaleTimer=setInterval(imgScale_handler,33,e.data.obj,e.data.offset);
	}//end func
	
	function imgScale_touchend(e){
		e.preventDefault();
		clearInterval(imgScaleTimer);
	}//end func
	
	function imgScale_handler(obj,offset,speed){
		speed=speed!=null?speed:0.05;
		imgScale+=speed*offset;
		imgScale=imgScale<=imgSaleMin?imgSaleMin:imgScale;
		imgScale=imgScale>=imgScaleMax?imgScaleMax:imgScale;
		obj.scale=imgScale;
		imgCanvas.drawLayers();
	}//end func
	
	//图片旋转
	function img_rotate(e){
		var obj=e.data.obj;
		if(obj.rotate%90!=0) obj.rotate=Math.floor(obj.rotate/90)*90;
		else obj.rotate+=90;
		imgCanvas.drawLayers();
	}//end func

});