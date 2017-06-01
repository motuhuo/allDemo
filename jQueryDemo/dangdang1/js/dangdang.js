//$(document).ready(function(){
//	
//})
$(function(){
	var $headerA=$('#headerA');
	var $place=$('#place');
	var $headerImg=$headerA.find('img');
	var $headerSpan=$headerA.find('span');
	var $placeA=$place.find('a');
	//alert($placeA.size())
	$headerA.hover(function(){
		MouseOver()
	},function(){
		MouseOut()
		$place.hover(function(){
			MouseOver()
			$placeA.click(function(){
				var $this=$(this)
				$headerSpan.html($this.html())
			})
			
		},function(){
			MouseOut()
		})
	})
	
	function MouseOver(){
		$headerA.addClass('hover');
		$place.css({"display":'block'});
		$headerImg.attr({'src':'img/headerbg1.png'})
	}
	function MouseOut(){
		$place.css({'display':'none'});
		$headerA.removeClass('hover');
		$headerImg.attr({'src':'img/headerbg.png'})
	}
	
	//headerRight
	var $heaRA=$('#headerList li:gt(2) a');
	
	$heaRA.hover(function(){
		var $heaDiv=$(this).parent().has('div').find('div').not('.headerPhone');
		var $heaPho=$(this).parent().has('div').find('.headerPhone')

		$(this).addClass('hover1')
		HeaMouseover($heaPho,'img/phone1.png');
		HeaMouseover($heaDiv,'img/headerbg1.png');


	},function(){
	
		var $heaDiv=$(this).parent().has('div').find('div').not('.headerPhone')
		var $heaPho=$(this).parent().has('div').find('.headerPhone');
//		$heaDiv.css({'display':'none'});
//		$heaPho.css({'display':'none'})
//		
//		$heaDiv.parent('li').find('a').find('img').attr('src','img/headerbg.png')
//		$heaPho.parent('li').find('a').find('img').attr('src','img/headerphone.png')
		$(this).removeClass('hover1')
		HeaMouseout($heaDiv,'img/headerbg.png');
		HeaMouseout($heaPho,'img/headerphone.png');
		$heaPho.hover(function(){
			$(this).css({'display':'block'})
			$(this).parent('li').find('a').addClass('hover1');
			$heaPho.parent('li').find('a').find('img').attr('src','img/phone1.png')
		},function(){
			$(this).css({'display':'none'})
			$(this).parent('li').find('a').removeClass('hover1')
			$heaPho.parent('li').find('a').find('img').attr('src','img/headerphone.png')
		})
		
		$heaDiv.hover(function(){
			var $This=$(this);
			$(this).css({'display':'block'});
			$(this).find('p').hover(function(){
				$(this).addClass('hover2').siblings().removeClass('hover2');
			},function(){
				$This.find('p').removeClass('hover2');
			})
			$(this).parent('li').find('a').addClass('hover1');
			$heaDiv.parent('li').find('a').find('img').attr('src','img/headerbg1.png');
		},function(){
			$(this).css({'display':'none'});
			$(this).parent('li').find('a').removeClass('hover1');
			$heaDiv.parent('li').find('a').find('img').attr('src','img/headerbg.png'); 
		})
		
	})
		
	function HeaMouseover(obj,src){
		obj.css({'display':'block'});
		obj.parent('li').find('a').find('img').attr('src',src);
	}
	
	function HeaMouseout(obj,src){
		obj.css({'display':'none'});
		obj.parent('li').find('a').find('img').attr('src',src);
	}
	
	//banner
	var $banShop=$('#bannerRight #shopping')
	$banShop.hover(function(){

		$(this).addClass('showColor')
		$(this).find('img').attr('src','img/car1.png')
	},function(){
		$(this).removeClass('showColor')
		$(this).find('img').attr('src','img/car2.png')
	})
	
	var $banBtn=$('#banBtn');
	var $banContent=$('#banContent');
	$banBtn.hover(function(){
		$banContent.css({'display':'block'})
	},function(){
		$banContent.css({'display':'none'});
	})
	$banContent.find('li').mouseover(function(){
		$(this).css({'background':'#dcdcdc'}).siblings().css({'background':'#fff'});
	})
	//contentList
	var $conLeftUl=$('#conLeftUl');
	var $conLeftli=$('#conLeftUl li');
	var $conDiv=$('#conLeftUl').children('div');
	
	
	$conLeftli.hover(function(){
		 $index=$(this).index();
		$(this).addClass('conLion').siblings().removeClass('conLion');
		$conDiv.eq($index).css({'display':'block'});
	},function(){
		$conDiv.css({'display':'none'});
		$(this).removeClass('conLion');
		$conDiv.hover(function(){
			var $contcont=$(this).find('dd');
//			alert($contcont.size())
			$(this).css({'display':'block'});
			$conLeftli.eq($index).addClass('conLion').siblings().removeClass('conLion');
			$contcont.mouseover(function(){
				$(this).css({'background':'#fafafa'}).parent('dl').siblings().find('dd').css({'background':'#fff'})
			})
			
		},function(){
			$(this).css({'display':'none'})
			$conLeftli.removeClass('conLion')
			
		})
	})

	var $conLeftA=$('#conLeftUl .conShow .conShowHead');
	$conLeftA.hover(function(){
		$(this).css({'background':'url(img/Ltwo.png) no-repeat left center'})
		$(this).find('a').css({'background':'red'})
	},function(){
		$(this).css({'background':'url(img/Lone.png) no-repeat left center'});
		$(this).children('a').css({'background':'#a2a2a2'});
	})
	
	//轮播图
	var $conMidLi=$('#conMidUp ul li');  //img
	var $MidBtn=$('#MidBtn ul li');      //btn按钮
	var $conMidDown=$('#conMidDown ul'); //放图片的ul
	var $MidLi=$conMidDown.find('li');
	var $UpLeft=$('#conMidUp .UpLeft');
	var $UpRight=$('#conMidUp .UpRight');
	var $DownLeft=$('#conMidDown .DownLeft');
	var $DownRight=$('#conMidDown .DownRight');
	var $conMidUp=$('#conMidUp');
	var $conMiddown=$('#conMidDown');
	var $conListMid=$('#conListMid');
	var $LRbtn=$('#conMidUp .MidBtn')
	var $MidBtn1=$('#conMidDown .MidBtn1')
	var timer=null;
	var $index=0;
	$MidBtn.mouseover(function(){
		$index=$(this).index();
		MidTab()
	})
	
	MidTab();
	function MidTab(){
		$conMidLi.eq($index).stop().fadeIn(500).siblings().stop().fadeOut();
		$MidBtn.eq($index).addClass('Midactive').siblings().removeClass('Midactive');
		$conMidDown.eq($index%4).stop().fadeIn(500).siblings().not('a').stop().fadeOut();
	}
	$UpLeft.click(function(){
		$index--;
		if($index<0){
			$index=$MidBtn.size()-1;
		}
		MidTab()
	})
	$UpRight.click(function(){
		UpRightChange()
	})
	function UpRightChange(){
		$index++;
		if($index>$MidBtn.size()-1){
			$index=0;
		}
		MidTab()
	}
	$DownLeft.click(function(){
		$UpLeft.trigger('click')
	})
	$DownRight.click(function(){
		$UpRight.trigger('click')
	})
	timer=setInterval(UpRightChange,3000)
	$conListMid.hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(UpRightChange,3000);
	})
	
	$conMidUp.hover(function(){
		$UpLeft.stop().animate({'left':'0px'},300);
		$UpRight.stop().animate({'right':'0px'},300);
	},function(){
		$UpLeft.stop().animate({'left':'-34px'},300);
		$UpRight.stop().animate({'right':'-34px'},300);
	})
	
	$conMiddown.hover(function(){
		$DownLeft.stop().animate({'left':'0px'},300);
		$DownRight.stop().animate({'right':'0px'},300);
	},function(){
		$DownLeft.stop().animate({'left':'-30px'},300);
		$DownRight.stop().animate({'right':'-30px'},300);
	})
	
	$LRbtn.hover(function(){
		$(this).css({'opacity':'1'})
	},function(){
		$(this).css({'opacity':'0.4'})
	})
	$MidBtn1.hover(function(){
		$(this).css({'opacity':'1'})
		},function(){
		$(this).css({'opacity':'0.4'})
	})
	$MidLi.mouseover(function(){
		$(this).find('span').addClass('spanHover').parent('li').siblings().find('span').removeClass('spanHover');
	})
	
	//midRight tab切换
	var $informLi=$('#information ul li');
	var $inforUl=$('#inforContent #inform1');
	var $allInform=$('#allInform');
	var $index1=0;
	var informTimer=null;
	informTab();
	$informLi.mouseover(function(){
		$index1=$(this).index();
		informTab();
	})				//li ul							
	function informTab(){
		$informLi.eq($index1).addClass('inforOn').siblings().removeClass('inforOn');
		$inforUl.eq($index1).css({'display':'block'}).siblings().css({'display':'none'});
		$index1++;
		$index1=$index1%($informLi.size());
	}

	

		
	informTimer=setInterval(informTab,3000);
	$allInform.hover(function(){
		clearInterval(informTimer);
	},function(){
		
		informTimer=setInterval(informTab,3000);
	})
	

	var $informLi2=$('#information2 ul li');
	var $inforUl2=$('#inforContent2 #inform2');
	var $allInform2=$('#allInform2');
	var $index2=0;
	var informTimer2=null;
	
	
	informTab2();
	$informLi2.mouseover(function(){
		$index2=$(this).index();
		informTab2();
	});
	function informTab2(){
		$informLi2.eq($index2).addClass('inforOn').siblings().removeClass('inforOn');
		$inforUl2.eq($index2).css({'display':'block'}).siblings().css({'display':'none'});
		$index2++;
		$index2=$index2%($informLi2.size());
	}
	informTimer2=setInterval(informTab2,3000);
	$allInform2.hover(function(){
		clearInterval(informTimer2);
	},function(){
		informTimer2=setInterval(informTab2,3000);
	})
	
	
	//todyshop
	var $ShopLi=$('#todyHeadLi li');
	var $ShopDiv=$('#todyShopLeft').children('div');
	var $todyShopLeft=$('#todyShopLeft');
