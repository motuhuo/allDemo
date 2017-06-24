var logPos = location.search == "?log";

var _protoHash = location.hash;
//显示loading前
function imagePreLoad() {

}
//现在正在加载。应该返回设置进度的函数
var startLoadingTime;
function imageLoading() {
    //todo:loading需要的图片加载完成，可以做一些准备工作了，比如预定义帧动画
    var act;
    actionUrl.invoke("loading", 0, function (a) { act = a; });
    return function (n, i) { if (act && act.progress) act.progress(n, i); };
}

//360度旋转
jMove.keyframes().add("i_split_l", {//向下的示意动画
    from: { transform: 'translate(-30px,0px)', opacity: 0 },
    '5%': { transform: 'translate(-30px,0px)', opacity: 0 },
    '40%': { transform: 'translate(0px,0px)', opacity: 1 },
    '67%': { transform: 'translate(0px,0px)', opacity: 0 },
    to: { transform: 'translate(0px,0px)', opacity: 0 }
}).add("i_split_r", {//向下的示意动画
    from: { transform: 'translate(30px,0px)', opacity: 0 },
    '5%': { transform: 'translate(30px,0px)', opacity: 0 },
    '40%': { transform: 'translate(0px,0px)', opacity: 1 },
    '67%': { transform: 'translate(0px,0px)', opacity: 0 },
    to: { transform: 'translate(0px,0px)', opacity: 0 }
}).add("i_zoom_l", {//向下的示意动画
    from: { transform: 'translate(0px,0px)', opacity: 0 },
    '5%': { transform: 'translate(0px,0px)', opacity: 0 },
    '40%': { transform: 'translate(-15px,5px)', opacity: 1 },
    '67%': { transform: 'translate(-15px,5px)', opacity: 0 },
    to: { transform: 'translate(-15px,5px)', opacity: 0 }
}).add("i_zoom_r", {//向下的示意动画
    from: { transform: 'translate(0px,0px)', opacity: 0 },
    '5%': { transform: 'translate(0px,0px)', opacity: 0 },
    '40%': { transform: 'translate(15px,-5px)', opacity: 1 },
    '67%': { transform: 'translate(15px,-5px)', opacity: 0 },
    to: { transform: 'translate(15px,-5px)', opacity: 0 }
}).flush();


var isFirst = true;
$("#rotate").hide();
var isImageLoaded = false;
var orientationValue = 0;
window.addEventListener('orientationchange', function (e) {
    if (isImageLoaded) orientationChange();
}, false);
//加载完成
function imageLoaded() {
    image("oth/rotate.png", 1).anchor(anchor().appendTo($("#rotate")));
    orientationChange();
    setResize(orientationChange);
    isImageLoaded = true;
    //todo:图片加载完成，可以做一些准备工作了，比如预定义帧动画
    //显示主界面
    //if (/^#360\/[^\/]+\/[^\/]+$/.test(_protoHash)) actionUrl.invoke(_protoHash.substr(1, _protoHash.length - 1));
    //else
    actionUrl.invoke("index");
}

$(function () {
    //对图片进行分组
    var preLoadImages/*在正在加载前需要加载的图片*/ = [], onloadImages/*正在加载时显示的图片*/ = [], loadedImages/*正文需要的图片*/ = [], delayLoadImages/*延时加载的图片*/ = [];
    for (var u1 in loadingImages) {
        var isize = loadingImages[u1];
        var url1 = u1;
        if (typeof (isize) == "string") {
            url1 = [u1, isize];
        }
        else if (isize) resourceSize[u1] = [isize[0], isize[1]];
        if (!u1.indexOf("pre/")) preLoadImages.push(url1);
        else if (!u1.indexOf("load/")) onloadImages.push(url1);
        else if (!u1.indexOf("delay/")) delayLoadImages.push(url1);
        else if (u1.indexOf("ig")) loadedImages.push(url1); //ig目录的图片将被忽略
    }
    //分4步加载图片
    loadResources(preLoadImages, function (n1, i1) {
        if (n1 != i1) return;
        var loading1 = imagePreLoad();
        loadResources(onloadImages, function (n2, i2) {
            if (loading1) loading1(n2, i2);
            if (n2 != i2) return;
            var loading = imageLoading();
            loadResources(loadedImages, function (n3, i3) {
                if (loading) loading(n3, i3);
                if (n3 != i3) return;
                imageLoaded();
                if (delayLoadImages.length) loadResources(delayLoadImages, function () { });
            });
        });
    });
});


jAction.prototype.root = function () {
    var ele = group(1).css({
        overflow: "hidden",
        width: '100%',
        height: '100%',
        left: '0px',
        top: '0px'
    });
    this.fixed(ele);
    return ele;
};

//弹出层
function popLayer(act, op) {
    var r1 = act.root().css("z-index", 50);
    var bg = act.root().css("background", "rgba(0,0,0," + (op || 0.9) + ")").appendTo(r1);
    var isclosing = false;
    r1.close = function () {
        if (isclosing) return;
        isclosing = true;
        r1.fadeIn(400);
        setTimeout(function () { r1.remove(); }, 400);
        r1.onclose && r1.onclose();
    };
    bg.fadeIn();
    r1.appendTo($("#cmain"));
    return r1;
};

var allCache = {};
supportEvents(allCache);

function createHotPoint(o) {
    var img = imageBox(o.icon || "oth/dot.png", 1).css({
        cursor: "pointer"
    });
    if (o.click) img.click(function () {
        o.click();
    });

    if (o.animate != false) {
        var ani1 = dirCanvasFrames("icon_loop/");
        var ani1_ele = _setAbsType($(ani1._element), 1).width(ani1._element.width).height(ani1._element.height).appendTo(img).center(img.width()).middle(img.height());
        ani1.run(0, 30);

        jMove.matrix().scale(2).flush(ani1_ele);
        img._animate = ani1;
    }
    return img;
}

