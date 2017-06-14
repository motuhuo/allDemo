(function mouseWheel() {
    if (document.addEventListener) {
        document.addEventListener('mousewheel', function(event) {
            Detail(event);
        });
        document.addEventListener('DOMMouseScroll', function(event) {
            Detail(event);
        });
    } else if (document.addEventListener && !document.attachEvent) {
        document.attachEvent('onmousewheel', function(event) {
            Detail(event);
        });
    }
})();

var container = document.getElementById("container");
var list = document.getElementById("list");
var box = document.getElementById("box");
var cons = $('.con');
//此处设置第一页面为默认显示页面
cons[0].style.top = 0;
var zIdx = 10;
var nn = 0;
var currentPosition = 0;
//添加小圆点
var arr = ["#fafafa", "#cacaca", "#dadada"];

for (var i = 0; i < cons.length; i++) {
    cons[i].style.backgroundColor = arr[i];
    var li = document.createElement("li");
    list.appendChild(li);
    list.children[i].idx = i;
    //点击小圆点切换显示页面
    list.children[i].onclick = function() {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].className = "";
            cons[i].style.zIndex = 1;
            // 如果想要执行一次动画之后就下一次进入页面不再有动画，只要不清空产生动话的active就可以了
            cons[currentPosition].className = "con";
            if(i !== currentPosition){
                cons[i].style.top = "100%";
            }
        }
        currentPosition = this.idx;
        this.className = "current";
        cons[currentPosition].style.zIndex = zIdx;
        cons[currentPosition].className = "con active";
        animate(cons[currentPosition], {
            "top": "0"
        });
    };
}

list.children[0].className = "current";
//e.wheelDelta > 0滚轮向下滚动，e.wheelDelta < 0表示滚轮向上滚动
function Detail(event) {

    var e = event || window.event;
    if ((-e.detail || e.wheelDelta) > 0) {
        var bgc = cons[currentPosition].style.backgroundColor;
        document.body.style.backgroundColor = bgc;
        currentPosition++;
        if (currentPosition > cons.length - 1) {
            currentPosition = 0;
        }
        for (var i = 0; i < cons.length; i++) {
            cons[i].style.zIndex = 1;
            list.children[i].className = "";
            cons[i].className = "con";
            if(i !== currentPosition){
                cons[i].style.top = "-100%";
            }
        }
        console.log(currentPosition);
        cons[currentPosition].style.zIndex = zIdx;
        cons[currentPosition].className = "con active";
        animate(cons[currentPosition], {
            "top": "0"
        });
        list.children[currentPosition].className = "current";

    } else {
        var bgc = cons[currentPosition].style.backgroundColor;
        document.body.style.backgroundColor = bgc;
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = cons.length - 1;
        }
        for (var i = 0; i < cons.length; i++) {
            cons[i].style.zIndex = 1;
            list.children[i].className = "";
            cons[i].className = "con";
            if(i !== currentPosition){
                cons[i].style.top = "100%";
            }
        }
        console.log(currentPosition);
        cons[Math.abs(currentPosition)].style.zIndex = zIdx;
        cons[currentPosition].className = "con active";
        animate(cons[currentPosition], {
            "top": "0"
        });
        list.children[Math.abs(currentPosition)].className = "current";
    }
}