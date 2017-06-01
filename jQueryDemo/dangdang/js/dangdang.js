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
	var $heaRA=$('#headerList li:gt(2) a')
	
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
			$(this).parent('li').find('a').addClass('hover1')
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
				$(this).addClass('hover2').siblings().removeClass('hover2')
			},function(){
				$This.find('p').removeClass('hover2')
			})
			$(this).parent('li').find('a').addClass('hover1')
			$heaDiv.parent('li').find('a').find('img').attr('src','img/headerbg1.png')
		},function(){
			$(this).css({'display':'none'});
			$(this).parent('li').find('a').removeClass('hover1')
			$heaDiv.parent('li').find('a').find('img').attr('src','img/headerbg.png')
		})
		
	})
		
	function HeaMouseover(obj,src){
		obj.css({'display':'block'})
		obj.parent('li').find('a').find('img').attr('src',src)
	}
	
	function HeaMouseout(obj,src){
		obj.css({'display':'none'})
		obj.parent('li').find('a').find('img').attr('src',src)
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
		$(this).css({'background':'#dcdcdc'}).siblings().css({'background':'#fff'})
	})

	//contentList
	var $conLeftUl=$('#conLeftUl');
	var $conLeftli=$('#conLeftUl li');
	var $conDiv=$('#conLeftUl').children('div');
	
	
	$conLeftli.hover(function(){
		 $index=$(this).index();
		$(this).addClass('conLion').siblings().removeClass('conLion')
		$conDiv.eq($index).css({'display':'block'})
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
		$(this).css({'background':'url(img/Lone.png) no-repeat left center'})
		$(this).children('a').css({'background':'#a2a2a2'})
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
	})
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
		
	/*wph*/
	var $wphMain=('#wphMain');
	var $wphLi=$('#wphMain li');
	
	$.ajax({
		type: "get",
		url:"dangdang.json",
		
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
	var $OnefloorHeadLi=$('#oneFloor .floorHead .floorHeadRight ul li'); //onefloor头部
	var $oneRightHeadLi=$('#oneRightHeadLi li');  //onefloor右边
	var $oneRightHeadMainLi=$('#oneRightHeadMainLi li'); //手风琴
	var $oneRightHeadMainUl=$('#oneRightHeadMain ul')   //ul
	var $oneFloor=$('.oneFloor');
//	alert($oneRightHeadMainUl.size())
//	alert($oneRightHeadMainLi.size())
	$OnefloorHeadLi.mouseover(function(){
		$num=$(this).index();
		$(this).addClass('floorOn').siblings().removeClass('floorOn');
		$oneFloor.eq($num%2).css({'display':'none'}).siblings().css({'display':'block'})
	})
	
	var $Onefloorindex=0;
	$oneRightHeadLi.mouseover(function(){
	 $Onefloorindex=$(this).index();
		OneFloorRightTurn();
	})
	OneFloorRightTurn();
	function OneFloorRightTurn(){
		$oneRightHeadLi.eq($Onefloorindex).addClass('oneRightHeadLiOn').siblings().removeClass('oneRightHeadLiOn');
		$oneRightHeadMainUl.eq($Onefloorindex).css({'display':'block'}).siblings('ul').css({'display':'none'})
	}
	//onefloor轮播图
	var $oneFloorImg=$('#oneFloorImg li');   //轮播图片
	var $oneBtnAll=$('#oneFloorImg .oneMUpBt')
	var $oneLeft=$('#oneFloorImg .oneLeft');  //leftBtn
	var $oneRight=$('#oneFloorImg .oneRight')  //rightBtn
	var $oneMidUpBtn=$('#oneMidUpBtn li')   //下面的btn;
	var $oneFloorIndex=0;
	var $oneFloorprev=0;
	var oneFloorTimer=null;
	var $oneFloorlen=$oneFloorImg.size()-1;
	$oneMidUpBtn.click(function(){
		$oneFloorIndex=$(this).index();
		oneFloorTurn ();
	})
	oneFloorTurn ()
	
	function oneFloorTurn (){
		
		$oneMidUpBtn.eq($oneFloorIndex).addClass('oneFloorOn').siblings().removeClass('oneFloorOn');
		if( $oneFloorIndex==0 && $oneFloorprev==$oneFloorlen){
					right1();
				}else if( $oneFloorIndex==$oneFloorlen && $oneFloorprev==0 ){
					left1();
				}else if( $oneFloorIndex > $oneFloorprev ){
					right1();				
				}else if( $oneFloorIndex < $oneFloorprev ){
					left1();
				};
				$oneFloorprev = $oneFloorIndex;          //当前值赋给前一个
			};
			
			function right1(){
				$oneFloorImg.eq($oneFloorprev).stop(true,true).animate({'left':'-334px'},200);
				$oneFloorImg.eq($oneFloorIndex).css('left','334px').stop(true,true).animate({'left':'0'},200);
			};
			function left1(){
				$oneFloorImg.eq($oneFloorprev).stop(true,true).animate({'left':'334px'},200);
				$oneFloorImg.eq($oneFloorIndex).css('left','-334px').stop(true,true).animate({'left':'0'},200);
			};
	
	$('#oneLeftMainMidUp').hover(function(){
		$oneBtnAll.fadeIn();
		
	},function(){
		$oneBtnAll.fadeOut();
	})
	// 左右按钮
	$oneLeft.click(function(){
		$oneFloorIndex--;
		if($oneFloorIndex<0){
			$oneFloorIndex=$oneFloorlen;
			$oneFloorprev=0;
		}
		oneFloorTurn ()
	})
	$oneRight.click(function(){
		oneFloorRight();
	})
	function oneFloorRight(){
		$oneFloorIndex++;
		if($oneFloorIndex>$oneFloorlen){
			$oneFloorIndex=0;
			$oneFloorprev=$oneFloorlen;
		}
		oneFloorTurn ();
	}
	oneFloorTimer=setInterval(oneFloorRight,3000);
	$('#oneLeftMainMidUp').hover(function(){
		clearInterval(oneFloorTimer);
	},function(){
		oneFloorTimer=setInterval(oneFloorRight,3000);
	})
	
	
	
	
	
	var $oneFloorImg1=$('#oneFloorImg1 li');   //轮播图片
	var $oneBtnAll1=$('#oneFloorImg1 .oneMUpBt1')
	var $oneLeft1=$('#oneFloorImg1 .oneLeft1');  //leftBtn
	var $oneRight1=$('#oneFloorImg1 .oneRight1')  //rightBtn
	var $oneMidUpBtn1=$('#oneMidUpBtn1 li')   //下面的btn;
	
	
	var $oneFloorIndex1=0;
	var $oneFloorprev1=0;
	var oneFloorTimer1=null;
	var $oneFloorlen1=$oneFloorImg1.size()-1;
	$oneMidUpBtn1.click(function(){
		$oneFloorIndex1=$(this).index();
		oneFloorTurn1 ();
	})
	oneFloorTurn1 ()
	
	function oneFloorTurn1 (){
		
		$oneMidUpBtn1.eq($oneFloorIndex1).addClass('oneFloorOn1').siblings().removeClass('oneFloorOn1');
		if( $oneFloorIndex1==0 && $oneFloorprev1==$oneFloorlen1){
					right2();
				}else if( $oneFloorIndex1==$oneFloorlen1 && $oneFloorprev1==0 ){
					left2();
				}else if( $oneFloorIndex1 > $oneFloorprev1 ){
					right2();				
				}else if( $oneFloorIndex1 < $oneFloorprev1 ){
					left2();
				};
				$oneFloorprev1 = $oneFloorIndex1;          //当前值赋给前一个
			};
			
			function right2(){
				$oneFloorImg1.eq($oneFloorprev1).stop(true,true).animate({'left':'-334px'},200);
				$oneFloorImg1.eq($oneFloorIndex1).css('left','334px').stop(true,true).animate({'left':'0'},200);
			};
			function left2(){
				$oneFloorImg1.eq($oneFloorprev1).stop(true,true).animate({'left':'334px'},200);
				$oneFloorImg1.eq($oneFloorIndex1).css('left','-334px').stop(true,true).animate({'left':'0'},200);
			};
	
	$('#oneLeftMainMidUp1').hover(function(){
		$oneBtnAll1.fadeIn();
		
	},function(){
		$oneBtnAll1.fadeOut();
	})
	// 左右按钮
	$oneLeft1.click(function(){
		$oneFloorIndex1--;
		if($oneFloorIndex1<0){
			$oneFloorIndex1=$oneFloorlen1;
			$oneFloorprev1=0;
		}
		oneFloorTurn1 ()
	})
	$oneRight1.click(function(){
		oneFloorRight1();
	})
	function oneFloorRight1(){
		$oneFloorIndex1++;
		if($oneFloorIndex1>$oneFloorlen1){
			$oneFloorIndex1=0;
			$oneFloorprev1=$oneFloorlen1;
		}
		oneFloorTurn1 ();
	}
	oneFloorTimer1=setInterval(oneFloorRight1,3000);
	$('#oneLeftMainMidUp1').hover(function(){
		clearInterval(oneFloorTimer1);
	},function(){
		oneFloorTimer1=setInterval(oneFloorRight1,3000);
	})
	

	$oneRightHeadMainLi.hover(function(){
		 
		$(this).find('em').css({'display':'none'}).parent().parent('li').siblings('li').find('em').css({'display':'block'});

		$(this).find('span').css({'display':'block'})
		$(this).siblings('li').find('span').css({'display':'none'});
		$(this).css({'height':'152px'}).siblings().css({'height':'33px'})
	})
	
	
	//twoFloor
	var $twofloorHeadRighLi=$('.twofloorHeadRight li');
    var $twoMainUl=$('#twoRightMain .twoMainOne');
	var $twoTwoUl=$('#twoTwoUl');          //oneul
	var $twoTwoUltwo=$('#twoTwoUltwo');     //twoul
	var $twoTwoUlthree=$('#twoTwoUlthree');   //threeul
	var $twooneLi=$('#twoOneFirst');     //li(div)
	var $twooneLi=$('#twoOneTwo');
	var $twooneLi=$('#twoOneThree');
	var $twoMUpBtAll=$('.twoMUpBt');    //总btn;
	var $twoBtnOneLeft=$('#twoOneLeft');    //btnone
	var $twoBtnOneRight=$('#twoOneRight');
	var $twoBtnTwoLeft=$('#twoTwoLeft');    //btntwo
	var $twoBtnTwoRight=$('#twoTwoRight');
	var $twoBtnThreeLeft=$('#twoThreeLeft');    //btnthree
	var $twoBtnThreeRight=$('#twoThreeRight');
	var $twooneSpan=$('.twoBtnone span');           //oneSpan
	var $twotwoSpan=$('.twoBtntwo span');          //twoSpan
	var $twothreeSpan=$('.twoBtnthree span');		//threeSpan	
	var $twooneSpanIndex=1;
	var $twoFloorOneTimer=null;
	$twooneSpan.click(function(){
		$twooneSpanIndex=$(this).index()+1;
		$twoTwoUl.animate({'left':-$twooneSpanIndex*383+'px'},300)
	})
	$twoBtnOneLeft.click(function(){
		$twooneSpanIndex--;
		if($twooneSpanIndex==-1){
			$twoTwoUl.css({'left':-4*383+'px'});
			$twooneSpanIndex=3;
		}
		$twoTwoUl.animate({'left':-$twooneSpanIndex*383+'px'},300);
		$twooneSpan.eq($twooneSpanIndex).addClass('twoFloorOn').siblings().removeClass('twoFloorOn')
	})
	$twoBtnOneRight.click(function(){
		twoFloorTurn();
	})
	
	$twoFloorOneTimer=setInterval(twoFloorTurn,3000)
	
	function twoFloorTurn(){
		$twooneSpanIndex++;
		if($twooneSpanIndex==5){
			$twoTwoUl.css({'left':0+'px'});
			$twooneSpanIndex=1;
		}
		$twooneSpan.eq($twooneSpanIndex-1).addClass('twoFloorOn').siblings().removeClass('twoFloorOn')
		$twoTwoUl.animate({'left':-$twooneSpanIndex*383+'px'},300);
	}
	
	$('#twoOneFirst').hover(function(){
		$twoMUpBtAll.fadeIn();
		clearInterval($twoFloorOneTimer);
	},function(){
		$twoMUpBtAll.fadeOut();
		$twoFloorOneTimer=setInterval(twoFloorTurn,3000);
	})
	
	
	
	$twofloorHeadRighLi.mouseover(function(){
		$(this).addClass('twofloorOn').siblings().removeClass('twofloorOn');
		$twoMainUl.eq($(this).index()).css({'display':'block'}).siblings().css({'display':'none'})
	})
	
	
	//floor
	var $floorList=$('#floorList');
	var $floorLi=$('#floorList li');
	var $Floor=$('.floor')	
	
 attr=['#93d46f','#f59770','#8EAFF2','#FCA230','#BA99ED','#FB98A9','#FF857F','#EE9FCF','#F5B600','#B6C619','#64ACE3'];
	
	$floorLi.hover(function(){
		var $Index=$(this).index();
	
		$(this).css({'background':attr[$Index]+' url(img/floor.png) no-repeat -38px '+(-$Index*40)+'px'})
		$(this).find('span').css({'display':'block','background':attr[$Index]})
	},function(){
		$(this).css({'background':'none'})
		$(this).find('span').css({'display':'none'})
	})
		
		var onOff=true;
	$(window).scroll(function(){
		if(onOff)
	{	if($(window).scrollTop()>=500){
			$floorList.fadeIn(500);
		}else{
			$floorList.fadeOut(500);
		}
		if($(window).scrollTop()>800){
			$('#head').fadeIn(500);
		}else {
			$('#head').fadeOut(500);
		}
		$Floor.each(function( index ){ 		
			var $FloorTop = $(this).offset().top + $(this).height() / 2;
			if ($(window).scrollTop() < $FloorTop) { 
				$floorLi.each(function(){
					$(this).css({'background':'none'})
				})
				$floorLi.eq(index).css({'background':attr[index]+' url(img/floor.png) no-repeat -38px '+(-index*40)+'px'})
				
				return false; 
			}
			
		})
		}
		
	})
		
		
	
	 $floorLi.click(function(){
	 	onOff=false;
		var index = $(this).index();
		var oTop = $Floor.eq(index).offset().top;
		$("body,html").animate({scrollTop:oTop},1000,function(){
			onOff = true;
		});
		$(this).find('span').css({'display':'none'})
	})
	 		
	 /*右框*/
	  $('.br2First').hover(function(){
	  	$('.br2Two').css({'display':'block'})
	  },function(){
	  	$('.br2Two').css({'display':'none'})
	  })
		var $brA=$('#br4 a').has('span')
		$brA.hover(function(){
			$(this).find('span').stop().animate({'left':'-89px'}).siblings().has('span').find('span').css({'left':'42px'})
		},function(){
			$(this).find('span').stop().css({'left':'42px'})
		})
	
	 	$('#brThree').click(function(){
	 		$('body').animate({scrollTop:'0px'});
	 	})
		
		//推广
		var $tuiBtnLi=$('#tuiBtn li')    //头部按钮
		var $tuiUl=$('.tuiPicTun');
		var $TLeft=$('.tBtn');
		var $Tuindex=0;
		var TuiTimer=null;
		var $tuipicLi=$('#tuipic li');
		
		TuiTurn();
		$tuiBtnLi.mouseover(function(){
			$Tuindex=$(this).index();
			TuiTurn()
		})
		$TLeft.click(function(){
			TuiTurn()
		})
		
		function TuiTurn(){
			$tuiBtnLi.eq($Tuindex).css({'background':'red'}).siblings().css({'background':'#646464'});
			$tuiUl.eq($Tuindex).css({'display':'none'}).siblings().not('p').css({'display':'block'});
			$Tuindex++;
			$Tuindex=$Tuindex%2;
		}
		TuiTimer=setInterval(TuiTurn,1000);
		$('#tuiguang').hover(function(){
			clearInterval(TuiTimer);
			$TLeft.fadeIn()
		},function(){
			TuiTimer=setInterval(TuiTurn,1000);
			$TLeft.fadeOut()
		})
		
		$('#tuiBtn').hover(function(){
			clearInterval(TuiTimer);
		},function(){
			TuiTimer=setInterval(TuiTurn,1000);
			$tuipicLi.find('span').css({'display':'none'})
		})
		
		$tuipicLi.mouseover(function(){
			$(this).css({'background':'#F9F9F9'}).siblings().css({'background':'none'});
			$(this).find('span').css({'display':'block'}).parent('li').siblings().find('span').css({'display':'none'})
		})
		
		//footer
		var $footerSpan=$('.footerContent span');
		$footerSpan.each(function(index){
			$(this).css({'background':'url(img/f1.png) no-repeat 0px -'+index*52+'px'})
		})
		
		var $indexName=$('#indexName');
		$indexName.css({'color':'red','text-decoration':'underline'})
		$indexName.html(getCookie('user'));
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
})


