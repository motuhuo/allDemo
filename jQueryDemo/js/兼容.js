// JavaScript Document
/* 1、事件源  2、连续事件   3、4、getByclassName  5、获取当前样式   6、事件绑定  7、鼠标滚轮事件   8、选中文字  9、阻止冒泡   10、阻止默认事件   11、弹性菜单(运动框架) 12、input兼容ie8  13、1px兼容问题 14、苹果  15、深拷贝     16.input type="file"样式的修改   17.fontface(字体) 18.清除按钮  19.获取图片的原始 宽 、高 20、省略号  21、图片垂直居中 
22、清除浮动 23、css3常用  24、hack 25、闭包 26、prototype 27、面向对象 28、ajax状态值 29、HTTP状态码 30、判断andriod ios 31、排序方法 32、es6的类 class的用法 33、媒介查寻  34、rem布局 35、屏幕旋转的事件和样式  

*/
// ios上上下拉动滚动条是卡顿  -webkit-overflow-scrolling: touch;  overflow-scrolling: touch;

// 动画定义3D启用硬件加速
// Element {
//  -webkit-transform:translate3d(0, 0, 0)
//  transform: translate3d(0, 0, 0);
// }
 
/*
var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
var scrollleft = document.documentElement.scrollLeft||document.body.scrollLeft;
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />  
*/
// 面试题 https://github.com/Xing-Chuan/blog/blob/master/works/Web前端面试总结-2017-05.md
// 
// 字体phone：font-family: 微软雅黑', 'Microsoft Yahei',"Helvetica Neue", Helvetica, STHeiTi, sans-serif; body{font-family:Helvetica;}
// font-family: 微软雅黑,Microsoft YaHei,SimHei,NSimSun;
//PC:font-family: '微软雅黑', 'Microsoft Yahei',  Helvetica, 'Hiragino Sans GB',Arial, sans-serif;

//1、事件源 在父级上加事件，波及子级  nodeName可找出子元素  (事件委托)
父级事件=function(ev){  
  var ev=ev||window.event;
  var target=ev.target||ev.srcElement;
}
/*oUl.onmouseover=function(ev){
  var ev=ev||window.event;
  var target=ev.target||ev.srcElement;
  if (target.nodeName.toLowerCase()=='li'){
    target.style.background='red';
  }
}*/



//2、连续事件
var ie=!-[1,];
if(ie){ 
  onpropertychange=function(){};
}
else {
  oninput=function(){

  }
}

//3、getByclassName 兼容性问题  //单个class=one不能连等;
//调用函数，实参className加引号！
var getByclassName=function(oParent,className){ 
  var all=oParent.getElementsByTagName('*');
  var result=[];
  for (var i=0; i<all.length;i++){  
    //if (all[i].getAttribute('class')==className){ 
    if(all[i].className==className){  
      result.push(all[i]);
    }
  }
  return result;
}

/*4、getByclassName 兼容性问题  单个class=one two 可能连等;*/
//调用函数，实参className加引号！
var getByclassName=function(oParent,className){ 
  var all=oParent.getElementsByTagName('*');
  var result=[];
  var re=new RegExp('\\b'+className+'\\b')
  
  for (var i=0; i<all.length;i++){  
    //if (all[i].getAttribute('class')==className){ 
    if(re.test(all[i].className)){
      result.push(all[i]);
    }
  }
  return result;
}