//url管理
var actionUrl = new jActionUrl(function () {
    var root = $("#cmain");

    var loading = function (act) {
        //*显示预加载进度
        var prolabel = group(1).css({
            width: wWidth,
            fontSize: '28px',
            color: '#fff',
            textAlign: "center",
            height: '48px',
            lineHeight: '48px',
            bottom: "-50px"
        });

        act.anchor(prolabel);

        var t = {};
        //显示进度
        t.progress = function (n, i) {
            prolabel.html((n ? Math.round(i * 100 / n) : 100) + "<span style='font-size:18px'>%</span>");
        };
        t.progress(1, 0);
        //*/
        t.view = prolabel;
        return t;
    };

    //加载界面
    this.addAction("loading", function () {
        var r1 = this.root();
        var pr = loading(this);
        pr.view.appendTo(r1);
        this.progress = pr.progress;
        return r1;
    });

    this.addAction("index", function () {
        trackPage("Entrance");
        var r1 = this.root();
        var box = group(1).width(1136).height(550).appendTo(r1);
        this.anchor(box);
        this.resize(function (w, h) {
            jMove.matrix().scale(h / 550).flush(box);
        });
        var img1 = image("oth/index-top.jpg", 1).center(box.width()).top(0).appendTo(box);
        var img2 = imageBox("oth/index-text.png", 1).left(45).bottom(10).appendTo(box);
        jMove.matrix().scale(0.5).flush(img2.children());
        jMove.css(img2.children(), {
            'transform-origin': '0 0'
        });
        var link = group(1, 'a').width(320).height(100).left(375).top(195).appendTo(img2).click(function () {
            trackEvent("Entrance_Click");
            //actionUrl.invoke("360/01/help");
            actionUrl.invoke("360/01/help");
        }).attr("href", "javascript:;");
        img2.width(1046).height(330);

        var img3 = createHotPoint({});
        img3.center(link.width()).top(5).appendTo(link);
        this.on("remove", function () {
            img3._animate.stop();
        });

        jPre.fadeIn(img1);
        jPre.fadeIn(img2, 0.1);

        return r1;
    });

    var create360ImageView = function (imgs, r1, me360, act) {
        var ani = dirCanvasFrames(imgs, act != "r360");
        var ele = _setAbsType($(ani._element), 1).width(ani._element.width).height(ani._element.height).appendTo(r1);
        me360.anchor(ele);
        //todo: 
        //ani.run(0, 12);

        var ismoving = false, cacheIndex = 0;
        panTo(r1, {
            down: function (x) {
                ismoving = true;
                cacheIndex = ani.frameIndex();
                if (act == "180") {
                    var len1 = (ani.allFrames() - 1) / 2;
                    if (cacheIndex > len1) cacheIndex -= ani.allFrames();
                }
                ani.pause(true);
            },
            move: function (dx, x) {
                if (!ismoving) return;
                var idx = (cacheIndex + Math.round(dx.deltaX / 15));
                if (act == "180") {
                    var len1 = (ani.allFrames() - 1) / 2;
                    if (idx < -len1) idx = -len1;
                    else if (idx > len1) idx = len1;
                }
                else idx %= ani.allFrames();
                if (idx < 0) idx += ani.allFrames();
                ani.setFrame(idx);
            },
            up: function () {
                ismoving = false;
                ani.pause(false);
            }
        });

        var ico1 = image("oth/icon_360.png", 1).appendTo(r1);
        me360.anchor(ico1, 0.9);

        return ani;
    };

    var createSplitImageView = function (imgs, r1, me360) {
        var img1 = image(imgs[0], 1);
        var img2 = image(imgs[1], 1);
        var w1 = Math.max(img1.width(), img2.width());
        var h1 = Math.max(img1.height(), img2.height());

        var line = image("oth/split_bar.png", 1);
        var btm1 = image("oth/split_line.png", 1).left(0).bottom(2);
        var box = group(1).width(btm1.width()).height(line.height()).appendTo(r1);
        btm1.appendTo(box);
        me360.anchor(box);

        var left1 = (box.width() - img1.width()) / 2;
        var right2 = (box.width() - img2.width()) / 2;
        var box1 = group(1).width(img1.width()).height(img1.height()).left(left1).top((h1 - img1.height()) / 2).appendTo(box);
        var box2 = group(1).width(0).height(img2.height()).right(right2).top((h1 - img2.height()) / 2).appendTo(box);

        line.left(box.width() - 40 - line.width() / 2).top(0);
        line.appendTo(box);

        img1.left(0).top(0).appendTo(box1.css("overflow", "hidden"));
        img2.right(0).top(0).appendTo(box2.css("overflow", "hidden"));

        var ico1 = imageBox("oth/icon_split.png", 1).appendTo(r1);
        var ico1l = image("oth/icon_split_l.png", 1).left(0).top(18).appendTo(ico1);
        var ico1r = image("oth/icon_split_r.png", 1).right(0).top(18).appendTo(ico1);
        jMove.animation(ico1l, "i_split_r 1s linear 0s infinite");
        jMove.animation(ico1r, "i_split_l 1s linear 0s infinite");
        me360.anchor(ico1, 0.9);

        var ismoving = false;
        panTo(r1, {
            down: function (x) {
                ismoving = true;
                this.move(null, x);
            },
            move: function (dx, x) {
                if (!ismoving) return;
                var p = box[0];
                var l1 = 0;
                while (p) {
                    l1 += p.offsetLeft;
                    p = p.offsetParent;
                }
                var l2 = Math.max(40, Math.min(box.width() - 20, x.x - l1));
                line.left(l2 - line.width() / 2);

                box1.width(Math.max(0, Math.min(img1.width(), Math.floor(l2 - left1))));
                box2.width(Math.max(0, Math.min(img1.width(), Math.floor(box.width() - right2 - l2))));
            },
            up: function () {
                ismoving = false;
            }
        });
    };

    var createListImageView = function (imgs, r1, me360, trackKey) {
        var router = new jActionUrl(function () {

            var index = 0;
            this.onnew = function (idx) {
                index = parseInt(idx);
                var bx = this.root();
                var ig = image(imgs[index], 1).appendTo(bx);
                this.anchor(ig);
                var scx = wWidth * 0.4, scy = wHeight * 0.6;
                var moveScale = Math.min(scx / ig.width(), scy / ig.height());
                var mcscale = Math.min(1, moveScale);
                if (mcscale != 1) jMove.matrix().scale(mcscale).flush(ig);
                var minScale = mcscale;

                if (imgs.length > 1) {
                    return bx;
                }


                var touchX, touchY, touchX2, touchY2, towTouch = false;
                bx[0].addEventListener('touchstart', function (event) {
                    //event.preventDefault();

                    var touch = event.touches[0];

                    touchX = touch.screenX;
                    touchY = touch.screenY;

                    if (event.touches.length > 1) {
                        touch = event.touches[1];
                        touchX2 = touch.screenX;
                        touchY2 = touch.screenY;
                        towTouch = true;
                    } else if (towTouch) towTouch = false;
                }, false);

                bx.on("mousedown", function (e1) {
                    touchX = e1.pageX;
                    touchY = e1.pageY;
                    ismousedown = true;
                    e1.preventDefault();

                    var mmove = function (e) {
                        e.preventDefault();
                        var dl = (e.pageX - touchX) / wScale;
                        var dt = (e.pageY - touchY) / wScale;
                        mcx += dl / mcscale;
                        mcy += dt / mcscale;
                        seteffect();
                        touchX = e.pageX;
                        touchY = e.pageY;
                    };
                    var doc = $(document.body);
                    var mup = function (e) {
                        doc.off("mousemove", mmove);
                        doc.off("mouseup", mup);
                    };
                    doc.on("mousemove", mmove);
                    doc.on("mouseup", mup);
                });
                bx[0].addEventListener("mousewheel", function (event) {
                    mcscale *= event.wheelDeltaY < 0 ? 1.1 : 1 / 1.1;
                    seteffect();

                }, false);

                bx[0].addEventListener('touchmove', function (event) {
                    event.preventDefault();

                    var touch = event.touches[0];

                    if (!towTouch && event.touches.length == 1) {
                        var dl = (touch.screenX - touchX) / wScale;
                        var dt = (touch.screenY - touchY) / wScale;

                        mcx += dl / mcscale;
                        mcy += dt / mcscale;

                        seteffect();
                    } else if (event.touches.length == 2) {
                        var touch2 = event.touches[1];

                        var lds = Math.sqrt(Math.pow(touch2.screenX - touch.screenX, 2) + Math.pow(touch2.screenY - touch.screenY, 2));
                        var nds = Math.sqrt(Math.pow(touchX2 - touchX, 2) + Math.pow(touchY2 - touchY, 2));
                        mcscale *= lds / nds;
                        seteffect();

                        touchX2 = touch2.screenX;
                        touchY2 = touch2.screenY;
                    }
                    touchX = touch.screenX;
                    touchY = touch.screenY;
                }, false);

                var mcx = 0, mcy = 0;

                var initScale = 1;

                //var div1 = group(1).css("z-index", 1000).css("font-size", "32px").css("line-height", "66px").appendTo(bx);
                var seteffect = function () {
                    if (mcscale > 4) {
                        mcscale = 4;
                    }
                    if (mcscale < minScale) {
                        mcscale = minScale;
                    }
                    if (mcscale <= moveScale) {
                        mcx = mcy = 0;
                    } else {
                        var ow = ig.width() * mcscale;
                        var oh = ig.height() * mcscale;

                        if (ow <= scx) {
                            mcx = 0;
                        } else {
                            var mxv = (ow - scx) / 2 / mcscale;
                            if (mcx > mxv) mcx = mxv;
                            else if (mcx < -mxv) mcx = -mxv;
                        }

                        if (oh <= scy) {
                            mcy = 0;
                        } else {
                            var mxv = (oh - scy) / 2 / mcscale;
                            if (mcy > mxv) mcy = mxv;
                            else if (mcy < -mxv) mcy = -mxv;
                        }
                    }

                    jMove.matrix().scale(mcscale).translate(mcx, mcy).flush(ig);
                };

                return bx;
            };


            if (imgs.length > 1) {
                var dotlist = group(1).css({
                    width: '100%',
                    left: '0px',
                    bottom: '50px',
                    textAlign: 'center',
                    zIndex: 100
                }).appendTo(r1);
                var createDot = function (i) {
                    var dot = group().width(8).height(8).css({
                        borderRadius: '4px',
                        background: '#fff',
                        display: 'inline-block',
                        margin: '0px 8px',
                        opacity: i == 0 ? 1 : 0.5,
                        cursor: 'pointer'
                    }).appendTo(dotlist);
                    dot.click(function () {
                        play1(i);
                    });
                };
                for (var i = 0; i < imgs.length; ++i) {
                    createDot(i);
                }
                var play1 = function (idx) {
                    var ease = jActionUrl.fromRight;
                    if (idx < index) ease = jActionUrl.fromLeft;

                    if (idx < 0) idx = imgs.length - 1;
                    else if (idx >= imgs.length) idx = 0;

                    var as1 = dotlist.children();
                    as1.css("opacity", 0.5);
                    $(as1[idx]).css("opacity", 1);

                    router.invoke(idx.toString(), ease);
                };
                var larr = alink("oth/larr.png", 1).anchor(anchor(0.5, 0.05).css('z-index', '100').appendTo(r1), 0).click(function () {
                    play1(index - 1);
                    trackEvent("Room_" + trackKey + "_Click");
                });
                var rarr = alink("oth/rarr.png", 1).anchor(anchor(0.5, 0.95).css('z-index', '100').appendTo(r1), 1).click(function () {
                    play1(index + 1);
                    trackEvent("Room_" + trackKey + "_Click");
                });
                panTo(r1, {
                    left: function () {
                        play1(index - 1);
                    },
                    right: function () {
                        play1(index + 1);
                    }
                });
            } else {
                var ico1 = imageBox("oth/icon_zoom.png", 1).appendTo(r1);
                var ico1l = image("oth/icon_zoom_l.png", 1).left(0).top(23).appendTo(ico1);
                var ico1r = image("oth/icon_zoom_r.png", 1).right(0).top(0).appendTo(ico1);
                jMove.animation(ico1l, "i_zoom_l 1s linear 0s infinite");
                jMove.animation(ico1r, "i_zoom_r 1s linear 0s infinite");
                me360.anchor(ico1, 0.9);
            }

            return r1;
        });

        router.invoke('0');
    };

    var current360;
    var popProduct = function (uk, k, pano, trackKey) {
        var initpano1 = function () {
            if (!pano) return;
            pano.stopOrient();
            $(pano.element).css("-webkit-filter", "blur(5px)");
        };
        initpano1();

        var box = this.root().css({
            background: "rgba(0,0,0,0.6)",
            zIndex: '1000'
        }).appendTo(uk);
        var pr = loading(this);
        pr.view.appendTo(box);
        var me360 = this;

        var imgs = getDirImages("ig/" + k + "/");

        var re111 = false;
        var remove1 = function () {
            re111 = true;
            if (sload == window.loadProduct) window.loadProduct = nothing;
            imgs.forEach(function (o) {
                delete resourceMap[o];
            });
            var elex = $(pano.element);
            elex.css("-webkit-filter", "");
        };

        //创建产品信息
        var create360 = function () {
            var view = group(1).css("overflow", "hidden");
            me360.fixed(view, 0, 0, 0.45, 0);
            var act = proInfo.type;
            if (act == '360' || act == "r360" || act == "180") {
                var ani = create360ImageView(imgs, view, me360, act);
                me360.onremove = function () {
                    ani.stop();
                    remove1();
                };
            } else if (act == 'split') {
                createSplitImageView(imgs, view, me360);
            } else {
                createListImageView(imgs, view, me360, trackKey);
            }

            view.appendTo(box).fadeIn();
        };

        var proInfo;
        loadResources(imgs, function (i, o) {
            if (i == o) {
                if (re111) return remove1();
                if (proInfo) sload(proInfo);
                else proInfo = true;
                return;
            }
            pr.progress(i, o);
        });
        me360.onremove = remove1;

        var resizeId1;
        var sload = function (pro) {
            if (proInfo) {
                proInfo = pro;
                //已加载产品信息
                var info = $('<div style="display:table-cell; vertical-align: middle;">\
                <div style="overflow: auto;">\
                    <div>\
                        <h1 style="margin:0px;font-size: 32px; line-height: 48px;">'+ pro.title + '</h1>\
                    </div>\
                </div>\
            </div>');
                var infop = info.children();
                var infobx = infop.children();
                if (pro.lines) pro.lines.forEach(function (o) {
                    infobx.append(group().css({
                        paddingTop: '20px',
                        fontSize: '24px',
                        lineHeight: '31px'
                    }).html(o));
                });
                if (pro.audio) {
                    var ae;
                    infobx.append(group(0, 'a').css({
                        marginTop: '20px',
                        paddingLeft: '40px',
                        fontSize: '22px',
                        lineHeight: '28px',
                        background: 'url(' + createUrl("oth/voice.png") + ') no-repeat left center',
                        color: "#aaa",
                        display: 'block'
                    }).html("点击聆听语音介绍").attr("href", "javascript:;").click(function () {
                        trackEvent("Room_" + trackKey + "_Click");
                        if (ae) {
                            if (ae.paused || ae.ended) ae.play();
                            else ae.pause();
                            //ae = null;
                        } else {
                            ae = playAudio1(pro.audio, pro.audio_id, trackKey);
                        }
                    }));
                    me360.on("remove", function () {
                        if (ae) {
                            ae.pause();
                            ae.src = null;
                        }
                    });
                }
                if (pro.lines2) pro.lines2.forEach(function (o) {
                    infobx.append(group().css({
                        paddingTop: '20px',
                        fontSize: '24px',
                        lineHeight: '31px'
                    }).html(o));
                });
                if (pro.copy) {
                    infobx.append(group().css({
                        paddingTop: '20px',
                        fontSize: '18px',
                        lineHeight: '24px'
                    }).html(pro.copy));
                }
                var text = $('<div style="position:absolute;top:50px;right:20px;bottom:150px;left:50px; overflow: hidden; color: #fff;"></div>').append($('<div style="display:table;width:100%;height:100%;position:absolute;"></div>').append(info)).appendTo(right1);
                resizeId1 = me360.fixed(text, '50', '50', '70', '50');

                //var shareBtn = alink("oth/share.png", 1).left(50).bottom(50).appendTo(right1);
                var scPos;
                var refreshMask1 = function () {
                    if (infobx.height() > text.height()) {
                        if (scPos && scPos[0] >= scPos[1]) text.css("-webkit-mask", "none");
                        else text.css("-webkit-mask", "-webkit-gradient(linear, left 80%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))");
                    } else text.css("-webkit-mask", "none");
                };
                var sc = createScrollY(infobx, {
                    maxHeight: text.height(),
                    onproccess: function (procc, allp) {
                        scPos = [procc, allp];
                        refreshMask1();
                    }
                });


                var cid = me360.resize(function (w, h) {
                    //infop.css("max-height", text.height() + "px");
                    sc.refresh({
                        maxHeight: text.height()
                    });
                    refreshMask1();
                });

                pr.view.remove();
                create360();
            }
            proInfo = pro;
        };

        var right1 = group(1).css("overflow", "hidden").appendTo(box);
        me360.fixed(right1, 0.55);

        var cache1 = window.current_Objects;
        if (cache1 && cache1[k]) sload(cache1[k]);
        else {
            //alert("obj_loaded event reg")
            var me1 = this;
            var clear33 = function () {
                allCache.off('obj_loaded', loaded2);
                me1.off("remove", clear33);
            };
            var loaded2 = function (cache2, pano2) {
                if ((cache2 && cache2[k]) || {
                    title: ''
                }) sload(cache2[k]);
                clear33();
                pano = pano2;
                initpano1();
            };
            allCache.on('obj_loaded', loaded2);
            this.on("remove", clear33);
        }

        var close = alink("oth/close2.png", 1).right(20).top(20).css("z-index", 20).appendTo(box).click(function () {
            if (resizeId1) me360.clearResize(resizeId1);
            pano && pano.startOrient();
            if (proInfo && proInfo != true && proInfo.show) actionUrl.invoke("360/" + current360 + "/list/" + proInfo.show);
            else actionUrl.invoke("360/" + current360);
            if (pano) {
                var elex = $(pano.element);
                createFrameSteps(function (p) {
                    elex.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
                }, 0.5);
            }
        });
        return box;
    };

    this.addAction("360", function () {
        var box1 = this.root().appendTo(root);

        var mapData = {
            '01': [[342, 244, 95, 70], ['08', 62, 25]], //序厅
            '02': [[438, 214, 236, 100, 577, 116, 97, 98], ['09', 80, 9], [515, 270]], //风格历程
            '05': [[449, 12, 88, 201, 398, 12, 51, 101, 537, 116, 39, 97], ['06', 70, 1]], //对话五洲
            '08-2': [[340, 12, 57, 101], ['05', 63, 1]], //岁月见证
            '08': [[342, 114, 106, 100], ['07', 63, 9]], //神秘计时
            '10': [[10, 12, 329, 101], ['01', 14, 1]], //自然主义(川博)
            '11': [[10, 114, 161, 64], ['02', 7, 9]], //巧做天工
            '09': [[172, 114, 169, 64], ['03', 35, 9]], //自然主义
            '12': [[77, 178, 197, 31], ['04', 16, 16]] //环球之旅
        };

        var mapPos = {
            '01': [387, 270, 72, 31],
            '02': [515, 275, 95, 28],
            '03': [628, 270, 117, 29],
            '04': [628, 173, 109, 15],
            '05': [540, 173, 95, 16],
            '06': [493, 123, 85, 10],
            '07': [470, 58, 79, 4],
            '08': [368, 122, 67, 10],
            '09': [310, 151, 49, 12],
            '10': [116, 75, 38, 5],
            '11': [138, 151, 24, 12],
            '12': [222, 200, 33, 17]
        };

        var mapIn = {
            "03": "02",
            "04": "05",
            "06": "05",
            "07": "05"
        };

        var mapRewrite = {
            '08-2': {
                key: '08',
                rewrite: {
                    start: [-20.6, -2.8, 60],
                }
            }
        };

        var map2 = imageBox('oth/map_bg.png', 2);
        map2.children().css("z-index", 10).css("position", 'relative');
        var closeBigMap = function (end) {
            if (isCoverMoving) return;
            isCoverMoving = true;
            var pos = map1ScalePos();
            jMove.to(map2, 0.5, { transform: jMove.matrix().rotateX(pos[3]).toString() });
            jMove.to(map1, 0.5, { transform: jMove.matrix().translate(pos[0], pos[1]).scale(pos[2], pos[2]).toString() });
            jPre.opacityOut(mapCover1, 0, 0.5);
            setTimeout(function () {
                mapCover1.remove();
                mapCover1 = null;
                isCoverMoving = false;
                mpicon.show();
                map1.hide();
                end && end();
            }, 500);
            createFrameSteps(function (p) {
                if (currentPano) currentPano.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
            }, 0.5);
        };

        var mpicon = imageBox("oth/map_min.png", 1).left(10).top(10);
        var mpbox = group(1).width(mpicon.width()).height(mpicon.height()).left(40).top(40).appendTo(box1);
        mpbox.append(mpicon);
        var map1 = group(1).width(map2.width()).height(map2.height()).appendTo(mpbox);
        map2.appendTo(map1);
        map1.hide();


        var createMapIx = function (kx) {
            var ar1 = mapData[kx][0];
            var ar1v = null, ar1w = null;
            for (var i = 0; i < ar1.length - 3; i += 4) {
                var xi, yi;
                if (!ar1v) {
                    yi = group(1, 'a').attr("href", "javascript:;");
                }
                else {
                    yi = group(1, 'span');
                }
                xi = group(1, 'span');
                xi.width(ar1[i + 2]).height(ar1[i + 3]).css({
                    background: 'rgba(0,0,0,0)',
                    zIndex: 20
                });
                yi.width(ar1[i + 2]).height(ar1[i + 3]).css({
                    background: 'rgba(0,0,0,0)',
                    zIndex: 20
                });
                if (!ar1v) {
                    ar1v = xi.left(ar1[i + 0]).top(ar1[i + 1]).appendTo(map2);
                    ar1w = yi.left(ar1[i + 0]).top(ar1[i + 1]).appendTo(map2);
                }
                else {
                    xi.left(ar1[i] - ar1[0]).top(ar1[i + 1] - ar1[1]).appendTo(ar1v);
                    yi.left(ar1[i] - ar1[0]).top(ar1[i + 1] - ar1[1]).appendTo(ar1w);
                }
            }
            mapData[kx][0] = ar1v;
            ar1w.click(function () {
                closeBigMap(function () {
                    //todo: delete
                    //if (kx != '01' && kx != '05' && kx != '04' && kx != '12') return alert("敬请期待");
                    actionUrl.invoke("360/" + kx);
                });
            });

            var ar2 = mapData[kx][1];
            var ar2img = image("oth/map/" + ar2[0] + ".png", 1).left(ar2[1]).top(ar2[2]).hide().appendTo(mpicon);
            mapData[kx][1] = ar2img;
        };
        for (var kx in mapData) createMapIx(kx);
        var mposico = image("oth/loc.png", 1).css("z-index", 50).appendTo(map2);
        jMove.matrix().translate('-50%', '-100%').flush(mposico);
        var mposm = image("oth/loc_min.png", 1).css("z-index", 50).appendTo(mpicon);
        jMove.matrix().translate('-50%', '-80%').flush(mposm);

        jMove.css(map1, {
            transformStyle: 'preserve-3d',
            perspective: map1.height() * 1.1 + "px",
        });
        jMove.css(mpbox, {
            zIndex: 50,
            cursor: 'pointer'
        });

        var map1ScalePos = function () {
            return [
                mpbox.width() / 2 - (wWidth / 2 - parseFloat(mpbox.left())),
                mpbox.height() / 2 - (wHeight / 2 - parseFloat(mpbox.top())),
                mpbox.width() / map1.width() * 0.8,
                45
            ];
        };

        var resizeMap1 = function () {
            var pos = map1ScalePos();
            jMove.matrix().translate(pos[0], pos[1]).scale(pos[2], pos[2]).flush(map1);
            jMove.matrix().rotateX(pos[3]).flush(map2);
        };

        this.resize(function () {
            map1.left(wWidth / 2 - map1.width() / 2 - parseFloat(mpbox.left()))
                .top(wHeight / 2 - map1.height() / 2 - parseFloat(mpbox.top()));
            resizeMap1();
        });

        var root360 = this;
        var mapCover1, isCoverMoving = false, currentPano;
        mpicon.click(function () {
            if (isCoverMoving) return;
            isCoverMoving = true;
            if (!mapCover1) {
                mapCover1 = root360.root().css({
                    background: "rgba(0,0,0,0.6)"
                }).appendTo(box1);
                var close = alink("oth/close2.png", 1).right(10).top(10).appendTo(mapCover1).css('z-index', 60).click(function () {
                    closeBigMap();
                });
                jPre.opacityIn(mapCover1, 0, 0.5);
                mpicon.hide();
                map1.show();
                jMove.to(map2, 0.5, { transform: jMove.matrix().rotateX(0).toString() });
                jMove.to(map1, 0.5, { transform: jMove.matrix().translate(0, 0).scale(1, 1).toString() });
                setTimeout(function () {
                    isCoverMoving = false;
                }, 500);

                createFrameSteps(function (p) {
                    if (currentPano) currentPano.css("-webkit-filter", "blur(" + (5 * p) + "px)");
                }, 0.5);
            }
        });


        this.onnew = function (room_key) {
            var k = room_key;
            if (mapRewrite[room_key]) {
                k = mapRewrite[room_key].key;
            }
            var trackKey = (k.charAt(0) == '0' ? k.charAt(1): k);

            trackPage("Room_" + trackKey);
            /**/
            if (current360) {
                var sk = current360;
                if (!(sk in mapData)) sk = mapIn[sk];
                mapData[sk][0].css("background", "rgba(0,0,0,0)").css("z-index", 20);
                mapData[sk][0].children().css("background", "rgba(0,0,0,0)");
                mapData[sk][1].hide();

                var morek = null;
                if (sk == "08") morek = "08-2";
                else if (sk == "08-2") morek = "08";
                if (morek) {
                    mapData[morek][0].css("background", "rgba(0,0,0,0)").css("z-index", 20);
                    mapData[morek][0].children().css("background", "rgba(0,0,0,0)");
                    mapData[morek][1].hide();
                }
            } {
                var sk = room_key;
                if (!(sk in mapData)) sk = mapIn[sk];
                mapData[sk][0].css("background", "rgba(49,26,28,0.72)").css("z-index", 0); //rgba(105,16,16,0.5)
                mapData[sk][0].children().css("background", "rgba(49,26,28,0.72)");
                mapData[sk][1].show();

                var morek = null;
                if (sk == "08") morek = "08-2";
                else if (sk == "08-2") morek = "08";
                if (morek) {
                    mapData[morek][0].css("background", "rgba(49,26,28,0.72)").css("z-index", 0); //rgba(105,16,16,0.5)
                    mapData[morek][0].children().css("background", "rgba(49,26,28,0.72)");
                    mapData[morek][1].show();
                }
            }
            var mpos1 = mapPos[k];
            mposico.left(mpos1[0]).top(mpos1[1]);
            mposm.left(mpos1[2]).top(mpos1[3]);

            current360 = room_key;
            var box = this.root().appendTo(box1);
            currentPano = box;
            var pr = loading(this);
            pr.view.appendTo(box);

            var panoBox = this.root().appendTo(box);

            var loadedRoom, panoEvents = {};
            supportEvents(panoEvents);
            var me360 = this;
            var pano;
            var sload = function (room) {
                if (mapRewrite[room_key] && mapRewrite[room_key].rewrite) {
                    $.extend(room, mapRewrite[room_key].rewrite);
                }
                loadedRoom = room;
                panoEvents.trigger("room_load");
                var sets = room.ui || [
                    '360/' + k + '/right.jpg',
                    '360/' + k + '/left.jpg',
                    '360/' + k + '/top.jpg',
                    '360/' + k + '/bottom.jpg',
                    '360/' + k + '/front.jpg',
                    '360/' + k + '/back.jpg'];


                var re111 = false;
                var remove1 = function () {
                    re111 = true;
                    if (loadedRoom && loadedRoom.onremove) loadedRoom.onremove();
                    if (sload == window.loadRoom) window.loadRoom = nothing;
                    sets.forEach(function (o) {
                        delete resourceMap[o];
                    });
                };
                me360.onremove = remove1;

                //创建房间
                var create360 = function () {
                    var end_sets = [];
                    sets.forEach(function (o) {
                        end_sets.push(resourceMap[o]);
                    });
                    var dpos = room.start || [0, 0, 60];
                    var edpos = dpos;
                    if (!isFirst) {
                        dpos = [dpos[0] - 20, dpos[1], 80];
                    }

                    var hots = [];
                    var clickTimer;
                    if (room.hot) room.hot.forEach(function (h) {
                        var click1 = h.click;
                        h.click = function () {
                            trackEvent("Room_" + trackKey + "_click");
                            if (clickTimer) clearTimeout(clickTimer);
                            if (click1 && click1.call(h) == false) return;

                            var href1 = h.href;
                            if (!href1) return;
                            if (href1.charAt(0) == ".") href1 = "360/" + k + href1.substr(1, href1.length - 1);

                            if (href1.indexOf("360/" + k + "/")) {
                                pano.stopOrient();
                                var tod = h.moveTo || [h.pan, h.tilt];
                                pano.moveTo(tod[0], tod[1], 10, 0.8);
                                clickTimer = setTimeout(function () {
                                    var cover = me360.root().css({
                                        background: "#000",
                                        zIndex: 200
                                    }).hide().appendTo(box);
                                    cover.fadeIn(700);
                                    clickTimer = setTimeout(function () {
                                        clickTimer = 0;
                                        actionUrl.invoke(href1, function (hv, add, remove) {
                                            remove();
                                            add();
                                        });
                                    }, 700);
                                }, 500);
                            } else {
                                actionUrl.invoke(href1);
                            }
                        };
                        hots.push(h);
                    });

                    window.current_Objects = room.obj;
                    /*
                    var createObjLink = function (ko, kv) {
                        hots.push({
                            click: function () {
                                actionUrl.invoke('360/' + k + "/item/" + ko);
                            },
                            pan: kv.pan,
                            tilt: kv.tilt
                        });
                    };
                    window.current_Objects = room.obj;
                    if (room.obj) for (var ko in room.obj) createObjLink(ko, room.obj[ko]);
                    */

                    /*/check
                    var ch1 = {};
                    for (var i in loadingImages) {
                        if (!i.indexOf("ig/")) ch1[i.split('/')[1]] = 1;
                    }
                    for (var ko in ch1) if (!room.obj[ko]) console.log(ko);
                    //*/

                    pano = createPano(me360, end_sets, hots, dpos);
                    panoBox.append(pano.element);
                    me360.onremove = function () {
                        pano.clear();
                        remove1();
                    };

                    if (!isFirst) pano.moveTo(edpos[0], edpos[1], edpos[2], 0.8, undefined, undefined, function () {
                        if (actionUrl._url != "360/" + k) pano.stopOrient();
                    });
                    else {
                        isFirst = false;
                    }

                    allCache.trigger('obj_loaded', room.obj, pano);
                };

                loadResources(sets, function (i, o) {
                    if (i == o) {
                        if (re111) return remove1();
                        pr.view.remove();
                        create360();
                        return;
                    }
                    pr.progress(i, o);
                });
            };
            window.loadRoom = sload;
            $.getScript(createUrl("360/" + k + "/360_" + k + ".js"));

            this.addAction("help", function () {
                pano && pano.stopOrient();

                panoBox.css("-webkit-filter", "blur(5px)");
                var r1x = this.root().css({
                    background: "rgba(0,0,0,0.6)",
                    zIndex: '200'
                }).appendTo(box);
                var icon = image("oth/help_360.png", 1).appendTo(r1x);
                this.anchor(icon);
                this.on("remove", function () {
                    panoBox.css("-webkit-filter", "");
                    pano && pano.startOrient();
                });
                var close1 = function () {
                    if (!noclosing) return;
                    clearTimeout(noclosing);
                    noclosing = 0;
                    createFrameSteps(function (p) {
                        panoBox.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
                    }, 0.5);
                    actionUrl.invoke("360/" + k);
                };
                var noclosing = setOrientTimeout(close1, 3000);
                r1x.click(close1);
                return r1x;
            });

            var showInfo = function (title_key, info_key) {
                pano && pano.stopOrient();

                panoBox.css("-webkit-filter", "blur(5px)");
                var r1x = this.root().css({
                    zIndex: '200'
                }).appendTo(box);

                var r2x = group(1).css({
                    background: "rgba(0,0,0,0.6)"
                }).appendTo(r1x);

                this.fixed(r2x, '100px', '30px', '100px', '30px');

                var tit1 = group(1).css({
                    left: '50px',
                    top: '40px',
                    fontSize: '42px',
                    lineHeight: '62px'
                }).appendTo(r2x).html(loadedRoom && loadedRoom[title_key] || "");

                var tb1 = group(1).appendTo(r2x);

                var tb2 = group().css({
                    fontSize: '24px',
                    lineHeight: '220%'
                }).html(loadedRoom && loadedRoom[info_key] || "").appendTo(tb1);


                var refreshMask1 = function () {
                    if (scPos && scPos[0] >= scPos[1]) tb1.css("-webkit-mask", "none");
                    else tb1.css("-webkit-mask", "-webkit-gradient(linear, left 80%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))");
                };
                var sc = createScrollY(tb2, {
                    onproccess: function (procc, allp) {
                        scPos = [procc, allp];
                        refreshMask1();
                    }
                });
                var scPos;
                this.resize(function () {
                    sc && sc.refresh();
                    //refreshMask1();
                });
                var mexx = this;
                var refreshTit1 = function () {
                    if (!loadedRoom[title_key]) {
                        tit1.remove();
                        mexx.fixed(tb1, '50px', '40px', '70px', '40px');
                    } else {
                        mexx.fixed(tb1, '50px', '120px', '50px', '40px');
                    }
                };
                if (!loadedRoom) panoEvents.on("room_load", function () {
                    tit1.html(loadedRoom[title_key]);
                    tb2.html(loadedRoom[info_key]);
                    refreshTit1();
                    sc.refresh();
                });
                else refreshTit1();

                this.on("remove", function () {
                    panoBox.css("-webkit-filter", "");
                    pano && pano.startOrient();
                    if (loadedRoom && loadedRoom[info_key + "_remove"]) loadedRoom[info_key + "_remove"]();
                });
                var noclosing = true;
                var close1 = function () {
                    if (!noclosing) return;
                    noclosing = 0;
                    createFrameSteps(function (p) {
                        panoBox.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
                    }, 0.5);
                    actionUrl.invoke("360/" + k);
                };
                var close = alink("oth/close2.png", 1).right(10).top(10).css("z-index", 20).appendTo(r2x).click(close1);

                return r1x;
            };
            this.addAction("info", function () {
                return showInfo.call(this, "title", "info");
            });
            this.addAction("info2", function () {
                return showInfo.call(this, "title2", "info2");
            });

            this.addAction("video", function () {
                trackEvent("Youku_Video_View");
                pano && pano.stopOrient();

                panoBox.css("-webkit-filter", "blur(5px)");
                var r1x = this.root().css({
                    zIndex: '200'
                }).appendTo(box);

                var r2x = group(1).css({
                    background: "rgba(0,0,0,0.6)"
                }).appendTo(r1x);
                r2x[0].id = "tempvideo1";

                this.fixed(r2x, '100px', '30px', '100px', '30px');

                this.onnew = function (vid) {
                    r2x.html('');
                    //生成视频播放器
                    if (!window.YKU) return;
                    var player = new YKU.Player('tempvideo1', {
                        client_id: 'd0804b7294e1597a',
                        vid: vid,
                        show_related: false,
                        autoplay: true
                    });
                }

                this.on("remove", function () {
                    panoBox.css("-webkit-filter", "");
                    pano && pano.startOrient();
                });
                var noclosing = true;
                var close1 = function () {
                    if (!noclosing) return;
                    noclosing = 0;
                    createFrameSteps(function (p) {
                        panoBox.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
                    }, 0.5);
                    actionUrl.invoke("360/" + k);
                };
                var close = alink("oth/close2.png", 1).right(10).top(10).css("z-index", 20).appendTo(r1x).click(close1);

                return r1x;
            });

            this.addAction("list", function () {
                pano && pano.stopOrient();

                panoBox.css("-webkit-filter", "blur(5px)");
                var r1x = this.root().css({
                    zIndex: '200',
                    background: 'rgba(0,0,0,0.6)'
                }).appendTo(box);

                this.onnew = function (k1) {
                    var sb1 = group(1).height(300).width(wWidth).left(0).top(wHeight / 2 - 150);
                    this.resize(function (w, h) {
                        sb1.width(w).top(h / 2 - sb1.height() / 2);
                    });

                    var me_list = this;
                    var initroom1 = function () {
                        if (!loadedRoom.obj) return;
                        var kolist = [];
                        for (var sk in loadedRoom.obj) {
                            if (loadedRoom.obj[sk].show == k1) {
                                kolist.push(loadedRoom.obj[sk]);
                                loadedRoom.obj[sk]._key = sk;
                            }
                        }
                        var sp1 = kolist.length / 3;
                        var scview = group(1).height(sb1.height()).top(0).left("10%").width("80%").css('overflow', "hidden").appendTo(sb1);
                        var scvl = group(1).height(sb1.height()).width(sp1 * 100 + "%").left(Math.max(0, 0.5 - sp1 / 2) * 100 + "%").top(0).appendTo(scview);
                        var iw1 = 0.27;
                        var il1 = (1 / 6 - iw1 / 2) / sp1;

                        var idx = 0;
                        kolist.forEach(function (o) {
                            var scvi = group(1, 'a').css({
                                border: '1px solid #9B9C9C',
                                background: 'rgba(0,0,0,0.6)',
                                height: scvl.height() - 2 + "px",
                                top: '0px',
                                width: iw1 / sp1 * 100 + "%",
                                left: (il1 + idx / kolist.length) * 100 + '%'
                            }).appendTo(scvl).attr("href", "javascript:;");
                            var dpre = "ig/" + o._key + "/";
                            var imgs = getDirImages(dpre);
                            if (o.type == "360") imgs = imgs[imgs.length - 1];
                            else imgs = imgs[0];

                            var scvii = imageElement(imgs, 1).appendTo(scvi).left('50%').top('50%');
                            var wh = scvii.width() / scvii.height();
                            jMove.matrix().translate('-50%', '-50%').scale(Math.min(240 / scvii.height(), Math.max(wWidth, wHeight) * 0.8 * 0.9 * iw1 / scvii.width())).flush(scvii);

                            scvi.click(function () {
                                actionUrl.invoke("360/" + k + "/item/" + o._key);
                            });

                            ++idx;
                        });
                        if (kolist.length > 3) {
                            var max1 = kolist.length - 3;
                            var goto1 = function (ix) {
                                if (ix < 0 || ix > max1) {
                                    var to1 = { transform: jMove.matrix().translate((ix < 0 ? -0.2 : max1 + 0.2) / kolist.length * -100 + "%", "0").toString() };
                                    jMove.to(scvl, 0.1, to1, function () {
                                        jMove.fromTo(scvl, 0.4, to1,
                                            { transform: jMove.matrix().translate(cix / kolist.length * -100 + "%", "0").toString() });
                                    });
                                    return;
                                }
                                cix = ix;

                                jMove.to(scvl, 0.4, { transform: jMove.matrix().translate(cix / kolist.length * -100 + "%", "0").toString() });
                            };
                            var cix = 0;
                            var arrl1 = alink("oth/arr1l.png", 1).left(30).css("padding", "0 30px").appendTo(sb1);
                            arrl1.top(sb1.height() / 2 - arrl1.height() / 2).click(function () {
                                goto1(cix - 1);
                            });
                            var arrr1 = alink("oth/arr1r.png", 1).right(30).css("padding", "0 30px").appendTo(sb1);
                            arrr1.top(sb1.height() / 2 - arrr1.height() / 2).click(function () {
                                goto1(cix + 1);
                            });

                            panTo(sb1, {
                                left: function () {
                                    goto1(cix - 1);
                                },
                                right: function () {
                                    goto1(cix + 1);
                                }
                            });
                        }
                        me_list.resize(function (w, h) {
                            //scview.left(50).width(w - 100);

                        });
                    };

                    if (!loadedRoom) panoEvents.on("room_load", initroom1);
                    else initroom1();

                    return sb1;
                };

                this.on("remove", function () {
                    panoBox.css("-webkit-filter", "");
                    pano && pano.startOrient();
                });
                var noclosing = true;
                var close1 = function () {
                    if (!noclosing) return;
                    noclosing = 0;
                    createFrameSteps(function (p) {
                        panoBox.css("-webkit-filter", "blur(" + (5 - 5 * p) + "px)");
                    }, 0.5);
                    actionUrl.invoke("360/" + k);
                };
                var close = alink("oth/close2.png", 1).right(20).top(20).css("z-index", 20).appendTo(r1x).click(close1);

                return r1x;
            });

            this.addAction("item", function () {
                var rx = this.root().css("z-index", 200);
                this.onnew = function (k1) {
                    return popProduct.call(this, rx, k1, pano, trackKey)
                };
                return rx;
            });

            return box;
        }
        return box1;
    });

    return root;
});
//定义视图切换默认动画
actionUrl.change = function (hideview, add, remove) {
    var onadd = function () {
        remove();
        var act = add();
    };
    if (hideview) {
        hideview.fadeOut(400);
        setTimeout(onadd, 400);
    }
    else onadd();
};
actionUrl.onchange = function (url) {
    if (url.indexOf('F_39_NE_53_A34') > 0) trackEvent('BABALA_Click');
    if (logPos) console.log(url);
};


