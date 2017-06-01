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
	
	//
	var $regName=$('#sucessName');
	$regName.css({'color':'red','text-decoration':'underline'})
	$regName.html(getCookie('user'))
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})












