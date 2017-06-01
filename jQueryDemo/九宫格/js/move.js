function move( obj , mJson , fn ){
	var target = parseInt( target ); //要给重点取整，防止出现小数不能清除定时器
	clearInterval( obj.timer ); //为了防止定时器累加先清除前一个定时器
	obj.timer = setInterval(function(){
		var onoff = true; //开关
		for( var attr in mJson ){
			target = mJson[attr]; //把属性值付给target
			if( attr == 'opacity' ){ //判断是不是opacity
				 var iCur = getStyle( obj , attr ) * 100;
			}else{
				var iCur = parseInt( getStyle( obj , attr ) );
			};
			var speed = ( target - iCur ) / 10; //求速度
			if( iCur > target ){
				speed = Math.floor( speed ); //如果他是反方向向下取整
			}else{
				speed = Math.ceil( speed );//如果他是正方向向上取整
			};
			if( iCur != target ){ //判断是不是所有的属性都到达终点 
				onoff = false; //没有到达把开关变成false
			};
			if( attr == 'opacity' ){ //判断是不是opacity
				obj.style[attr] = (iCur + speed)/100;
				obj.style.filter = 'alpha( opacity = '+(iCur + speed)+' )';
			}else{
				obj.style[attr] = iCur + speed + 'px';
			};
		};
		if( onoff ){  //如果开关是 true停止定时器
			clearInterval( obj.timer );
			if( fn ){
				fn();
			}
		}
	},30);
	
};

function getStyle( obj , attr ){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle( obj , false )[attr];
}