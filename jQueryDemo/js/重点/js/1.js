var getByclassName=function(oParent,className){	
	var all=oParent.getElementsByTagName('*');
	var result=[];
	for (var i=0; i<all.length;i++){	
		//if (all[i].getAttribute('class')==className){	
		if(all[i].className==className){	
			result.push(all[i]);
		}
	}
	return result;
}

window.onload=function ()
{	
	var oDiv=document.getElementById('playimages');
	var oBtnPrev=getByclassName(oDiv,'prev')[0];
	var oBtnNext=getByclassName(oDiv,'next')[0];
	var oMarkLeft=getByclassName(oDiv,'mark_left')[0];
	var oMarkRight=getByclassName(oDiv,'mark_right')[0];
	
	var oDivSmall=getByclassName(oDiv,'small_pic')[0];
	var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
	var aLiSmall=oDivSmall.getElementsByTagName('li');
	var oUlBig=getByclassName(oDiv,'big_pic')[0];
	var aLiBig=oUlBig.getElementsByTagName('li');
	var oText=getByclassName(oDiv,'text')[0];
	var oLength=getByclassName(oDiv,'length')[0];
	var nowZindex=2;	
	var now=0;
	arr=["都市魅力","古香古色","沉浸舞步的舞者","名贵跑车","聆听天籁的精灵","绚彩光芒"]
	oUlSmall.style.width=aLiSmall.length*aLiSmall[0].offsetWidth+'px';
	
	
	//左右按钮
	oBtnPrev.onmouseover=oMarkLeft.onmouseover=function()
	{	
		startMove(oBtnPrev,{opacity:100});
		
	}	
	oBtnPrev.onmouseout=oMarkLeft.onmouseout=function()
	{	
		startMove(oBtnPrev,{opacity:0});
	}	
	oBtnNext.onmouseover=oMarkRight.onmouseover=function()
	{	
		startMove(oBtnNext,{opacity:100});
	}
	oBtnNext.onmouseout=oMarkRight.onmouseout=function()
	{	
		startMove(oBtnNext,{opacity:0});
	}
	
	for (var i=0; i<aLiSmall.length; i++)
	{	
		aLiSmall[i].index=i;
		aLiSmall[i].onclick=function()
		{		
			if(this.index==now) return;
			now=this.index;
			tab();
		}
		 oText.innerHTML=arr[0];
		 oLength.innerHTML='1/6';
		function tab()
		{	
			
			aLiBig[now].style.zIndex=nowZindex++;
			aLiBig[now].style.height=0;
			startMove(aLiBig[now],{height:320});
			oText.innerHTML=arr[now];
			oLength.innerHTML=(now+1)+'/'+6;
			if(now==0)
			{	
				startMove(oUlSmall,{left:0})
			}
			else if(now==aLiSmall.length-1)
			{	
				startMove(oUlSmall,{left:-(now-2)*120})
			}
			else
			{
				startMove(oUlSmall,{left:-(now-1)*120})
			}
		}
		
		aLiSmall[i].onmouseover=function()
		{	
			startMove(this,{opacity:100})
		}
		aLiSmall[i].onmouseout=function()
		{	
			startMove(this,{opacity:60})
		}
	}
	
	oBtnPrev.onclick=function()
	{	
		
		if(now==0)
		{	
			now=aLiBig.length;
		}
		now--;
		tab();
	}
	oBtnNext.onclick=function()
	{	
		now++;
		if(now==aLiBig.length)
		{	
			now=0;
		}
		tab();
	}
	
	var timer=null;
	timer=setInterval(oBtnNext.onclick,2000);
	oDiv.onmouseover=function()
	{	
		clearInterval(timer)
	}
	oDiv.onmouseout=function()
	{	
		timer=setInterval(oBtnNext.onclick,2000);
	}
	
	
	
	
	
	
	
	
}