//	alert($ShopDiv.size())
	var $ShopIndex=0;
	var ShopTimer=null;
	$ShopLi.hover(function(){
		clearInterval(ShopTimer);
		$ShopIndex=$(this).index();
		shopTab()
	},function(){
		ShopTimer=setInterval(shopTab,3000);
	})
	shopTab()
	function shopTab(){
		$ShopLi.eq($ShopIndex).css({'background':'red'}).siblings().css({'background':'#e6e6e6'});
		$ShopDiv.eq($ShopIndex).css({'display':'block'}).siblings().css({'display':'none'});
		$ShopIndex++;
		$ShopIndex=$ShopIndex%2;

	}
	ShopTimer=setInterval(shopTab,3000);
	
	$todyShopLeft.hover(function(){
		clearInterval(ShopTimer);
	},function(){
		ShopTimer=setInterval(shopTab,3000);
	})
	
	var $shopRightLi=$('#todyShopRight ul li')
	$shopRightLi.mouseover(function(){
		$(this).find('img').stop().animate({left:'-5px'},300).parent().siblings().find('img').stop().animate({'left':'0px'},200)
	})
			
	//rushBuy
	
	function showTime1(){
		var $rushTime=$('#rushTime span');
		var date=new Date();
		var Tstart=date.getTime();
		var Tend=new Date("2016/4/21 00:00:00")
		var Tdis=Tend-Tstart;
		var Ttimer=null;
		 Thour=Math.floor(Tdis/3600000);   //时
		 Tdis-=Thour*3600000;
		 Tminute=Math.floor(Tdis/60000)   //分
		 Tdis-=Tminute*60000;
		 Tsecond=Math.floor(Tdis/1000)   //秒
		$rushTime.eq(0).html(addTwo(Thour));
		$rushTime.eq(1).html(addTwo(Tminute));
		$rushTime.eq(2).html(addTwo(Tsecond));
	}

	showTime1();
	Ttimer=setInterval(showTime1,1000);
	function addTwo(value){
		if(value<10){
			value='0'+value;
		}
		return value;
	}
	if(parseInt(Thour)<0)
	{
		clearInterval(Ttimer);
	}
	
	var $rushLi=$('#rushMove li').first();  //放图片的大li;
	var $rushImg=$('#rushRun li');
	
	var $rushRunLeft=$('#rushRun .left');   //左按钮
	var $rushRunRight=$('#rushRun .right');   //右按钮
	var $rushBtn=$('#rushRun .rushBtn')   //总按钮
	var $rushTabLi=$('#rushTabLi li');          //tab
	var $rushIndex=0;
	var $rushPrev=0;
	var rushTimer=null;
	var $len=$rushTabLi.size()-1;
	$rushTabLi.click(function(){
		$rushIndex=$(this).index();
		rushTurn ();
	})
	
	rushTurn ()
	
	function rushTurn (){
		
		$rushTabLi.eq($rushIndex).addClass('Rushon').siblings().removeClass('Rushon');
		if( $rushIndex==0 && $rushPrev==$len){
					right();
				}else if( $rushIndex==$len && $rushPrev==0 ){
					left();
				}else if( $rushIndex > $rushPrev ){
					right();				
				}else if( $rushIndex < $rushPrev ){
					left();
				};
				$rushPrev = $rushIndex;          //当前值赋给前一个
			};
			
			function right(){
				$rushImg.eq($rushPrev).stop(true,true).animate({'left':'-189px'},200);
				$rushImg.eq($rushIndex).css('left','189px').stop(true,true).animate({'left':'0'},200);
			};
			
			
			function left(){
				$rushImg.eq($rushPrev).stop(true,true).animate({'left':'189px'},200);
				$rushImg.eq($rushIndex).css('left','-189px').stop(true,true).animate({'left':'0'},200);
			};
			

			
	$rushLi.hover(function(){
		$rushBtn.fadeIn()

	},function(){
		$rushBtn.fadeOut()
	})
	// 左右按钮
	$rushRunLeft.click(function(){
		$rushIndex--;
		if($rushIndex<0){
			$rushIndex=$len;
			$rushPrev=0;
		}
		rushTurn ()
	})
	$rushRunRight.click(function(){
		clickRight();
	})
	