//Matrix
(function () { function b(c, d) { return { x: c || 0, y: d || 0, equal: function (e) { return this.x === e.x && this.y === e.y }, add: function (e) { return b(this.x + e.x, this.y + e.y) }, subtract: function (e) { return b(this.x - e.x, this.y - e.y) }, scale: function (e) { return b(this.x * e, this.y * e) }, magnitude: function () { return b.distance(b(0, 0), this) } } } b.distance = function (d, c) { return Math.sqrt(Math.pow(c.x - d.x, 2) + Math.pow(c.y - d.y, 2)) }; b.direction = function (d, c) { return Math.atan2(c.y - d.y, c.x - d.x) }; function a(h, f, j, i, g, e) { h = h !== undefined ? h : 1; i = i !== undefined ? i : 1; return { a: h, b: f || 0, c: j || 0, d: i, tx: g || 0, ty: e || 0, concat: function (c) { return a(this.a * c.a + this.c * c.b, this.b * c.a + this.d * c.b, this.a * c.c + this.c * c.d, this.b * c.c + this.d * c.d, this.a * c.tx + this.c * c.ty + this.tx, this.b * c.tx + this.d * c.ty + this.ty) }, deltaTransformPoint: function (c) { return b(this.a * c.x + this.c * c.y, this.b * c.x + this.d * c.y) }, inverse: function () { var c = this.a * this.d - this.b * this.c; return a(this.d / c, -this.b / c, -this.c / c, this.a / c, (this.c * this.ty - this.d * this.tx) / c, (this.b * this.tx - this.a * this.ty) / c) }, rotate: function (c, d) { return this.concat(a.rotation(c, d)) }, scale: function (k, d, c) { return this.concat(a.scale(k, d, c)) }, transformPoint: function (c) { return b(this.a * c.x + this.c * c.y + this.tx, this.b * c.x + this.d * c.y + this.ty) }, translate: function (d, c) { return this.concat(a.translation(d, c)) } } } a.rotation = function (d, e) { var c = a(Math.cos(d), Math.sin(d), -Math.sin(d), Math.cos(d)); if (e) { c = a.translation(e.x, e.y).concat(c).concat(a.translation(-e.x, -e.y)) } return c }; a.scale = function (f, e, d) { e = e || f; var c = a(f, 0, 0, e); if (d) { c = a.translation(d.x, d.y).concat(c).concat(a.translation(-d.x, -d.y)) } return c }; a.translation = function (d, c) { return a(1, 0, 0, 1, d, c) }; a.IDENTITY = a(); a.HORIZONTAL_FLIP = a(-1, 0, 0, 1); a.VERTICAL_FLIP = a(1, 0, 0, -1); window.Matrix = a }());



