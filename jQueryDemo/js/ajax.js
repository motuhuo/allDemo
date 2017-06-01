function ajax(mJson)
{	
	var method=mJson.method||'get';
	var url=mJson.url;
	var asny=mJson.asny||true;
	var date=mJson.date||'';
	var success=mJson.success;
	if(method=='get'&&date)
	{	
		url+='?'+date+'&'+Math.random();
		date='';
	}
	

	var xhr=window.XMLHttpRequest?(new XMLHttpRequest()):(new ActiveXObject('Microsoft.XMLHTTP'));
	xhr.open(method,url,asny);
	xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	xhr.send(date);
	
	xhr.onreadystatechange=function()
	{	
		if(xhr.readyState==4)
		{	
			if(xhr.status>=200&&xhr.status<300)
			{	
				success&&success(xhr.responseText);
			}
			else
			{	
				alert('错误了'+xhr.status);
			}
		}
	}
}