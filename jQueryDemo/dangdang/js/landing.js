$(function(){
	var $tanchuang=$('#tanchuang');
	var $tanKnow=$('.tanKnow')
		
		setTimeout(function(){
			$tanchuang.css({'display':'block'})
		},1000)
	$tanKnow.click(function(){
		$tanchuang.css({'display':'none'})
	})
	
	
	var $landInput=$('.landU .landUser');
	$landInput.blur(function(){
		var $landUser=$('.landUser').val();
		if($landUser!=getCookie('user')){
			alert('您的用户名末注册，请先注册!')
		}
	})
	var $land=$('.land');
	var $landLast=$('#landLast');
	$land.click(function(){
		if($landUser==getCookie('user')){
			
		}
	})
	
	
})
