<template>
  <div class="tabThree">
    <!-- transition -->
    <button @click="show = !show">slideBtn</button>
    <transition name='slide'>
      <p v-if='show' class='hello' key='1'>hello</p>
      <!-- <p v-if='show' key='2'>helloTwo</p> -->
    </transition>
    <transition name='slide2'>
      <p v-if='show' key='2'>helloTwo</p>
    </transition>
    <div class="line"></div>
    <!-- css3动画 -->
    <transition name='css3'>
      <p v-if='show' class="css3">css3动画</p>
    </transition>
    <!-- 上滑 -->
    <button @click="show2 = !show2">上滑</button>
    <div class="foldBox">
      <div class="contentOnt">
        内容
      </div>
      <transition name='fold'>
        <div v-show='show2' class="foldContent">
          fold内容1 <br>
          fold内容2 <br>
          fold内容3 <br>
          fold内容4 <br>
          fold内容5 <br>
          fold内容6 <br>
          fold内容7 <br>
          fold内容8 <br>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      show2: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line{
  border:1px solid red;
}
.hello {
  width: 200px;
  height: 40px;
  border:1px solid red;
}
.slide-enter-active {
  transition: all 0.3s ease
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
}
.slide-enter, .slide-leave-to {
  transform: translateX(10px);
  opacity: 0
}
.slide2-enter-active {
  transition: all 0.3s ease
}
.slide2-leave-active {
  transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
}
.slide2-enter, .slide2-leave-to {
  transform: translateY(10px);
  opacity: 0
}
.css3 {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  transform: scaleY(2);
}
.css3-enter-active {
  /*animation: css3-in 0.5s*/
  transition: all 0.3s ease;
}
.css3-leave-active {
  /*animation: css3-in 0.5s reverse*/
  /*transform: scaleX(2);*/
  transition: all 0.3s ease;
}
.css3-enter, .css3-leave-to {
  transform: scaleY(1);
}
/*@keyframes css3-in {
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.5);
  }
  100% {
    transform: scaleX(1);
  }
}*/
.foldBox {
  position: fixed;
  bottom: 0px;
  height: 100px;
  left: 0px;
  background:#ff8718;
  width: 100%;
  z-index: 10;
  /*overflow: hidden;*/
}
.contentOnt {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100px;
  background:#ff8718;
  width: 100%;
  color: #fff;
}
.foldContent {
  position: absolute;
  top: 0px;
  left: 0px;
  background: #ccc;
  color: #fff;
  width: 100%;
  z-index: -1;
  transform:translate3d(0,-100%,0);
}
.fold-enter-active,.fold-leave-active {
  transition:all 0.5s;
  transform:translate3d(0,-100%,0);
}
.fold-enter,.fold-leave-to {
  transform :translate3d(0,0,0)
}
</style>
