$(function(){
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
	};
	
	var $conP=$('.contentRight p');
	var $conRightSpan=$('table span');
	var $Input=$("input[type=text],input[type=password]");
	var $conPic=$('.contentRight p img');
	
	$Input.focus(function(){
  		$(this).siblings().css({'display':'block'});
  		
	});
	$Input.blur(function(){
  		$(this).siblings().not('p').css({'display':'none'})
  		
	});
	var regNum=0;
	$conP.click(function(){
		regNum++;
		$conPic.attr('src',"img/new"+regNum%3+".png")
	})
	
	var $userName=$('#userName');   //用户电话邮箱
	var reg=/^1\d{10}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
	$userName.blur(function(){
		if(!reg.test($(this).val())){
			alert("用户名输入有误");
			return false;
		}else{
			return true;
		}
	})										
	var $userPass=$('#userPass');
	var reg1=/\w+/;
	$userPass.blur(function(){
		if(!reg1.test($(this).val())){
			alert("密码输入有误");
			return false;
		}else{
			return true;
		}
	})
	var $userPass1=$('#userPass1');
	
	$userPass1.blur(function(){
		if($(this).val()!=$userPass.val()){
			alert('密码不一致');
			return false;
		}else{
			return true;
		}
	})
	
	var $allReg=$('#allReg');
	$allReg.click(function(){
		$allReg.attr('href','###');
		$('#yanzheng').val('');
		if(reg.test($userName.val())&&reg1.test($userPass.val())&&$userPass1.val()==$userPass.val()){
			setCookie('user',$userName.val(),20);
			$allReg.attr('href','successReg.html');
			
		}else{
			alert("您的输入不正确");
//			return false;
//			$allReg.attr('href','javascrip:;');
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