//	$(document).ready(function(){
//		alert($)
//	})
//	
	function clickRight(){
		$rushIndex++;
		if($rushIndex>$len){
			$rushIndex=0;
			$rushPrev=$len;
		}
		rushTurn ();
	}
	rushTimer=setInterval(clickRight,3000);
	$rushLi.hover(function(){
		clearInterval(rushTimer);
	},function(){
		rushTimer=setInterval(clickRight,3000);
	})
	
	
	
	var $wphMain=('#wphMain');
	var $wphLi=$('#wphMain li');
	$.ajax({
		type: "get",
		url: "dangdang.json",
		async: true,
		success: function(res) {
			
			for (var i=0; i<$wphLi.size(); i++){
				$wphLi.eq(i).html('<a href="###"><img src='+res[i].src+'/></a><span></span>')
			}
		}
	})
	$wphLi.mouseover(function(){
		$(this).find('span').css({'display':'block'}).parent().siblings().find('span').css({'display':'none'})
	})
	$('#wphUp').mouseout(function(){
		$(this).find('span').css({'display':'none'})
	})
	
	//Onefloor
	
	//twoFloor
	
	
	
	
	

	
	//floor
	var $floorList=$('#floorList');
	var $floorLi=$('#floorList li');
	var attr=['#93d46f','#f59770','#8EAFF2','#FCA230','#BA99ED','#FB98A9','#FF857F','#EE9FCF','#F5B600','#B6C619','#64ACE3'];
	
	$floorLi.hover(function(){
		var $Index=$(this).index();
	
		$(this).css({'background':attr[$Index]+'url(img/floor.png) no-repeat -38px '+(-$Index*40)+'px'})
		$(this).find('span').css({'display':'block'});
	},function(){
		$(this).css({'background':'none'});
		$(this).find('span').css({'display':'none'});
	})
	
	
	