//5、获取当前样式
function getStyle(obj,attr){  
  return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

// 6、事件绑定
//iE:下对象.attachEvent('事件名'， 函数)
//解除detachEvent('事件名'， 函数)
//ff:对象.addEventListener('不带on的事件名'， 函数，是否捕获)
//解除：removeEventListener('不带on的事件名'， 函数，是否捕获)
//事件不带on,且加引号; 
function MyAddEvent (obj,sEvent,fn)
{ 
  if(obj.attachEvent)
  { 
    obj.attachEvent('on'+sEvent,fn);
  }
  else
  { 
    obj.addEventListener(sEvent,fn,false);
  }
}
/*7、鼠标滚轮事件  与事件绑定函数一起使用*/
function onMouseWheel(ev)
  {
    var oEvent=ev||event;
    var bDown=true;
    bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
    if(bDown)   //滚轮向下滚动
    { 
      oDiv.style.height=oDiv.offsetHeight+10+'px';
    }
    else
    { 
      oDiv.style.height=oDiv.offsetHeight-10+'px';
    }
    if(oEvent.preventDefault)   //FF下addEventListener用preventDefault阻止莫认事件；
    { 
      oEvent.preventDefault();
    }
    
    return false;
    
  }
  MyAddEvent(oDiv,'mousewheel',onMouseWheel);    //MyAddEvent为自定义函数。事件绑定在上面;
  MyAddEvent(oDiv,'DOMMouseScroll',onMouseWheel);


/*8、选中文字*/
function selectText()
{ 
  if(document.selection)
  { 
    return document.selection.createRange().text;
  }
  else
  { 
    return window.getSelection().toString();
  }
}


/*9、阻止冒泡*/
input.onclick =function(ev){//阻止冒泡
  window.event?window.event.cancelBubble = true:ev.stopPropagation();
}

function stopBubble(ev)//阻止事件冒泡函数
{
  if (ev && ev.stopPropagation)
    ev.stopPropagation()
  else
  window.event.cancelBubble=true
}   


/*10、阻止默认事件*/
A.onclick=function(ev)
  { 
    var oEvent=ev||window.event;
    if(oEvent.preventDefault)
    { 
      oEvent.preventDefault();
    }
    else
    { 
      oEvent.returnValue=false;
    }
  }

/*11、 弹性菜单（运动构架）*/
  var iSpeed=0;
  var left=0;
  function startMove(obj,iTarget)
  { 
    clearInterval(obj.timer);
    obj.timer=setInterval(function()
    {
      iSpeed+=(iTarget-obj.offsetLeft)/5;
      iSpeed*=0.8;
      left+=iSpeed;           //变量误差相加
      if (Math.abs(iSpeed)<1&&Math.abs(left-iTarget)<1)
      {
        obj.style.left=iTarget+'px';
        clearInterval(obj.timer);
      }
      else
      {
        obj.style.left=left+'px';
      }
    //console.log(obj.style.left)
    },30);
  }

  // 12.input兼容ie8
  /* $(function () {
        if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {                  
                    input.val('');
                    input.removeClass('placeholder');
                }
                
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        };
    })
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }*/


    //13、   1px兼容问题
.BorderTop,.BorderBottom,.BorderLeft,.BorderRight,.BorderAb { position: relative;}
.BorderTop:before,.BorderBottom:after {pointer-events: none;position: absolute;content: ""; height: 1px; background: #e5e5e5left: 0;right: 0}
.BorderTop:before {top: 0}
.BorderBottom:after {bottom: 0}
.BorderLeft:before,.BorderRight:after {pointer-events: none;position: absolute;content: ""; width: 1px; background: #e5e5e5 top: 0; bottom: 0}
.BorderLeft:before {left: 0}
.BorderRight:after {right: 0}
.BorderAb:after {position: absolute;content: "";top: 0;left: 0; -webkit-box-sizing: border-box; box-sizing: border-box; width: 100%; height: 100%; border: 1px solid #e5e5e5 pointer-events: none}
 
@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5),(min-resolution: 144dpi),(min-resolution:1.5dppx) {
.BorderTop:before,.BorderBottom:after {-webkit-transform:scaleY(.5);transform: scaleY(.5) }
.BorderLeft:before,.BorderRight:after {-webkit-transform: scaleX(.5); transform: scaleX(.5) }
.BorderAb:after { width: 200%; height: 200%;-webkit-transform: scale(.5); transform: scale(.5) }
.BorderTop:before,.BorderLeft:before,.BorderAb:after {-webkit-transform-origin: 0 0;transform-origin: 0 0}
.BorderBottom:after,.BorderRight:after { -webkit-transform-origin: 100% 100%;transform-origin: 100% 100%}
}
 
@media (-webkit-device-pixel-ratio:1.5) {
.BorderTop:before,.BorderBottom:after { -webkit-transform: scaleY(.6666); transform: scaleY(.6666) }
.BorderLeft:before,.BorderRight:after {-webkit-transform: scaleX(.6666); transform: scaleX(.6666)}
.BorderAb:after {width: 150%; height: 150%;-webkit-transform: scale(.6666); transform: scale(.6666) }
}
 
@media (-webkit-device-pixel-ratio:3) {
.BorderTop:before,.BorderBottom:after { -webkit-transform: scaleY(.3333); transform: scaleY(.3333)}
.BorderLeft:before,.BorderRight:after { -webkit-transform: scaleX(.3333); transform: scaleX(.3333)}
.BorderAb:after {width: 300%;height: 300%; -webkit-transform: scale(.3333);transform: scale(.3333)}
}

//14.苹果样式
//4s专属样式
@media screen and (min-device-height:370px) and (max-device-height:485px){}
//5s专属样式
@media screen and (min-device-height:560px) and (max-device-height:570px){}
//6s专属样式
@media screen and (min-device-height:571px) and (max-device-height:670px){}

//15.深拷贝
function deepCopy(p, c) {
　　　　var c = c || {};
　　　　for (var i in p) {
　　　　　　if (typeof p[i] === 'object') {
　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　　　deepCopy(p[i], c[i]);
　　　　　　} else {
　　　　　　　　　c[i] = p[i];
　　　　　　}
　　　　}
　　　　return c;
　　}
var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京','上海','香港'];
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港

 16.input type="file"样式的修改
 css 
.file-box{ position:relative;width:340px}
.txt{ height:22px; border:1px solid #cdcdcd; width:180px;} 
.btn{ background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:70px;} 
.file{ position:absolute; top:0; right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px } 


<div class="file-box"> 
  <form action="" method="post" enctype="multipart/form-data"> 
    <input type='text' name='textfield' id='textfield' class='txt' /> 
    <input type='button' class='btn' value='浏览...' /> 
    <input type="file" name="fileField" class="file" id="fileField" size="28" onchange="document.getElementById('textfield').value=this.value" /> 
    <input type="submit" name="submit" class="btn" value="上传" /> 
  </form> 
</div> 

17.font ('字体')
@font-face
 {
  font-family:'NeuesBauenDemo';
  src:url('../fonts/neues_bauen_demo-webfont.eot');
  src:url('../fonts/neues_bauen_demo-webfont.eot?#iefix')format('embedded-opentype'),
   url('../fonts/neues_bauen_demo-webfont.woff')format('woff'),
   url('../fonts/neues_bauen_demo-webfont.ttf')format('truetype'),
   url('../fonts/neues_bauen_demo-webfont.svg#NeuesBauenDemo')format('svg');
  font-weight:normal;
  font-style:normal;
}

18.清除按钮
::-ms-clear,::-ms-reveal{display:none;}
.input { padding: 5px; margin: 0; border: 1px solid #beceeb; }
.clear { display: none; position: absolute; width: 16px; height: 16px; margin: 6px 0 0 -20px; background: url(clear.png) no-repeat; outline: none; }
.input::-ms-clear { display: none; }
.input:valid + .clear { display: inline; }
HTML代码：
输入任意内容：<input class="input" required><a href="javascript:" class="clear">

19.原始图片的宽度和高度
(function($){
    var props = ['Width', 'Height'],
    prop;

    while (prop = props.pop()) {
    (function (natural, prop) {
      $.fn[natural] = (natural in new Image()) ? 
      function () {
      return this[0][natural];
      } : 
      function () {
      var node = this[0], img, value;

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

  // 如何使用:
  var 
  nWidth = $('img#example').naturalWidth(),
  nHeight = $('img#example').naturalHeight();

  20、省略号
    width: 22%;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;

  21、图片垂直居中
   (1) background center
      width: 500px;
      height: 500px;
      border: 1px solid red;
      background: url(img/redbb.png) center center no-repeat;
      background-size: 40px 40px;
    (2) table-cell
      width: 500px;
      height: 500px;
      border: 1px solid red;
      text-align: center;
      vertical-align: middle;
      display: table-cell;
  22、清除浮动
    (1) 添加空元素
    (2) 让父容器变得可以自动"清理"子元素的浮动
    (3) :after伪选择符 父级添加 .clearfix
       .clearfix:after {
          content: "\0020";
          display: block;
          height: 0;
          clear: both;
        }
        .clearfix {
          zoom:1;
        }
  23、css3常用 
    文本缩进 text-indent

  24、hack
    #tip{
      background:blue;/*所有浏览器都支持*/ 
      background:red\9;/*IE8背景变红色 IE6、7、8、9支持覆盖上面样式*/ 
      *background:black;/*IE7背景变黑色 IE6、7支持又一次覆盖上面样式*/ 
      _background:orange;/*IE6背景变橘色 仅IE6支持又一次覆盖上面样式*/ 
    }

  25、闭包
    子函数可以引用其所在作用域中的变量。闭包的两大作用，一个是读取函数中的变量，另外一个是将函数中的变量的值存储于内存中。
    (1)、作用域链：就是函数在定义的时候创建的,用于寻找使用到的变量的值的一个索引,而他内部的规则是,把函数自身的本地变量放在最前面,把自身的父级函数中的变量放在其次,把再高一级函数中的变量放在更后面,以此类推直至全局对象为止。当函数中需要查询一个变量的值的时候,js解释器会去作用域链去查找,从最前面的本地变量中先找,如果没有找到对应的变量,则到下一级的链上找,一旦找到了变量,则不再继续。如果找到最后也没找到需要的变量,则解释器返回undefined。
    (2)、内存回收机制：一般来说,一个函数在执行开始的时候,会给其中定义的变量划分内存空间保存,以备后面的语句所用,等到函数执行完毕返回了,这些变量就被认为是无用的了。对应的内存空间也就被回收了。下次再执行此函数的时候,所有的变量又回到最初的状态,重新赋值使用。但是如果这个函数内部又嵌套了另一个函数,而这个函数是有可能在外部被调用到的。并且这个内部函数又使用了外部函数的某些变量的话。这种内存回收机制就会出现问题。如果在外部函数返回后,又直接调用了内部函数,那么内部函数就无法读取到他所需要的外部函数中变量的值了。所以js解释器在遇到函数定义的时候,会自动把函数和他可能使用的变量(包括本地变量和父级和祖先级函数的变量(自由变量))一起保存起来。也就是构建一个闭包。这些变量将不会被内存回收器所回收,只有当内部的函数不可能被调用以后(例如被删除了,或者没有了指针),才会销毁这个闭包,而没有任何一个闭包引用的变量才会被下一次内存回收启动时所回收。
  26、prototype
    实例对象的__proto__指向其构造函数的prototype
      function MyObject(){};
      console.log(MyObject.prototype.constructor == MyObject); //true
      delete MyObject.prototype.constructor;
      console.log(MyObject.prototype.constructor == Object); //true
      console.log(MyObject.prototype.constructor == new Object().constructor);// true
      function Animal(){}
      var  anim = new Animal();
      // 实例 对象     类
      // 
      // let b = new B();
      // 
      // b.constructor === B.prototype.constructor // true
      // b.constructor === B   //true
      // B.prototype.constructor === B   //true
      // b.__proto__ === B.prototype    //true
      // {
      //   let Foo = class {};
      //   class Bar extends Foo {}
      // }
      // 
    console.log('typeof Animal.prototype:' +typeof Animal.prototype);  //object
    // 实例对象的__proto__指向其构造函数的prototype
    console.log('anim.__proto__===Animal.prototype:'+(anim.__proto__===Animal.prototype));  //true
    console.log('Animal.__proto__===Function.prototype:'+(Animal.__proto__===Function.prototype));  //true
    console.log('Animal.prototype.__proto__===Object.prototype:'+(Animal.prototype.__proto__===Object.prototype));  //true
    
    console.log('***********Function proto*****************');
    console.log('typeof Function.prototype:'+typeof Function.prototype);  //function
    console.log('typeof Function.__proto__:'+typeof Function.__proto__);  //function
    console.log('typeof Function.prototype.prototype:'+typeof Function.prototype.prototype); //undefined
    console.log('typeof Function.prototype.__proto__:'+typeof Function.prototype.__proto__);   //object
    console.log('Function.prototype===Function.__proto__:'+(Function.prototype===Function.__proto__)); //true

    console.log('***********Object proto*****************');
    console.log('typeof Object.prototype:'+typeof Object.prototype);  //object
    console.log('typeof Object.__proto__:'+typeof Object.__proto__);  //function
    console.log('Object.prototype.prototype:'+Object.prototype.prototype);  //undefied
    console.log('Object.prototype.__proto__===null:'+(Object.prototype.__proto__===null));  //null

    console.log('***********Function Object  proto关系*****************');
    console.log('Function.prototype===Object.__proto__:'+(Function.prototype===Object.__proto__));   //true
    console.log('Function.__proto__===Object.__proto__:'+(Function.__proto__===Object.__proto__));   //true
    console.log('Function.prototype.__proto__===Object.prototype:'+(Function.prototype.__proto__===Object.prototype));   //true
    /********************* 系统定义的对象Array、Date ****************************/
    var array = new Array();
    var date = new Date();
    console.log('array.__proto__===Array.prototype:'+(array.__proto__===Array.prototype));   //true
    console.log('Array.__proto__===Function.prototype:'+(Array.__proto__===Function.prototype));  //true
    console.log('date.__proto__===Date.prototype:'+(date.__proto__===Date.prototype));    //true
    console.log('Date.__proto__===Function.prototype:'+(Date.__proto__===Function.prototype));     //true

  27、面向对象
    (1)、封装: 也就是把客观事物封装成抽象的类。封装是面向对象的特征之一，是对象和类概念的主要特性。 简单的说，一个类就是一个封装了数据以及操作这些数据的代码的逻辑实体。
    (2)、继承
    (3)、多态 所谓多态就是指一个类实例的相同方法在不同情形有不同表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。这意味着，虽然针对不同对象的具体操作不同，但通过一个公共的类，它们（那些操作）可以通过相同的方式予以调用。

  28、ajax状态值
    0: (未初始化)还没有调用send()方法。
    1: (载入)已经调用send()方法，正在派发请求。
    2: (载入完成)send()已经执行完成，已经接收到全部的响应内容。
    3: (交互)正在解析响应内容。
    4: (完成)响应内容已经解析完成，用户可以调用。

  29、HTTP状态码
    200 & OK: 请求成功；
    204 & No Content: 请求处理成功，但没有资源可以返回；
    206 & Partial Content: 对资源某一部分进行请求(比如对于只加载了一般的图片剩余部分的请求)；
    301 & Move Permanently: 永久性重定向；
    302 & Found： 临时性重定向；
    303 & See Other: 请求资源存在另一个URI，应使用get方法请求；
    304 & Not Modified: 服务器判断本地缓存未更新，可以直接使用本地的缓存；
    307 & Temporary Redirect: 临时重定向；
    400 & Bad Request: 请求报文存在语法错误；
    401 & Unauthorized: 请求需要通过HTTP认证；
    403 & Forbidden: 请求资源被服务器拒绝，访问权限的问题；
    404 & Not Found: 服务器上没有请求的资源；
    500 & Internal Server Error: 服务器执行请求时出现错误；
    502 & Bad Gateway: 错误的网关；
    503 & Service Unavailable: 服务器超载或正在维护，无法处理请求；
    504 & Gateway timeout: 网关超时；

  30、判断andriod ios 
      网址：http://www.cnblogs.com/sese/p/5629404.html

      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //android终端  showToast android的原生方法
        android.showToast("哈哈啊哈");
        alert('android');

        var getMsg = "{" + '"share_txt":' + '"' + share_txt + '"' + ',"title_txt":' + '"' + share_txt + '" ' + ', "webHref":' + '"' + ApiRoot + "/pages/account/share_loginregister.html?inviter=" + (investorId != null ? investorId : 0) + '"' + ',"imgHref":' + '"' + MarketRoot + "/Content/img/LOGO_300x300.png" + '"' + "}";
          // inviteFriends是android原生方法，将getMsg传给android
          window.android.inviteFriends(getMsg);
      }
      if (isiOS) {
        //ios终端
        alert('ios')
      }
  31、排序方法
    (1)// 每次只找最大的
    function sortArray (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      console.log('arr:' + arr)
    }
    sortArray([9, 8, 4, 6, 5])
    (2) 快速排序
    function quickSort (arr) {
      if(arr.length <= 1) {
        return arr;
      }
      var num = Math.floor(arr.length/2);
      var numValue = arr.splice(num,1)[0] //中间值
      var left = [];
      var right = [];
      for(var i=0; i<arr.length; i++){
        if(arr[i]<=numValue){
          left.push(arr[i])
        }else {
          right.push(arr[i])
        }
        return quickSort(left).concat([numValue],quickSort(right))
      }
    }

  32、es6的类 class的用法
    // 原写法
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }
    Point.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')';
    };
    var p = new Point(1, 2);
    // 原写法结束
    //es6 class写法
    //定义类
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }
    注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

    class Point {
      constructor(){}
      toString(){}
      toValue(){}
    }
    // 等同于
    Point.prototype = {
      toString(){},
      toValue(){}
    };

    Class之间可以通过extends关键字实现继承

    子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
    class A {}
    class B extends A {}
    B.__proto__ === A // true
    B.prototype.__proto__ === A.prototype // true

    // getPrototypeOf


    33、媒介查寻  http://www.25xt.com/html5css3/10524.html  http://sentsin.com/web/1134.html(各种屏幕)
      /* 普通显示屏(设备像素比例小于等于1)使用1倍的图 */
        .css{
            background-image: url(img_1x.png);
        }

        /* 高清显示屏(设备像素比例大于等于2)使用2倍图  */
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .css{
              background-image: url(img_2x.png);
            }
        }

        /* 高清显示屏(设备像素比例大于等于3)使用3倍图  */
        @media only screen and (-webkit-min-device-pixel-ratio:3){
            .css{
          background-image: url(img_3x.png);
            }
        }
      //背景图
      .css {
        background-image: url(1x.png);    /*不支持image-set的情况下显示*/
        background: -webkit-image-set(
          url(1x.png) 1x,/* 支持image-set的浏览器的[普通屏幕]下 */
          url(2x.png) 2x,/* 支持image-set的浏览器的[2倍Retina屏幕] */
          url(3x.png) 3x/* 支持image-set的浏览器的[3倍Retina屏幕] */
        );
      }


      /*4 4s*/
      @media only screen and (device-height :480px) and (-webkit-device-pixel-ratio:2){}
      
      // 4 4s
      @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {}

      // 5 5s
      @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {}

      /* 兼容iphone5 */
      @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){}
        
      /*iphone 6*/
      @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){}
          
      /*iphone 6 plus*/  
        @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){}

        /*魅族*/
        @media only screen and (min-device-width :1080px) and (-webkit-min-device-pixel-ratio : 2.5){ }

        /*mate7*/
        @media only screen and (min-device-width :1080px) and (-webkit-min-device-pixel-ratio : 3){ }

        

    34、rem布局
      (function (doc, win) {
        var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
          };

        // Abort if browser does not support addEventListener
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);

    35、屏幕旋转的事件和样式 http://blog.163.com/lzyi_117/blog/static/117925906201721111141438/（软键盘与定位）
      //JS处理
      function orientInit(){
          var orientChk = document.documentElement.clientWidth >   document.documentElement.clientHeight?'landscape':'portrait';
          if(orientChk =='lapdscape'){
              //这里是横屏下需要执行的事件
          }else{
              //这里是竖屏下需要执行的事件
          }
      }
      orientInit();
      window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
          setTimeout(orientInit, 100);
      },false) 
      //CSS处理
      //竖屏时样式
      @media all and (orientation:portrait){   }
      //横屏时样式
      @media all and (orientation:landscape){   }