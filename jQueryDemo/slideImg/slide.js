(function ($) {
    var
    props = ['Width', 'Height'],
    prop;

    while (prop = props.pop()) {
        (function (natural, prop) {
            $.fn[natural] = (natural in new Image()) ?
            function () {
                return this[0][natural];
            } :
            function () {
                var
                node = this[0],
                img,
                value;

                if (node.tagName.toLowerCase() === 'img') {
                    img = new Image();
                    img.src = node.src,
                    value = img[prop];
                }
                return value;
            };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));
(function ($) {
    $.fn.extend({
        slider: function (options) {
            var settings = $.extend({
                speed: 500
            },
            options);
            return this.each(function () {
                var scaleNum = 1;
                var slidercontents = $(this).addClass('image-slider-contents');
                var slider = $('<div/>').addClass('image-slider').attr('id', slidercontents.attr('id'));
                var backbutton = $('<div/>').addClass('image-slider-back');
                var bigImg = $('<div/>').addClass('bigImg');
                var smallImg = $('<div/>').addClass('smallImg');
                var cancelImg = $('<div/>').addClass('cancelImg');
                var forwardbutton = $('<div/>').addClass('image-slider-forward');
                slidercontents.removeAttr('id');
                slidercontents.before(slider);
                slider.append(bigImg);
                slider.append(smallImg);
                slider.append(cancelImg);
                slider.append(backbutton);
                slider.append(slidercontents);
                slider.append(forwardbutton);
                var total = $('> div', slidercontents).length;
                var left = 0;
                var w;
                var width;
                var maxScroll;
                slider.append($('<div/>').css('display', 'none').addClass('preview').append($('<div/>').addClass('img-large')
                .append($('<div/>').html('&nbsp').click(function (e) {
                    //左
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    var img = $(this).parent().find('img');
                    var index = parseInt(img.attr('class').split(' ').pop());
                    img.removeAttr('class');
                    scaleNum = 1;
                    if (index > 1) {
                        index--;
                        var src = $('.' + index + ' div img').attr('src');
                        var imgTitle = $('.' + index + ' div img').attr('title');
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).stop(false, true).animate({
                            opacity: 1
                        },
                        1000);
                        $('.imgNum_2').html(index + '/' + total);
                        $('.imgName_2').html(imgTitle);
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).width($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).naturalWidth());
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).height($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).naturalHeight());

                        var imgWidth = parseInt($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).width() / 2);
                        var imgHeight = parseInt($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).height() / 2);
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).css({
                            'position': 'absolute',
                            '-webkit-transform': 'scale(1)',
                            'left': parseInt($(window).width() / 2) + 'px',
                            'top': parseInt($(window).height() / 2) + 'px',
                            'zIndex': 1000,
                            'marginTop': '-' + imgHeight + 'px',
                            'marginLeft': '-' + imgWidth + 'px'
                        });
                    }
                    else
                        $('.preview').find('img').addClass('' + (index) + '');

                    if (index <= 1) {
                        $('.tisi').css({ 'display': 'block' });
                        setTimeout(function () {
                            $('.tisi').css({ 'display': 'none' });
                        }, 1000)
                    }
                }).addClass('left').css('opacity', '0.5').hover(function () {
                    $(this).css('opacity', '1')
                },
                function () {
                    $(this).css('opacity', '0.5')
                }))
                .append($('<div/>').html('&nbsp').click(function (e) {
                    //右
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    var img = $(this).parent().find('img');
                    var index = parseInt(img.attr('class').split(' ').pop());
                    img.removeAttr('class');
                    scaleNum = 1;
                    if (index < total) {
                        index++;
                        var src = $('.' + index + ' div img').attr('src');
                        var imgTitle = $('.' + index + ' div img').attr('title');
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).stop(false, true).animate({
                            opacity: 1
                        },
                        1000);
                        $('.imgNum_2').html(index + '/' + total);
                        $('.imgName_2').html(imgTitle);
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).width($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).naturalWidth());
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).height($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).naturalHeight());

                        var imgWidth2 = parseInt($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).width() / 2);
                        var imgHeight2 = parseInt($('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).height() / 2)
                        $('.preview').find('img').addClass('' + (index) + '').css('opacity', '0').attr('src', src).css({
                            'position': 'absolute',
                            '-webkit-transform': 'scale(1)',
                            '-moz-transform': 'scale(1)',
                            '-o-transform': 'scale(1)',
                            'transform': 'scale(1)',
                            'left': parseInt($(window).width() / 2) + 'px',
                            'top': parseInt($(window).height() / 2) + 'px',
                            'zIndex': 1000,
                            'marginLeft': '-' + imgWidth2 + 'px',
                            'marginTop': '-' + imgHeight2 + 'px'
                        });
                    }
                    else
                        $('.preview').find('img').addClass('' + (index) + '')
                    if (index >= total) {
                        $('.tisiLast').css({ 'display': 'block' });
                        setTimeout(function () {
                            $('.tisiLast').css({ 'display': 'none' });
                        }, 1000)
                    }

                }).addClass('right').css('opacity', '0.5').hover(function () {
                    $(this).css('opacity', '1')
                },
                function () {
                    $(this).css('opacity', '0.5')
                }))
                .append($('<img/>'))).append($('<div/>').addClass('label').css({ 'opacity': '0' }))
                .append($('<div/>').addClass('close').click(function (e) {
                    $(this).parent().fadeOut("slow");
                })));
                $('.cancelImg').click(function (e) {
                    //关闭
                    if ($('.preview').css('display') == 'block') {
                        $('.preview').fadeOut("slow");
                        $('.zhezhao').fadeOut("slow");
                        $('.zhezhao_2').fadeOut("slow");
                        $('.bigImg').fadeOut("slow");
                        $('.smallImg').fadeOut("slow");
                        $('.cancelImg').fadeOut("slow");
                        scaleNum = 1;
                    }
                });
                function initialize() {
                    var tempElements = $('> div', slidercontents);
                    var allElements = new Array();
                    tempElements.each(function (index, el) {
                        allElements.push($('<div/>').addClass('' + (index + 1) + '').addClass('outer').append(el));

                    });
                    allElements = $(allElements);
                    $('> div', slidercontents).remove();
                    var wrapper = $('<div/>').addClass('contents-wrapper');
                    allElements.each(function (index, el) {
                        wrapper.append($(el));
                    });
                    slidercontents.append(wrapper);
                    var w = $('.outer:eq(0)', slidercontents).outerWidth() + parseFloat($('.outer:eq(0)', slidercontents).css('margin-left')) + parseFloat($('.outer:eq(0)', slidercontents).css('margin-right'));
                    var width = (total + 1) * w;
                    var maxScroll = width - $('.image-slider-contents').outerWidth();
                    wrapper.css({
                        width: width
                    });
                    $('> div > div', slidercontents).css('display', '');
                    //通用方程
                    function changeImgBig(){
                        var preview = $('.preview');
                        var widthImg = parseInt(preview.find('img').show().width() / 2);
                        var heightImg = parseInt(preview.find('img').show().height() / 2);
                        var widthWindow = parseInt($(window).width() / 2);
                        var heightWindow = parseInt($(window).height() / 2);
                       
                        if (widthImg <= 0) {
                            imgTarget.width("11px");
                        } else if (widthImg > widthWindow) {
                            imgLeft = widthWindow;
                        } else {
                            imgLeft = widthImg;
                        };

                        if (heightImg <= 0) {
                            imgTarget.height("11px");
                        } else if (heightImg > heightWindow) {
                            imgTop = heightWindow;
                        } else {
                            imgTop = heightImg;
                        }
                        
                    }
                    //通用方程结束
                    $('.outer').click(
                    function (e) {
                        //点击放大时
                        $('.zhezhao').css({ 'display': 'block' });
                        $('.zhezhao_2').css({ 'display': 'block' });
                        $('.bigImg').css({ 'display': 'block' });
                        $('.smallImg').css({ 'display': 'block' });
                        $('.cancelImg').css({ 'display': 'block' });
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        var cls = $(this).attr('class').split(' ')[0];
                        index = cls;
                        var p = $(this).find('div');
                        var img = p.find('img').attr('src');
                        var imgTitle = p.find('img').attr('title');
                        var preview = $('.preview');
                        var l = $('.image-slider').width() / 2 - preview.outerWidth() / 2;
                        var t = (p.offset().top - preview.height());
                       
                        t -= t / 2;
                   
                        preview.css({
                            'position': 'fixed',
                            'top': '0px',
                            'left': '0px',
                            'width': $(window).width(),
                            "height": $(window).height(),
                            'zIndex': 1000,
                            'overflow': 'scroll'
                        });

                        preview.find('img').attr('src', img).addClass(cls);
                        preview.find('img').attr('title', imgTitle);
                        preview.find('img').attr('data-scroll', 1);
                        index = preview.find('img').attr('class').split(' ').pop();
                        preview.fadeIn("slow");
                        var widthImg = parseInt(preview.find('img').width() / 2);
                        var heightImg = parseInt(preview.find('img').height() / 2);
                        var widthWindow = parseInt($(window).width() / 2);
                        var heightWindow = parseInt($(window).height() / 2);
                        var imgTarget = preview.find('img');
                        preview.find('img').css({
                            'position': 'absolute',
                            'top': parseInt($(window).height() / 2) + 'px',
                            'left': parseInt($(window).width() / 2) + 'px',
                            'marginTop': '-' + heightImg + 'px',
                            'marginLeft': '-' + widthImg + 'px'
                        })
                        $('.imgNum_2').html(preview.find('img').attr('class').split(' ').pop() + '/' + total);
                        $('.imgName_2').html(preview.find('img').attr('title'));
                    });
                    bigImg.click(function () {
                        
                        var preview = $('.preview');
                        var imgTarget = "";
                        $('.preview').find('img').each(function () {
                            if ($(this).css("opacity") == 1) {
                                var widthImg = parseInt($(this).width() / 2);
                                var heightImg = parseInt($(this).height() / 2);
                                var widthWindow = parseInt($(window).width() / 2);
                                var heightWindow = parseInt($(window).height() / 2);

                                $(this).width($(this).width() * 1.1);
                                $(this).height($(this).height() * 1.1);
                                if (widthImg <= 0) {
                                    imgTarget.width("11px");
                                } else if (widthImg > widthWindow) {
                                    imgLeft = widthWindow;
                                } else {
                                    imgLeft = widthImg;
                                };

                                if (heightImg <= 0) {
                                    imgTarget.height("11px");
                                } else if (heightImg > heightWindow) {
                                    imgTop = heightWindow;
                                } else {
                                    imgTop = heightImg;
                                }
                                $(this).css({
                                    "marginLeft": "-" + imgLeft + "px",
                                    "marginTop": "-" + imgTop + "px"
                                });
                            }
                        })
                       
                        

                    });
                    smallImg.click(function () {
                        var preview = $('.preview');
                        var imgTarget = preview.find('img').show();
                        var widthImg = parseInt(imgTarget.show().width() / 2);
                        var heightImg = parseInt(imgTarget.show().height() / 2);
                        var widthWindow = parseInt($(window).width() / 2);
                        var heightWindow = parseInt($(window).height() / 2);
                        imgTarget.width(imgTarget.width() / 1.1);
                        imgTarget.height(imgTarget.height() / 1.1);
                        changeImgBig()
                        imgTarget.css({
                            "marginLeft": "-" + imgLeft + "px",
                            "marginTop": "-" + imgTop + "px"
                        });

                    });
                    forwardbutton.click(function () {
                        //小右
                        left -= w;
                        if (left + maxScroll >= 0) {
                            $('.contents-wrapper').stop(false, true).animate({
                                left: '-=' + w
                            },
                            settings.speed);
                        }
                        else
                            left += w;
                    });
                    backbutton.click(function () {
                        if (left < 0) {
                            left += w;
                            $('.contents-wrapper').stop(false, true).animate({
                                left: '+=' + w
                            },
                            settings.speed);
                        }
                    });
                }
                initialize();
                function getDimensions(value) {
                    return value + 'px';

                }
            });
        }
    });
})(jQuery);
