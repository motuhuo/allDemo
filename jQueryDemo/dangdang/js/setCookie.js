function setCookie(name,value,day)
{	
	var date=new Date();
	date.setDate(date.getDate()+day);
	document.cookie=name+'='+value+';expires='+date;
}

function getCookie(name)
{	
	var arr=document.cookie;
	var arr1=arr.split('; ');
	for (var i=0; i<arr1.length; i++)
	{	
		var arr2=arr1[i].split('=');
		
		if(arr2[0]==name)
		{	
			return arr2[1];
		}
	}
	return '';
}
function clearCookie(name)
{	
	setCookie(name,'qwe',-1)
}
