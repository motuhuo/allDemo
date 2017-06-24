//2015.11.24
(function($) {
	
	var $this;
	var $cont;
	var $panel;
	var $bar;
	var $tar,$can,$size,$sizeLastCont,$sizeLastThis,$timer,$posLast,$barSize,$dir;
	var defaults = {static:false,speed:1,panelFade:false};
	
	$.fn.extend({
		scrbar: function(options) {	
			$this=$(this);
			$cont=$this.children(".cont");
			$panel=$this.children(".panel");
			$bar=$panel.children();
			$tar=0;
			$size=0;
			$sizeLastCont=0;
			$sizeLastThis=$this.height();
			$posLast=[];
			$dir=0;
			var opts = $.extend(defaults, options);
			
			init();	
			
			function init(){
				$this.on("off",this_off).on('goto',this_goto).on('offset',this_offset).on("top",this_top).on("bottom",this_bottom);
				$this.on("touchstart",this_touchstart).on("touchmove",this_touchmove).on("touchend",this_touchend);
				size_handler();
				$timer=setInterval(size_handler,100);
			}//end func		
			
			function this_off(e){
				$this.off("off goto offset top bottom");
				$this.off("touchstart",this_touchstart).off("touchmove",this_touchmove).off("touchend",this_touchend);
				clearInterval($timer);
				if(opts.onOff) opts.onOff($this);
			}//end func
			
			function this_goto(e,pos){
				if(pos>0){
					size_handler();
					$dir=$tar<pos?1:-1;
					$tar=pos;
					scroll_handler();
				}//end if
			}//end func
			
			function this_offset(e,offset){
				if(offset!=0){
					size_handler();
					$dir=offset>0?1:-1;
					$tar+=offset;
					scroll_handler();
				}//end if
			}//end func
			
			function this_top(e){
				size_handler();
				$tar=0;
				$dir=0;
				scroll_handler();
			}//end func
			
			function this_bottom(e){
				size_handler();
				$tar=$barSize;
				$dir=-1;
				scroll_handler();
			}//end func
			
			function size_handler(){
				$size=$cont.outerHeight();
				if($sizeLastCont!=$size || $sizeLastThis!=$this.height()){
					$sizeLastCont=$size;//滚动内容上一次高
					$sizeLastThis=$this.height();
					if(opts.static) $bar.css({y:-$cont.position().top/($cont.outerHeight()-$this.height())*($this.height()-$bar.outerHeight())});	
					else $bar.css({height:$this.height()/$cont.outerHeight()*$panel.height(),y:-$cont.position().top/($cont.outerHeight()-$this.height())*($this.height()-$bar.outerHeight())});
					$barSize=$this.height()-$bar.outerHeight();
					if($size<=$this.height()){
						$can=false;
						$panel.hide();
					}//end if
					else{
						$can=true;
						$panel.show();
						if(opts.panelFade) $panel.css({opacity:0});
					}//end else
				}//end if			
			}//end func	
			
			function this_touchstart(e){
				if($can){
					$posLast=[e.originalEvent.touches[0].clientX,e.originalEvent.touches[0].clientY];
					if(opts.panelFade) $panel.transition({opacity:1},250);
				}//end if
			}//end func
			
			function this_touchmove(e){
				e.preventDefault();
				e.stopPropagation();
				if($can){
					var dis=e.originalEvent.touches[0].clientY-$posLast[1];
					$dir=dis>0?-1:1;
					$tar-=(e.originalEvent.touches[0].clientY-$posLast[1])*opts.speed;
					$posLast=[e.originalEvent.touches[0].clientX,e.originalEvent.touches[0].clientY];
					scroll_handler();
				}//end if
			}//end func
			
			function this_touchend(e){
				if($can && opts.panelFade) $panel.transition({opacity:0},250);
			}//end func

			function scroll_handler(){
				$tar=$tar>$barSize?$barSize:$tar;
				$tar=$tar<0?0:$tar;
				$bar.css({y:$tar});
				var percent=$tar/($barSize);
				$cont.css({y:-percent*($size-$this.height())});	
				if(opts.onScroll) opts.onScroll(percent,$dir,$this);
			}//end func
			
		},//end fn
		scrbarTop: function() {
			$(this).triggerHandler('top');
		},//end fn
		scrbarBottom: function() {
			$(this).triggerHandler('bottom');
		},//end fn
		scrbarGoto: function(pos) {
			if(pos && pos>=0) $(this).triggerHandler('goto',[pos]);
		},//end fn
		scrbarOffset: function(offset) {
			if(offset) $(this).triggerHandler('offset',[offset]);
		},//end fn
		scrbarOff: function() {
			$(this).triggerHandler('off');
		}//end fn
	});//end extend
})(jQuery);//闭包