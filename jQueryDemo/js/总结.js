1.跨页面传入参数
 li +='<li class="retinabb threeLine" onclick="announceDetail(\''+LinkTo+'\',\''+item.ID+'\',\''+item.ActivityType+'\')"><p><span id='+item.ID+'>';
		if (isread) {
			if(ActivityType=='01'){
				li += '<img src="../../img/account/xitong2.png"/ class="announceImg">';
			}else{
				li += '<img src="../../img/account/huodong2.png"/ class="announceImg">';
			}
		} else {
			if(ActivityType=='01'){
				li += '<img src="../../img/account/xitong1.png"/ class="announceImg">';
			}else{
				li += '<img src="../../img/account/huodong1.png"/ class="announceImg">';
			}			
		}
		li += '</span><span>' + title + '</span></p>'+Description+'<p>' + result + '</p></li>';
		
function announceDetail(linkTo,id,indexActive) {
	console.log(linkTo);

	if (linkTo !=null && linkTo.length != 0) {
		clicked("announce_webcontent.html", false, false, {
			'LinkTo': linkTo,'an_id':id,'indexActive':indexActive
		});
	}
}

//announce_webcontent.html中的js;
var ws = null;
var embed = null;
var userid;
var id ;
var indexActive;
document.addEventListener("plusready", function() {
	plus.nativeUI.showWaiting("加载中...");
	ws = plus.webview.currentWebview();
	var url = ws.LinkTo;
  	id = ws.an_id;
  	indexActive=ws.indexActive;
	
	
	var announce = plus.webview.getWebviewById("announce_webview.html");
	announce.evalJS('announceChangeImg('+id+','+indexActive+')');		
	

2.tab切换
<header class="mui-bar mui-bar-nav new_bar">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color:white"></a>
			<h1 class="mui-title" style="color:white">我的投资</h1><span id="search" style="float: right;font-size: 16px;color: #fff;padding-top: 10px;">筛选<i class="loudou"><img src="../../img/account/myproperty_loudou.png"/></i></span>
			<ul id="tab" class="my_tab" style="margin-top: 50px;">
				<li class="active">全部</li>
				<li>募集中</li>
				<li>赚钱中</li>
				<li class="chu">已结清</li>
			</ul>
			<ul class="my_property_pop" id="taborder" style="display:none;">
				<li>
					<span class="f-left my_left">年化收益筛选<i><img src="../../img/account/myproperty_jiao1.png"/></i></span>
					<span class="f-right my_right" id="retract">收起<i><img src="../../img/account/myproperty_jiao2.png"/></i></span>
				</li>
			</ul>
</header>

<script>
		mui.plusReady(function()
		{
			//plus.webview.currentWebview().setStyle({'popGesture':'none'});
			plus.webview.currentWebview().setStyle({'backbutton':'none'});
		})
</script>
	<script type="text/javascript" charset="UTF-8">
		//mui初始化
		mui.init({
			gestureConfig: {
				doubletap: true
				
			},
			
			//contentWebView.show();
			
		});
		var activeTab;
		var subpages = ['myproperty_sub1.html', 'myproperty_sub2.html', 'myproperty_sub3.html', 'myproperty_sub4.html'];
		var subpage_style = {};
		var aniShow = {};
		var userid;
		mui.plusReady(function() {
			subpage_style = {
				top: '90px',
				bottom: '0',
			};
			//初始化模板
			initData();
			//initRealData();
			activeTab = 'myproperty_sub1.html'; //subpages[0];
			//var title = document.getElementById("title");
			//选项卡点击事件
			$('#tab').on('click', 'li', function() {
				$(".active").removeClass("active");
				$(this).addClass("active");
				var targetTab = GetUrl($(this).index()) //this.getAttribute('href');
				if (targetTab == activeTab) {
					return;
				}
				plus.webview.show(targetTab);
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
				//page($(this).index());
			});
		});
		//初始化模板
		var initData = function() {
			var sub;
			var contentWebView = mui.preload({
					url: '/pages/account/myproperty_sub1.html',
					id: 'myproperty_sub1.html',
					styles: {
						top: '90px',
						bottom: '0px',
						//bounce: 'vertical',
						//bounceBackground:'#000'
					}
				});
			contentWebView.addEventListener('loaded', function() {
				contentWebView.show();
			}, false);
			//Page(0);
			mui.back=function()
			{
				var main = plus.webview.currentWebview();
				if(!empty(main))
				main.close();
				plus.webview.close('myproperty_sub1.html');
				plus.webview.close('myproperty_sub2.html');
				plus.webview.close('myproperty_sub3.html');
				plus.webview.close('myproperty_sub4.html');
				//contentWebView.close();
			}
			CreatePage();
		};
		
		function page(i) {
			var self = plus.webview.currentWebview();
			var sub = plus.webview.getWebviewById(subpages[i]);
			if (empty(sub)) {
				sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
				sub.show();
				self.append(sub);
			}
		}

		function GetUrl(clickindex) {
			var href = "";
			switch (clickindex) {
				case 0:
					href = "myproperty_sub1.html";
					break;
				case 1:
					href = "myproperty_sub2.html";
					break;
				case 2:
					href = "myproperty_sub3.html";
					break;
				case 3:
					href = "myproperty_sub4.html";
					break;
			}
			return href;
		}

		function CreatePage() {
			var sub;
			var self = plus.webview.currentWebview();
			for (var i = 0; i < 4; i++) {
				var temp = {};
				var sub1 = plus.webview.getWebviewById('myproperty_sub1.html');
				var sub2 = plus.webview.getWebviewById('myproperty_sub2.html');
				var sub3 = plus.webview.getWebviewById('myproperty_sub3.html');
				var sub4 = plus.webview.getWebviewById('myproperty_sub4.html');
				if (sub1 == null && i == 0) {
					sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					} else {
						//sub.show()
						//contentWebView.show();
						temp[subpages[i]] = "true";
						mui.extend(aniShow, temp);
					}
				}
				if (sub2 == null && i == 1) {
					sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					} else {
						temp[subpages[i]] = "true";
						mui.extend(aniShow, temp);
					}
				}
				if (sub3 == null && i == 2) {
					sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					} else {
						temp[subpages[i]] = "true";
						mui.extend(aniShow, temp);
					}
				}
				if (sub4 == null && i == 3) {
					sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					} else {
						temp[subpages[i]] = "true";
						mui.extend(aniShow, temp);
					}
				}
				self.append(sub);
			}
		}

		function initRealData() {
			plus.nativeUI.showWaiting();
			var sub1 = plus.webview.getWebviewById('myproperty_sub1.html');
			var sub2 = plus.webview.getWebviewById('myproperty_sub2.html');
			var sub3 = plus.webview.getWebviewById('myproperty_sub3.html');
			var sub4 = plus.webview.getWebviewById('myproperty_sub4.html');
			if (sub1 != null) {
				if (plus.os.ios) {
					sub1.evalJS("plusready();");
				} else {
					sub1.evalJS("getData_sub1();");
				}
			}
			if (sub2 != null) {
				if (plus.os.ios) {
					sub2.evalJS("plusready();");
				} else {
					sub2.evalJS("getData_sub2();");
				}
			}
			if (sub3 != null) {
				if (plus.os.ios) {
					sub3.evalJS("plusready();");
				} else {
					sub3.evalJS("getData_sub3();");
				}
			}
			if (sub4 != null) {
				if (plus.os.ios) {
					sub4.evalJS("plusready();");
				} else {
					sub4.evalJS("getData_sub4();");
				}
			}
			plus.nativeUI.closeWaiting();
		}
		$("#search").click(function() {
			$("#taborder").show();
			if (activeTab == "myproperty_sub1.html") {
				var sub1 = plus.webview.getWebviewById('myproperty_sub1.html');
				sub1.evalJS("showUl();");
			} else if (activeTab == "myproperty_sub2.html") {
				var sub2 = plus.webview.getWebviewById('myproperty_sub2.html');
				sub2.evalJS("showUl();");
			} else if (activeTab == "myproperty_sub3.html") {
				var sub3 = plus.webview.getWebviewById('myproperty_sub3.html');
				sub3.evalJS("showUl();");
			} else if (activeTab == "myproperty_sub4.html") {
				var sub4 = plus.webview.getWebviewById('myproperty_sub4.html');
				sub4.evalJS("showUl();");
			}
		});
		$("#retract").click(function() {
			$("#taborder").hide();
			if (activeTab == "myproperty_sub1.html") {
				var sub1 = plus.webview.getWebviewById('myproperty_sub1.html');
				sub1.evalJS("hideUl();");
			} else if (activeTab == "myproperty_sub2.html") {
				var sub2 = plus.webview.getWebviewById('myproperty_sub2.html');
				sub2.evalJS("hideUl();");
			} else if (activeTab == "myproperty_sub3.html") {
				var sub3 = plus.webview.getWebviewById('myproperty_sub3.html');
				sub3.evalJS("hideUl();");
			} else if (activeTab == "myproperty_sub4.html") {
				var sub4 = plus.webview.getWebviewById('myproperty_sub4.html');
				sub4.evalJS("hideUl();");
			}
		});

		function topTitleHide() {
			$("#taborder").hide();
		}
	</script>