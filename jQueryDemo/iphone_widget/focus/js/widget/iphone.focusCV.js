﻿//2016.1.12
(function($) {
	$.fn.extend({
		focusCV: function(options) {
			var $this=$(this);	
			var boxMask,boxCont,boxThis,boxList,boxPrev,boxNext,boxWd,boxHt,boxMax,boxesWd,boxesHt,boxDis,boxTar,boxTimer,boxNow,boxBtn,boxDir,boxShowNum,boxJump;
			var isGoto=-1;
			var defaults = {delay:5000,speed:1000,auto:false,swipe:true};
			var opts = $.extend(defaults,options);
			init();	
			
			function init(){
				boxWd=$this.width();
				boxHt=$this.height();
				boxMask=$this.children('.boxMask');
				boxCont=boxMask.children();
				boxThis=boxCont.children().each(function(i) {$(this).data({id:i});});
				boxList=$this.children("a.boxList");
				boxPrev=$this.children("a.boxPrev");
				boxNext=$this.children("a.boxNext");
				boxTar=0;
				boxNow=0;
				boxDir=-1;
				boxShowNum=1;
				boxJump=false;
				boxMax=boxThis.length;
				boxesWd=boxMax*boxWd;//总长度
				boxesHt=boxMax*boxHt;//总高度
				boxDis=boxesHt-boxHt;
				$this.on("off",this_off).on("goto",this_goto).on("prev",this_prev).on("next",this_next).on("stop",this_stop).on("play",this_play);
				if(opts.swipe) $this.one('swipeup',this_next).one('swipedown',this_prev);
				if(boxPrev.length>0) boxPrev.on('touchend',this_prev);
				if(boxNext.length>0) boxNext.on('touchend',this_next);
				if(boxList.length>0){
					for(var i=0; i<boxMax; i++) boxList.append('<span></span>');
					boxBtn=boxList.children();
				}//end if
				boxBtnChange();
				time_handler();
			}//end func

			function this_off(e){
				$this.off("off goto prev next stop play");
				if(opts.swipe) $this.off('swipeup',this_next).off('swipedown',this_prev);
				if(boxPrev.length>0) boxPrev.off();
				if(boxNext.length>0) boxNext.off();
				if(opts.auto) clearTimeout(boxTimer);
				if(opts.onOff) opts.onOff($this);
			}//end func
			
			function this_stop(e){
				clearTimeout(boxTimer);
			}//end func
			
			function this_play(e){
				time_handler();
			}//end func
			
			function this_goto(e, id) {
                if (boxDis > 0 && boxNow != id) {
                    dis = id - boxNow;
                    boxDir = dis < 0 ? 1 : -1;
                    for (var i = 1; i <= Math.abs(dis) ; i++) {
                        boxJump = true;
                        if (i == 1){
                        	if(Math.abs(dis)!=1) isGoto = 0;
                        	else isGoto = 2;
                        }//end if
                        else if (i == Math.abs(dis)) isGoto = 2;
                        else isGoto = 1;
                        box_motion();
                    }//end for
                    isGoto = -1;
                }//end if
            }//end func
			
			function this_prev(e){
				boxDir=1;
				box_roll();
			}//end func
			
			function this_next(e){
				boxDir=-1;
				box_roll();
			}//end func
			
			function time_handler(){
				if(opts.auto){
					clearTimeout(boxTimer);
					boxTimer=setTimeout(box_roll,opts.delay);
				}//end if
			}//end func
			
			function box_roll(){
				if(!boxCont.hasClass("moving") && boxDis>0) box_motion();
			}//end func
			
			function box_motion(){
				boxCont.addClass('moving');
				if(opts.swipe) $this.off('swipeup',this_next).off('swipedown',this_prev);
				boxThis=boxCont.children();				
				if(boxDir==-1){
					boxNow=parseInt(boxThis.eq(1).data('id'));
					boxCont.transition({y:-boxHt }, boxJump?0:opts.speed, function(){
						boxThis.last().after(boxThis.first());
						boxCont.css({y:0});
						box_complete();
					});
				}//end if
				else {
					boxNow=parseInt(boxThis.last().data('id'));
					boxThis.first().before(boxThis.last());
					boxCont.css({y:-boxHt});
					boxCont.transition({y:0}, boxJump?0:opts.speed,box_complete);
				}//end else if
				boxJump=false;
				boxBtnChange();
				if ( (opts.onStart && isGoto == -1) || (opts.onStart && isGoto == 0) ) opts.onStart(boxNow,$this);
			}//end func
			
			function box_complete(){
				boxCont.removeClass('moving');
				if(opts.swipe) $this.one('swipeup',this_next).one('swipedown',this_prev);
				time_handler();
				if ( (opts.onComplete && isGoto == -1) || (opts.onComplete && isGoto == 2) ) opts.onComplete(boxNow,$this);
			}//end if
			
			function boxBtnChange(){
				if(boxList.length>0) boxBtn.removeClass().eq(boxNow).addClass("active");				
			}//end func
			
		},//end fn
		focusCVGoto: function(id) {
			$(this).triggerHandler('goto',[id]);
		},//end fn
		focusCVPrev: function() {
			$(this).triggerHandler('prev');
		},//end fn
		focusCVNext: function() {
			$(this).triggerHandler('next');
		},//end fn
		focusCVStop: function() {
			$(this).triggerHandler('stop');
		},//end fn
		focusCVPlay: function() {
			$(this).triggerHandler('play');
		},//end fn
		focusCVOff: function() {
			$(this).triggerHandler('off');
		}//end fn	
	});//end extend	
})(jQuery);//闭包