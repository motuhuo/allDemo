//2015.07.07
var _hmt = _hmt || [];
var imonitor=importMonitor();

function importMonitor(){
	var monitor={};
	
	monitor.add=function(option){
		if(option){
			var obj=option.obj;
			var category=option.category||'页面监测';
			var action=option.action||'click';
			var label=option.label||'';
			if(obj && obj.length>0){
				obj.each(function(i) {
					$(this).on(action,{category:category,action:action,label:obj.length==1?label:label+(i+1)},monitorEvent);}
				);
			}//end if
			else if(label && label!='') monitorHandler({category:category,action:'JS程序触发',label:label});
		}//end if
	}//end func
	
	function monitorEvent(e){
		var data=e.data;
		monitorHandler(data);
	}//end func
	
	function monitorHandler(data){
		_hmt.push(['_trackEvent', data.category, data.action, data.category+'——'+data.label]);
		console.log('项目类别：'+data.category+' | '+'交互行为：'+data.action+' | '+'项目说明：'+data.category+'——'+data.label);
	}//end func
	
	return monitor;
}//end import