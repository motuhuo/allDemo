$(function(){
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
})
