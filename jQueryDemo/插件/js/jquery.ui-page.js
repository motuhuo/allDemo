/*
	Function : pageView
	Author : hhl
	Address : shQF
*/
(function($){
	$.fn.pageView = function( ops ){

		this.ops = ops || {};
		init.call( this ); //动态的生成页面元素
		lister.call(this);//实现滚轮事件
	}
	function init(){
		this.index = 0;
		this.addClass('ui-Page');
		var $ul = $('<ul></ul>');
		this.children('div').addClass('pageView').each(function(){
			$ul.append('<li></li>');
		});
		var $this = this;
		$ul.find('li').click(function(){
			$this.trigger('mousewheel',$(this).index())
		})
		this.ul = $ul;
		this.maxPage = $('.pageView',$(this)).size()-1;
		this.append( this.ul );
	}
	function lister(){
		var $this = this;
		$this.bind('mousewheel',function( ev , index ){
			if( typeof index == 'undefined' ){
				var ev = ev || event;
				var wheelDe = ev.originalEvent.wheelDelta;
				wheelDe = wheelDe>0?1:0;
				var $index = $this.index;
				if( wheelDe ){
					if(--$index<0){
						return;
					};
				}else{
					if( ++$index>$this.maxPage ){
						return;
					};
				};
			}else{
				$index = index;
			};
			if( !$this.is(':animated') ){
				$this.ul.find('li').eq($index).addClass('active').siblings().removeClass('active');
				$this.animate({'top':'-'+$index+'00%'},1000);
				$this.index = $index;
			};
		});
		$this.ul.find(':first').addClass('active');
	}
})(jQuery);