var jorientation = {};
supportEvents(jorientation);
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (e) {
        jorientation.trigger("orientation", e);
    }, false);
}

function createPano(act, imgs, hots, dpos) {
    var box = act.root();

    var camera, scene, renderer;
    var geometry, material, mesh;
    var target = new THREE.Vector3();

    var lon = 90, lat = 0;

    var touchX, touchY;

    var _width = wWidth / 2, _height = wHeight / 2;
    var toScreenXY = function (position) {
        var pos = position.clone();
        pos.project(camera);
        /*
        var projScreenMat = new THREE.Matrix4();
        projScreenMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        pos.applyProjection(projScreenMat);
        */
        var obj = {
            x: (pos.x + 1) * _width,
            y: (-pos.y + 1) * _height,
            z: pos.z < 1 ? 1 : -1
        };
        var sc1 = 1;
        if (renderer) sc1 = renderer.scale();
        sc1 = (wWidth / wHeight) * 0.7;
        obj.x = obj.x * sc1 + _width * (1 - sc1);
        obj.y = obj.y * sc1 + _height * (1 - sc1);

        return obj;
    };


    function degToPosition(tar1, lat1, lon1) {
        var phi1 = THREE.Math.degToRad(90 - lat1);
        var theta1 = THREE.Math.degToRad(lon1);

        tar1.x = Math.sin(phi1) * Math.cos(theta1);
        tar1.y = Math.cos(phi1);
        tar1.z = Math.sin(phi1) * Math.sin(theta1);
    };

    var ani_running = [];
    var hots_eles = [];
    var init = function () {

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

        scene = new THREE.Scene();

        var sides = [
            {
                url: imgs[0],
                position: [-512, 0, 0],
                rotation: [0, Math.PI / 2, 0]
            },
            {
                url: imgs[1],
                position: [512, 0, 0],
                rotation: [0, -Math.PI / 2, 0]
            },
            {
                url: imgs[2],
                position: [0, 512, 0],
                rotation: [Math.PI / 2, 0, Math.PI]
            },
            {
                url: imgs[3],
                position: [0, -512, 0],
                rotation: [-Math.PI / 2, 0, Math.PI]
            },
            {
                url: imgs[4],
                position: [0, 0, 512],
                rotation: [0, Math.PI, 0]
            },
            {
                url: imgs[5],
                position: [0, 0, -512],
                rotation: [0, 0, 0]
            }
        ];


        for (var i = 0; i < sides.length; i++) {

            var side = sides[i];

            var element = side.url;
            if (i < 6) element.width = 1028; // 2 pixels extra to close the gap. 

            var object = new THREE.CSS3DObject(element);

            side.position && object.position.fromArray(side.position);
            side.rotation && object.rotation.fromArray(side.rotation);
            if (i >= 6) object.scale.set(0.25, 0.25, 1);

            scene.add(object);

        }

        renderer = new THREE.CSS3DRenderer();


        var r1 = 512;
        hots && hots.forEach(function (o) {
            var img = createHotPoint(o);
            if (img._animate) ani_running.push(img._animate);

            var pan = o.pan / 180 * Math.PI;
            var tilt = o.tilt / 180 * Math.PI;

            var y1 = Math.sin(tilt) * r1;
            var r2 = Math.cos(tilt) * r1;
            var x1 = Math.sin(pan) * r2;
            var z1 = Math.cos(pan) * r2;

            var posi = new THREE.Vector3(x1, y1, z1);

            hots_eles.push({
                url: img[0],
                position: posi,
                rotation: [-tilt, pan, 0],
                cssPos: {}
            });

            box.append(img.css({
                zIndex: 20
            }));
            jMove.matrix().translate('-50%', '-50%').scale(o.scale || 1).flush(img);
            /*
            sides.push({
                url: img[0],
                position: [x1, y1, z1],
                rotation: [-tilt, pan, 0]
            });
            */
        });

        //
        box[0].addEventListener('mousedown', onDocumentMouseDown, false);
        box[0].addEventListener('mousewheel', onDocumentMouseWheel, false);

        box[0].addEventListener('touchstart', onDocumentTouchStart, false);
        box[0].addEventListener('touchmove', onDocumentTouchMove, false);
        box[0].addEventListener('touchend', onDocumentTouchEnd, false);

        onWindowResizeId = setResize(onWindowResize);

    };
    var div1 = group(1).css("z-index", 1000).css("font-size", "24px").css("line-height", "32px").appendTo(box);
    var onWindowResizeId;
    var onWindowResize = function (w, h) {
        if (h > w) {
            var wh = w;
            if (w < 1136) w = 1136;
            h = w * wh / h;

            //div1.html([w, h].join());
        }

        camera.aspect = w / h;
        camera.updateMatrix();
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();

        _width = w / 2;
        _height = h / 2;
        renderer.setSize(w, h);

    };

    var onDocumentMouseDown = function (event) {

        event.preventDefault();

        box[0].addEventListener('mousemove', onDocumentMouseMove, false);
        box[0].addEventListener('mouseup', onDocumentMouseUp, false);

    };

    var onDocumentMouseMove = function (event) {
        orient.pause();

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        var dl = movementX * -0.1;
        var dt = movementY * 0.1;

        lon += dl;
        lat += dt;

        if (logPos) {
            var loglon = (90 - lon) % 360;
            if (loglon < 0) loglon += 360;
            console.log(loglon, lat);
            document.title = [loglon, lat]
        }
    };

    var onDocumentMouseUp = function (event) {

        box[0].removeEventListener('mousemove', onDocumentMouseMove);
        box[0].removeEventListener('mouseup', onDocumentMouseUp);


        orient.startLater();

    };

    var onDocumentMouseWheel = function (event) {

        camera.fov -= event.wheelDeltaY * 0.05;
        if (camera.fov > 80) camera.fov = 80;
        else if (camera.fov < 10) camera.fov = 10;
        camera.updateProjectionMatrix();

    };

    var touchX2, touchY2, towTouch = false;
    var onDocumentTouchStart = function (event) {

        //event.preventDefault();

        var touch = event.touches[0];

        touchX = touch.screenX;
        touchY = touch.screenY;

        if (event.touches.length > 1) {
            touch = event.touches[1];
            touchX2 = touch.screenX;
            touchY2 = touch.screenY;
            towTouch = true;
        } else if (towTouch) towTouch = false;
    };

    var onDocumentTouchMove = function (event) {

        event.preventDefault();
        orient.pause();

        var touch = event.touches[0];

        if (!towTouch && event.touches.length == 1) {
            var dl = (touch.screenX - touchX) * -0.1;
            var dt = (touch.screenY - touchY) * 0.1;

            lon += dl;
            lat += dt;

        } else if (event.touches.length == 2) {

            var touch2 = event.touches[1];
            var d1 = Math.sqrt(Math.pow(touchX2 - touchX, 2), Math.pow(touchY2 - touchY, 2));
            var d2 = Math.sqrt(Math.pow(touch2.screenX - touch.screenX, 2), Math.pow(touch2.screenY - touch.screenY, 2));

            camera.fov -= (d2 - d1) * 0.2;
            if (camera.fov > 80) camera.fov = 80;
            else if (camera.fov < 10) camera.fov = 10;
            camera.updateProjectionMatrix();

            touchX2 = touch2.screenX;
            touchY2 = touch2.screenY;
        }
        touchX = touch.screenX;
        touchY = touch.screenY;
    };

    var onDocumentTouchEnd = function (event) {
        if (!event || event.touches.length == 0) {
            orient.startLater();
        }
    };

    var moving, cleared;
    var animate = function () {
        if (cleared) return;

        if (moving) moving();
        else orient && orient.moving();
        /*
        lon += 0.1;
        */
        lat = Math.max(-85, Math.min(85, lat));
        degToPosition(target, lat, lon);

        camera.lookAt(target);
        //camera.updateProjectionMatrix();
        renderer.render(scene, camera);

        scene.updateMatrix();
        scene.updateMatrixWorld();
        camera.updateMatrix();
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();
        hots_eles.forEach(function (o) {
            var pos1 = toScreenXY(o.position);
            if (o.cssPos.x == pos1.x && o.cssPos.y == pos1.y && o.cssPos.z == pos1.z) return;

            if (o.cssPos.z != pos1.z) {
                if (pos1.z < 0) o.url.style.display = "none";
                else o.url.style.display = "block";
            }
            o.url.style.left = pos1.x + "px";
            o.url.style.top = pos1.y + "px";
            o.cssPos = pos1;
        });

        requestAnimationFrame(animate);
    };

    init();
    if (dpos) {
        camera.fov = dpos[2];
        lon = 90 - dpos[0];
        lat = dpos[1];
        camera.updateProjectionMatrix();
    }
    animate();

    var d_lon = undefined, d_tilt = undefined, t_tilt, d_tilt_time;
    var delayMove = function (d) {
        var dv = d * 0.08;
        var min = 0.01;
        if (dv >= 0 && dv < min) dv = Math.min(d, min);
        else if (dv < 0 && dv > -min) dv = Math.max(d, -min);
        return dv;
    };
    var orient = {
        _state: -2,
        _timer: 0,
        _ready: false,
        pause: function () {
            this._state = -1;
            d_lon = undefined;
            this._ready = false;
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = 0;
            }
        },
        init: function (fi) {
            d_lon = fi - lon;
        },
        start: function () {
            this.pause();
            orient._state = 2;
            d_tilt_time = new Date().getTime();
            d_tilt = lat;
            t_tilt = lat;
        },
        startLater: function (delay) {
            if (this._timer) clearTimeout(this._timer);
            this._timer = setTimeout(function () {
                orient._timer = 0;
                orient.start();
            }, delay || 2000);
        },
        event: function (e) {
            if (this._state < 0 || !(window.orientation == 90 || window.orientation == -90)) return;

            var alp = e.alpha;
            var bta = e.beta;
            var gam = e.gamma;
            var fi, sita;
            if (window.orientation == -90) {
                gam = -gam;
                alp = alp - 180;
            }
            if (bta > 180) bta -= 180;
            else if (bta < -180) bta += 180;
            if (gam < -90) gam += 360;
            else if (gam > 270) gam -= 360;

            var fi = alp;
            if (bta < 90 && bta > -90 && gam % 180 < 90 && gam > -90)
                fi = 360 - fi;
            else fi = 540 - fi;

            if (Math.abs(bta) > 90) gam += 180;
            var sita = gam < 90 ? Math.max(-90, -gam - 90) : Math.min(90, 270 - gam);


            sita = Math.pow((sita + 90) / 180, 1) * 180 - 90;

            if (d_lon == undefined) {
                this.init(fi, sita);
                return;
            }

            //div1.html([lon, lat].join('<br/>'));

            //div1.html([fi , d_lon , this.lon, sita , this.lan].join("<br />"));
            if (this.lon == undefined || this.lan == undefined || (Math.abs(fi - d_lon - this.lon) > 0.2 && Math.abs(sita - this.lan) > 0.2)) {
                this.lon = fi - d_lon;
                this.lan = sita;
            }
            this._ready = true;
        },
        moving: function () {
            if (this._state < 0) return;
            if (!this._ready) return;

            if (lon != this.lon) {
                if (this.lon - lon > 180) lon += 360;
                else if (this.lon - lon < -180) lon -= 360;
                var dv = delayMove(this.lon - lon);
                lon += dv;
            }
            if (d_tilt == undefined) {
                if (lat != this.lan) {
                    var dv = delayMove(this.lan - lat);
                    lat += dv;
                }
                return;
            }

            var nt = new Date().getTime();
            var dt = nt - d_tilt_time;

            var dur = 2000;
            var p = dt / dur;
            if (p >= 1) {
                p = 1;
                d_tilt = undefined;
                lat = this.lan;
                return;
            }

            //ease
            if (p < 0.5) p = p * p * 2;
            else p = Math.pow(p * 2 - 1, 0.5) / 2 + 0.5;

            lat = (this.lan - d_tilt) * p + d_tilt;

        }
    };

    var temp1Cid;
    if (wWidth >= wHeight) orient._state = 1;
    else {
        temp1Cid = setResize(function (w, h) {
            if (w >= h) {
                clearResize(temp1Cid);
                temp1Cid = 0;
                if (orient._state == -2) orient._state = 1;
            }
        });
    }
    // 方向传感器
    var orientEvt = function (e) {
        orient.event(e);
    };
    jorientation.on("orientation", orientEvt);


    box.append(renderer.domElement);
    return {
        clear: function () {
            cleared = true;
            box[0].removeEventListener('mousedown', onDocumentMouseDown, false);
            box[0].removeEventListener('mousewheel', onDocumentMouseWheel, false);

            box[0].removeEventListener('touchstart', onDocumentTouchStart, false);
            box[0].removeEventListener('touchmove', onDocumentTouchMove, false);
            box[0].removeEventListener('touchend', onDocumentTouchEnd, false);

            clearResize(onWindowResizeId);
            jorientation.off("orientation", orientEvt);

            if (temp1Cid) clearResize(temp1Cid);
            ani_running.forEach(function (o) {
                o.stop();
            });
        },
        element: box[0],
        moveTo: function (x, y, f, time, ease, fease, onend) {
            var now = new Date().getTime();
            var dur = (time || 1) * 1000;

            var sfov = camera.fov;
            var slon = lon % 360;
            var slat = lat % 360;
            camera.updateProjectionMatrix();

            x = (90 - x) % 360;
            y = y % 360;

            //console.log([x, y]);

            if (slon < 0) slon += 360;
            if (x < 0) x += 360;

            if (x - slon > 180) x -= 360;
            else if (x - slon < -180) slon -= 360;



            if (!ease) {
                if (f < camera.fov) ease = function (p) {
                    return Math.pow(p, 0.5);
                }; else ease = function (p) {
                    return Math.pow(p, 2);
                };
            }
            if (!fease) {
                if (f < camera.fov) fease = function (p) {
                    return Math.pow(p, 3);
                }; else fease = function (p) {
                    return Math.pow(p, 0.5);
                };
            }
            moving = function () {
                var p = Math.min(1, (new Date().getTime() - now) / dur);
                var fp = fease(p);
                p = ease(p);

                camera.fov = sfov + (f - sfov) * fp;
                lon = slon + (x - slon) * p;
                lat = slat + (y - slat) * p;

                if (p >= 1) {
                    moving = null;
                    orient.start();
                    onend && onend();
                }
            };
            orient.pause();
        },
        stopOrient: function () {
            orient.pause();
        },
        startOrient: function () {
            orient.startLater(800);
        }
    };
}

