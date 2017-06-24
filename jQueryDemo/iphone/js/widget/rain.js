(function ($) {
    $.fn.extend({
        rain: function (options) {
            var $this = $(this);
            var $rains, $xx, $yy;
            var defaults = {num: 5, speed: 5};
            var opts = $.extend(defaults, options);           
            init();
            function init() {
                $this.empty().hide();
                $rains = []; $xx = []; $yy = [];
                $this.on('off', $this_off).on('on', $this_on);
            }
            function $this_on() {
                $this.show();
                setInterval(moverain, 14);
            }//end func
            function $this_off(e) {
                console.log($this);
                clearInterval(moverain);
                $this.empty().hide();
                
                $this.off('off', $this_off).off('on', $this_on).remove();
                if (opts.onOff) opts.onOff($this);
            }//end func
            for (make = 0; make < opts.num; make++) {
                var drop = $('<div id="drop' + make + '" class=drop></div>').appendTo($this);
                $rains.push(drop);
                maxx = $(window).width();
                maxy = $(window).height();
                $xx[make] = Math.random() * maxx;
                $yy[make] = -100 - Math.random() * maxy;
                $rains[make].css({ left: $xx[make] });
                $rains[make].css({ top: $yy[make] });
            }           
            function moverain() {
                for (move = 0; move < opts.num; move++) {
                    $xx[move] += -opts.speed; $yy[move] += opts.speed;
                    if ($xx[move] < 0) { $xx[move] = maxx + 10; }
                    if ($yy[move] > maxy) { $yy[move] = 10; }
                    $rains[move].css({ left: $xx[move] });
                    $rains[move].css({ top: $yy[move] });
                }
            }
        },//end fn
        rainOn: function () {
            $(this).triggerHandler('on');
        },
        rainOff: function () {
            $(this).triggerHandler('off');
        }//end fn
    });//end extend
})(jQuery);//闭包