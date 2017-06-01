var myScroll,
    pullDownEl, pullDownOffset,_maxScrollY,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function pullDownAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.getElementById('thelist');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = 'Generated row ' + (++generatedCount);
            el.insertBefore(li, el.childNodes[0]);
        }
        myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}
pullUpAction ()
function pullUpAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
       
        //ajax请求
        
         $.ajax({
		type:'post',
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		dataType:'jsonp',
		success:function(data){
			// console.log(data.length);
			// console.log(data);
			// var reg=/^(callback)|(\c)|(\)$/g;
			var len=data.length;
			var result=data;
			var html='';
			var oIndex=0;
			for (var i=0; i<len; i++){
				(function(i){
					var oImg=new Image();
					oImg.src=result[i].goodsListImg;
					oImg.onload=function(){
						var html="<li><img src='"+result[i].goodsListImg+"' title=''><h3>"+result[i].goodsName+"</h3></li>"
						if(oIndex==0){
							$('#itemList').append(html);
						}else{
							$('#itemRight').append(html);
						};
						oIndex=$('#itemList').height()>$('#itemRight').height()?1:0;
					}			
				})(i)
			}
		}
	})


        myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    // pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;


    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,  //头部的滚动距离
        onRefresh: function () {    //
            _maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;
           if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉刷新';
            }
        },
        onScrollMove: function () {
            if (this.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                this.maxScrollY = this.maxScrollY - pullUpOffset;
            } else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                this.maxScrollY = this.maxScrollY + pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });

    (function () { document.getElementById('wrapper').style.left = '0'; })();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { loaded()});