var audioEle = document.createElement('audio');
function playAudio1(src, aid, roomid) {
    audioEle.src = staticDir + "audio/" + src;
    audioEle.play();
    trackEvent("Audio_Guide_" + trackKey + "_Click");
    return audioEle;
}

/*
group(1).css({
    width: 600,
    height: 80,
    lineHegith: '50px',
    textAlign: "center",
    fontSize: '64px',
    color: '#fff'
}).html("请横屏查看").anchor(anchor().appendTo($("#rotate").hide()));
*/


var lastorientation = null, orientationtimer;
function orientationChange() {
    var cw = window.innerWidth || document.documentElement.clientWidth;
    var ch = window.innerHeight || document.documentElement.clientHeight;
    var ori = cw > ch;

    if (lastorientation == ori) return;


    if (ori) {
        if (ori != lastorientation) {
            $("#cmain").show();
            $("#rotate").hide();
            if (orientationtimer) clearTimeout(orientationtimer);
            orientationtimer = setTimeout(function () {
                if (window.j_resize) j_resize();
            }, 50);
        }
    } else {
        if (ori != lastorientation) {
            $("#cmain").hide();
            $("#rotate").hide();
            if (orientationtimer) clearTimeout(orientationtimer);
            orientationtimer = setTimeout(function () {
                var scale = cw / 640;
                $("#rotate").css({
                    position: 'absolute',
                    width: cw + 'px',
                    height: ch + 'px'
                }).left(0).top(0).bottom(0).right(0).css("background", "#000000").show();
                jMove.css($("#rotate").children(), "transform", "scale(" + scale + ", " + scale + ")");
            }, 50);
        }
    }
    lastorientation = ori;
}

function setOrientTimeout(call, timespan) {
    if (!timespan) timespan = 0;
    var dt = 0;
    var ldt = new Date().getTime();
    var tid = setInterval(function () {
        var ndt = new Date().getTime();
        if (lastorientation == true) {
            dt += ndt - ldt;
            if (dt >= timespan) {
                clearInterval(tid);
                call && call();
            }
        }
        ldt = ndt;
    }, 16);
    return tid;
}


function nothing() { }

if (logPos) {
    group(1).css({
        width: 2,
        height: 2,
        zIndex: 2000,
        background: 'rgba(255, 0, 0, 0.8)'
    }).anchor(anchor().appendTo($("#cmain")));
}

function trackEvent(ename) {
    _hmt.push(['_trackEvent', 'click_' + trackPlatform, 'click_' + trackPlatform + '_' + _origin, "click_" + trackPlatform + "_" + ename]);
}

function trackPage(pname) {
    _hmt.push(['_trackPageview', '/mobile/' + trackPlatform + '/' + pname + "?origin=" + _origin]);
}