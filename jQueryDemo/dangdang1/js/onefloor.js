$(function(){
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
	
	
})