//	var $floorList=$('#floorList');
//	 lazyDown($(".floor"))
//			function lazyDown(obj){
//				obj.each(function(){
//					this.flag = true;
//				})
				
				$(window).scroll(function(){
					//这个是让侧面的楼层按钮显示
					if($(window).scrollTop()>=500){
						$floorList.fadeIn(500);
					}else{
						$floorList.fadeOut(500);
					}
					if($(window).scrollTop()>800){
						$('#head').fadeIn(500);
					}else {
						$('#head').fadeOut(500);
					}
					
					
					/*var onOff = true; //锁
			$floorNav.click(function(){ //点击事件
				onOff = false; //当他为点击的时候把锁变成false这个时候不会执行滚动事件
				$floorNav.find('span').removeClass('active');
				$(this).find('span').addClass('active');
				var $index = $(this).index();
				var $top = $('#main .floor').eq($index).offset().top; //拿到制定楼层的距离顶部的高度
				$('body,html').animate({'scrollTop':$top},500,function(){
					onOff = true; //在动画执行完后把锁打开
				});
			});
			$(window).scroll(function(){
				if(onOff){ //判断 如果为true 我执行内动
					var $t = $(this).scrollTop(); //拿当前的滚动高度
					var $headerH = $('#header').height(); //拿header的高度
					//当前高度大于或者等于$headerH高度的时候显示，否则隐藏
					if( $t >= $headerH ){  
						$('#floorNav').fadeIn(300);
					}else{
						$('#floorNav').fadeOut(300);
					}
					var $obj = $('#main .floor'); 
					$obj.each(function(  ){ //循环所有拿到的楼层
						//获取当前的div距离顶部的高度然后加上自身的距离除以2的目的是为了让他超过自身的一半后调到下一楼层
						var index=$(this).index();
						var $objTop = $(this).offset().top+$(this).height()/2;  
						if( $t < $objTop ){ //如果滚动高度小于当前高度
							$floorNav.find('span').removeClass('active');
							$floorNav.eq(index).find('span').addClass('active');
							return false; //匹配完了当前楼层就结束
						}
						//alert( $objTop );
					})
				}
				
			})
			$('#floorNav ul li.last').click(function(){ //点击最后一个返回顶部
				onOff = false;
				$('body,html').animate({'scrollTop':'0'},300,function(){
					onOff = true;
				});
			})*/
					
					
					
					
//					var $floorList=$('#floorList');
		if(($("body").scrollTop() >= obj.eq(index).offset().top) && ($("body").scrollTop() <= (obj.eq(index).offset().top + obj.eq(index).outerHeight() / 2))) {
	$floorList.find('li').eq(index - 1).css({
		'background': attr[index] + ' url(img/floor.png) no-repeat -38px ' + (-(index - 1) * 40) + 'px'
	}).siblings().css({
		'background': 'none'
	});
	

					
					
					
					
					
					
					
					//obj.each(function(index){
//						var index = $(this).index();
						
							
//						
//						$(this).css({'background':attr[$Index]+' url(img/floor.png) no-repeat -38px '+(-$Index*40)+'px'})
//		$(this).find('span').css({'display':'block'})
//	},function(){
//		$(this).css({'background':'none'})
//		$(this).find('span').css({'display':'none'})
						
						
						
						
						
						
						
//							if(this.flag){
//								
//								$.ajax({
//									type:"get",
//									url:"floor"+(index-1)%2+".html",
//									async:true,
//									beforeSend:function(){
//										obj.eq(index).css("background","url(img/loadbg.gif) no-repeat center center");
//									},
//									success:function(msg){
//										setTimeout(function(){
//											obj.eq(index-1).css("background",'');
//											obj.eq(index-1).html(msg);
//										},3000)
//									}
//								});
//							}
//							this.flag = false;
//						}
//					})
//				})
//			}
//			
			$("#floorList li").click(function(){
				var index = $(this).index();
				var oTop = $(".floor").eq(index).offset().top;
				$("body").animate({scrollTop:oTop},1000)
			})
	 
	 



	
})


