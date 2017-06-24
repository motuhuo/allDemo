$(document).ready(function(e) {
	
	var loadBox=$('#loadBox');
	
	//window
	var windowWd=$(window).width(),windowHt=$(window).height();
	
	//box
	var panoBox=$('#panoBox');
	var hotsBox=panoBox.children('.hots');
	var w360Box=panoBox.children('.w360');
	
	
	//hots
	var hots=[{pan:0,tilt:-15,name:'中控仪表台'},{pan:0,tilt:11.5,name:'后视镜'},{pan:206,tilt:-167,name:'驾驶方向盘'},{pan:-203,tilt:200,name:'副驾驶储物柜'},{pan:-295,tilt:200,name:'后门'},{pan:2.5,tilt:145,name:'后顶灯'},{pan:2.5,tilt:190,name:'后排座椅'}];
	var hots_eles=[];
	
	
	
	//skybox
	var camera, scene, renderer;
	var geometry, material, mesh;
	var target = new THREE.Vector3();
	var lon = 90, lat = 0;
	var lonTar = 90, latTar = 0;
	var phi = 0, theta = 0;
	
	//touch
	var touchX, touchY;
	
	// campass
	var angLast,angMax=90;
	
	var compassPanel=$('<div id="compassPanel"><h3>电子罗盘</h3><p>alpha：<span class="alpha"></span></p><p>beta：<span class="beta"></span></p><p>gamma：<span class="gamma"></span></p><p>degX：<span class="degX"></span></p><p>degY：<span class="degY"></span></p></div>').appendTo($('body'));
	var compassAlpha=compassPanel.find('.alpha');
	var compassBeta=compassPanel.find('.beta');
	var compassGamma=compassPanel.find('.gamma');
	var compassHeading=compassPanel.find('.heading');
	var degXHtml=compassPanel.find('.degX');
	var degYHtml=compassPanel.find('.degY');
	
	loadFunc();
	
	function loadFunc(){
		//载入图
		loadBox.show();
		var loadtxt=loadBox.children('b')
		var loader = new PxLoader();
		loader.addImage('images/pano/0.jpg');
		loader.addImage('images/pano/1.jpg');
		loader.addImage('images/pano/2.jpg');
		loader.addImage('images/pano/3.jpg');
		loader.addImage('images/pano/4.jpg');
		loader.addImage('images/pano/5.jpg');
		loader.addProgressListener(function(e) { 
			//loadtxt.html(Math.round(e.completedCount/e.totalCount*100)); 
		}); 	
		loader.addCompletionListener(function() {
			if(window.console) console.log('load complete');
			loader=null;
			loadBox.hide();
			init();
		});			
		loader.start();	
	}//end func	
	
	function init(){
		//alert('test8');
		addPano();
		addHots();
	}//end func
	
	//------------------------------pano
	function addPano() {
		camera = new THREE.PerspectiveCamera(40, windowWd / windowHt, 1, 1000);
        scene = new THREE.Scene();
		var sides = [
            {
                url: 'images/pano/2.jpg',
                position: [-512, 0, 0],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                url: 'images/pano/0.jpg',
                position: [512, 0, 0],
                rotation: [0, -Math.PI / 2, 0]
            },
            {
                url: 'images/pano/4.jpg',
                position: [0, 512, 0],
                rotation: [Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'images/pano/5.jpg',
                position: [0, -512, 0],
                rotation: [-Math.PI / 2, 0, Math.PI]
            },
            {
                url: 'images/pano/1.jpg',
                position: [0, 0, 512],
                rotation: [0, Math.PI, 0]
            },
            {
                url: 'images/pano/3.jpg',
                position: [0, 0, -512],
                rotation: [0, 0, 0]
            }
        ];
		for (var i = 0; i < sides.length; i++) {
            var side = sides[i];
            var element = document.createElement( 'img' );
			element.src = side.url;
            if (i < 6) element.width = 1028; // 2 pixels extra to close the gap. 
            var object = new THREE.CSS3DObject(element);
            side.position && object.position.fromArray(side.position);
            side.rotation && object.rotation.fromArray(side.rotation);
            if (i >= 6) object.scale.set(0.25, 0.25, 1);
            scene.add(object);
        }//end for
		renderer = new THREE.CSS3DRenderer();
		renderer.setSize( windowWd, windowHt );
		$(renderer.domElement).appendTo(w360Box);		
		window_resize();
		$(window).on('resize',window_resize);
		panoBox.on( 'touchstart', pano_touchstart );
		if(os.ios) $(window).on('deviceorientation',deviceorientationHandler);
		pano_animate();
	}//end init
	
	function window_resize(e) {
		windowWd=$(window).width(),windowHt=$(window).height();
		camera.aspect = windowWd / windowHt;
		camera.updateMatrix();
		camera.updateMatrixWorld();
		camera.updateProjectionMatrix();
		renderer.setSize(windowWd, windowHt);
	}//end func

	function pano_touchstart(e) {
		e.preventDefault();
		$(this).on( 'touchmove', pano_touchmove ).one( 'touchend', pano_touchend );
		angLast=undefined;
		var touch = e.originalEvent.touches[ 0 ];
		touchX = touch.screenX;
		touchY = touch.screenY;
	}//end func

	function pano_touchmove(e) {
		e.preventDefault();
		angLast=undefined;
		var touch = e.originalEvent.touches[ 0 ];
		lon -= ( touch.screenX - touchX ) * 0.2;
		lat += ( touch.screenY - touchY ) * 0.2;
		touchX = touch.screenX;
		touchY = touch.screenY;
	}//end func
	
	function pano_touchend(e) {
		e.preventDefault();
		$(this).off( 'touchmove', pano_touchmove );
	}//end func
	
	function deviceorientationHandler(e){
//		compassAlpha.html(Number(e.originalEvent.alpha).toFixed(2));//屏幕面对你竖直向上拿手机,绕y轴360度自旋，范围0-360
//		compassBeta.html(Number(e.originalEvent.beta).toFixed(2));//屏幕面对你竖直向上拿手机,绕x轴自旋，范围-90-90,竖直向上为90度，水平为0度，竖直向下为-90度
//		compassGamma.html(Number(e.originalEvent.gamma).toFixed(2));//屏幕朝上水平向前拿手机,绕水平轴自旋，范围-90-90,自旋到屏幕朝下后数值会扩展到90至180或-90至-180
//		compassHeading.html(Number(e.originalEvent.webkitCompassHeading).toFixed(2));//指南针
		//横向移动根据指北针角度
		var ang=[e.originalEvent.alpha,e.originalEvent.beta<0?0:e.originalEvent.beta];
		//var disMin=os.android && os.weixin?2:0.5;
		if(angLast && ( Math.abs(angLast[0]-ang[0])>0.1 || Math.abs(angLast[1]-ang[1])>0.1 ) ){
			if( ang[0]>=0 && angLast[0]<=360 ) lon-=(ang[0]-angLast[0])*2;
			else if( ang[0]<=180 && angLast[0]>180 ) lon-=(ang[0]+(360-angLast[0]))*2;
			else if( ang[0]>=180 && angLast[0]<180 ) lon-=((360-ang[0])+angLast[0])*2;
			lat+=(ang[1]-angLast[1])*2;
		}//end if
		angLast=[e.originalEvent.alpha,e.originalEvent.beta<0?0:e.originalEvent.beta];
	}//end func

	function pano_animate() {
		//lon=ease(lon,lonTar,10,0.001);
		//lat=ease(lat,latTar,10,0.001);
		degXHtml.html(lon);
		degYHtml.html(lat);
		lat = Math.max( - 85, Math.min( 85, lat ) );
		phi = THREE.Math.degToRad( 90 - lat );
		theta = THREE.Math.degToRad( lon );
		target.x = Math.sin( phi ) * Math.cos( theta );
		target.y = Math.cos( phi );
		target.z = Math.sin( phi ) * Math.sin( theta );
		//degToPosition(target, lat, lon);
		camera.lookAt( target );
		renderer.render( scene, camera );
		//scene.updateMatrix();
		//scene.updateMatrixWorld();
		//camera.updateMatrix();
		//camera.updateMatrixWorld();
		//camera.updateProjectionMatrix();
		requestAnimationFrame( pano_animate );
	}//end animate
	
	function degToPosition(tar1, lat1, lon1) {
		var phi1 = THREE.Math.degToRad(90 - lat1);
		var theta1 = THREE.Math.degToRad(lon1);
		tar1.x = Math.sin(phi1) * Math.cos(theta1);
		tar1.y = Math.cos(phi1);
		tar1.z = Math.sin(phi1) * Math.sin(theta1);
	};//end degToPosition
	
	//--------------------------------------------hots
	function addHots(){
		var r1=512;
		for(var i=0; i<hots.length; i++){
			var o=hots[i];
			var hot=$('<span class="hot"><i></i></span>').appendTo(hotsBox).on('touchstart',hot_touchstart);
            var pan = o.pan / 180 * Math.PI;
            var tilt = o.tilt / 180 * Math.PI;
            var y1 = Math.sin(tilt) * r1;
            var r2 = Math.cos(tilt) * r1;
            var x1 = Math.sin(pan) * r2;
            var z1 = Math.cos(pan) * r2;
            var pos = new THREE.Vector3(x1, y1, z1);
            hots_eles.push({
				hot:hot,
                position: pos,
                rotation: [-tilt, pan, 0],
                cssPos: {}
            });
		}//end for
		hot_animate();
	}//end func
	
	function hot_touchstart(e){
		$(this).on('touchmove',hot_touchmove).one('touchend',hot_touchend);
	}//end func
	
	function hot_touchmove(e){
		$(this).off('touchmove',hot_touchmove).off('touchend',hot_touchend);
	}//end func
	
	function hot_touchend(e){
		e.stopPropagation();
		$(this).off('touchmove',hot_touchmove);
		var id=$(this).index('.hot');
		alertFunc(hots[id].name);
	}//end func
	
	function hot_animate(){
		hots_eles.forEach(function (o) {
			var hot=o.hot;
			var pos1 = toScreenXY(o.position);
			if (o.cssPos.x == pos1.x && o.cssPos.y == pos1.y && o.cssPos.z == pos1.z) return;
			if (o.cssPos.z != pos1.z) {
				if (pos1.z < 0) hot.hide();
				else hot.show();
			}
			hot.css({x:pos1.x,y:pos1.y});
			o.cssPos = pos1;
		});
		requestAnimationFrame( hot_animate );
	}//end func
	
	function toScreenXY(position) {
		var pos = position.clone();
		pos.project(camera);
		var obj = {
			x: (pos.x + 1) * windowWd/2,
			y: (-pos.y + 1) * windowHt/2,
			z: pos.z < 1 ? 1 : -1
		};
		var sc1 = 1;
		if (renderer) sc1 = renderer.scale();
		sc1 = (windowWd / windowHt) * 0.7;
		obj.x = obj.x * sc1 + windowWd/2 * (1 - sc1);
		obj.y = obj.y * sc1 + windowHt/2 * (1 - sc1);
		return obj;
	};//end toScreenXY
	
});