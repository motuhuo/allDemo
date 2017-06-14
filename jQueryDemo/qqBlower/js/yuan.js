(function mouseWheel() {
    if (document.addEventListener) {
        document.addEventListener('mousewheel', function(event) {
            Detail(event);
        });
        document.addEventListener('DOMMouseScroll', function(event) {
            Detail(event);
        });
    } else if(document.addEventListener&&!document.attachEvent){
        document.attachEvent('onmousewheel', function(event) {
            Detail(event);
        });
    }
})();



function animate(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;//放在这儿只要有一个返回false那就是false
            for (var k in json) {
                //var flag = true;//如果放在这儿变成查看最后一个执行的情况，执行好了返回true，未完成返回false
                if(k === "opacity"){
                    var target = json[k]*100;
                    var leader = parseInt(getStyle(obj, k))*100;
                    var step = (target - leader) / 5;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader/100;
                }else if(k === "zIndex"){
                    obj.style.zIndex = json[k];
                }else{
                    var target = json[k];
                    var leader = parseInt(getStyle(obj, k));
                    var step = (target - leader) / 5;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    console.log("test");
                    obj.style[k] = leader + "px";
                }
                if (leader !== target) {
                    flag = false;
                }
                console.log(flag);
            }

            if(flag){
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                    alert("shizingle");
                }
            }
        }, 15);
    }

    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }