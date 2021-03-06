function isIE(t) {
    var e = document.createElement("b");
    return e.innerHTML = "<!--[if IE " + t + "]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length }

function fixedBackToTopPos() {
    var t = $(window).scrollTop(),
        e = $(".footer").offset().top,
        a = e - t - windowHeight;
    if (t > 400) {
        if ($(".back_to_top").fadeIn(), a < 0) {
            var o = t + windowHeight - e + 110;
            $(".back_to_top").css("bottom", o) } else $(".back_to_top").css("bottom", "110px");
        if (ie6) {
            var n = t + 400;
            $(".back_to_top").css("top", n) } } else $(".back_to_top").fadeOut() }

function autoScaleNav() {
    var t, e = $(".head_wrap"),
        a = 0,
        o = 1,
        n = -1,
        i = ($(".main").not(".main_index"), $(".sub_sidebar")),
        s = function() { e.removeClass("head_wrap_shrink").addClass("head_wrap_expand"), i.removeClass("head_change"), e.unbind() },
        r = function() { e.addClass("head_wrap_shrink"), i.hasClass("head_change") || i.addClass("head_change"), e.hover(function() { $(this).removeClass("head_wrap_shrink").addClass("blue") }, function() { $(this).addClass("head_wrap_shrink").removeClass("blue") }) },
        c = 0;
    $(window).scroll(function(e) {
        var i = $(this).scrollTop();
        t && clearTimeout(t), t = setTimeout(function() { i > 0 ? a != o && (a = o, r()) : a != n && (a = n, s()), c = i }, 50) }) }

function weixinLayerEvents() {
    var t = $(".footer_wx_layer");
    $(".tencent_wx").on("click", function(e) { t.fadeIn(300), e.stopPropagation() }), $(document).on("click", function(t) { $(".footer_wx_layer").fadeOut(300) }), $(".footer_wx_layer").on("click", function(t) { t.stopPropagation() }), $(".account_close").on("click", function() { t.stop().fadeOut(300) }) }

function vistaLayerEvents() {
    var t = $(".footer_vista_layer"),
        e = $(".footer_wx_layer");
    t.hover(function() { $(this).addClass("hover") }, function() { $(this).removeClass("hover").fadeOut(300) }), e.hover(function() { $(this).addClass("hover") }, function() { $(this).removeClass("hover").fadeOut(300) }), $(".tencent_vista").on("mouseover", function() {
        return t.stop().fadeIn(300), !1 }).on("mouseout", function() { setTimeout(function() { t.hasClass("hover") || t.stop().fadeOut(300) }, 300) }), $(".tencent_wx").on("mouseover", function() {
        return e.stop().fadeIn(300), !1 }).on("mouseout", function() { setTimeout(function() { e.hasClass("hover") || e.stop().fadeOut(300) }, 300) }), $(".vista_close").on("click", function() { t.stop().fadeOut() }) }

function fixedFooterTop() {
    var t = $(window),
        e = $(".main"),
        a = $(".footer"),
        o = t.height(),
        n = a.height(),
        i = a.offset().top,
        s = i - e.height();
    i + n < o && e.css("min-height", o - n - s + "px") }

function addFooterIconHover() {
    var t, e = $(".footer_con_wrap"),
        a = e.find("a");
    a.on("mouseover", function() {
        var e = $(this),
            a = e.find("i");
        a && (t = a.attr("class") + "_on", a.addClass(t)) }).on("mouseout", function() {
        var e = $(this),
            a = e.find("i");
        a && a.removeClass(t) }) }

function backToTop() { $(".back_to_top a").on("click", function() { $("body,html").animate({ scrollTop: 0 }, 500) }) }

function fixMac2x() {
    var t = navigator.platform,
        e = 0 == t.indexOf("Mac"),
        a = bowser.tablet;
    $(document).ready(function() {
        (e || a) && $(".wrap").addClass("wrap_mac") }) }

function locationNav() {
    var t = "",
        e = $(document).height() - $(window).height(),
        a = $(".sub_sidebar_list"),
        o = [];
    $(".sub_sidebar_list a").each(function() { o.push($(this).attr("href")) }), $(window).scroll(function() {
        for (var n = $(document).scrollTop(), i = 0; i < o.length; i++) {
            var s = o[i],
                r = $(s).offset().top;
            n > r - 300 && (t = s), $(window).scrollTop() == e && (t = o[o.length - 1]) }
        var c = a.find(".current");
        t && c.find("a").attr("href") != t && (c.removeClass("current"), a.find("[href=" + t + "]").parent().addClass("current"));
        var l = a.find("[href=" + t + "]").parent().position().top - 1;
        $(".cover_layer").stop().animate({ top: l }, 200), leftnavfix();topZero () }), $(".sub_sidebar_list a").on("click", function() { event && event.preventDefault ? event.preventDefault() : window.event.returnValue = !1;
        var t = $(this).attr("href"),
            e = $(t).offset().top - 60;
        $("html, body").stop().animate({ scrollTop: e }, 400) }) }

function yearNow() {
    var t = (new Date).getFullYear();
    $(".footyear").html(t) }

function leftnavfix() {
    var t = $(".footer")[0].getBoundingClientRect().top,
        e = $(".sub_sidebar").height();
    t - 66 < e ? $(".sub_sidebar").addClass("foot_change") : $(".sub_sidebar").removeClass("foot_change") }
var fixedPosTop = 105,
    mainMarginBottom = 70,
    anchorOffset = 80,
    windowHeight = $(window).height(),
    arr = [],
    ie6 = !!window.ActiveXObject && !window.XMLHttpRequest,
    lastScrollTop = $(window).scrollTop();
$(function() {
    var t = isIE(5) || isIE(6) || isIE(7);
    t ? ($(".head_wrap").css("position", "relative"), $(".main").css("margin-top", "15px")) : autoScaleNav(), fixedBackToTopPos(), weixinLayerEvents(), vistaLayerEvents(), addFooterIconHover(), backToTop(), fixedFooterTop(), $(window).resize(function() { windowHeight = $(window).height(), fixedFooterTop(), leftnavfix() }), $(window).scroll(function() { fixedBackToTopPos(), $(".sub_sidebar").length && isIE(7) && ($(window).scrollTop() > 85 ? $(".sub_sidebar").stop().animate({ top: "30px" }, 200) : $(".sub_sidebar").stop().animate({ top: "105px" }, 200)) }), $(".sub_sidebar").length && (leftnavfix(), locationNav()), yearNow() });


function topZero (){
    $(window).scroll(function(){
            if($(window).scrollTop() == 0){
                // $('.cover_layer').css({'top':'0px!important','background':'red'});
                $(".cover_layer").stop().animate({ top: '0px!important' }, 200)
            }
        });
}