/*一个运动结束，另一个运动开始*/
function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}

function startMove(obj, attr, iTarget,fn)   
  //fn 达到第一个运动目的后，开始的运动函数;
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iCur=0;   //当前的样式；
		
		if(attr=='opacity')   //透明度
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(iCur==iTarget)
		{
			clearInterval(obj.timer);
			if (fn)
			{
				fn();
			}
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}, 30)
}