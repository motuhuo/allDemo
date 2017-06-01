function ajax( mJson ){
				//发送方式默认为GET
	var method = mJson.method || 'get';
	//地址
	var url = mJson.url;
	//是否异步，默认异步
	var asny = mJson.asny || true;
	//上传数据
	var data = mJson.data || '';
	//成功时执行的回调函数
	var success = mJson.success;
	//判断是否是GET方法如果是在地址上拼接数据要加上随机数让地址保持不同，解决IE的缓存问题
	if( method == 'get' && data ){
		url += '?' + data +'&'+ Math.random();
		data = '';
	};
	
	var xhr = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject('Microsoft.XMLHTTP'));
	xhr.open( method , url , true );
	//ajax编码格式
	xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	xhr.send( data );
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 ){
			if( xhr.status >= 200 && xhr.status < 300 ){
				success&&success( xhr.responseText );
			}else{
				alert( '哥们，出错了'+ xhr.status );
			};
		};
		
	};
};