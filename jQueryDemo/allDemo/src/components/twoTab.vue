<template>
  <div class="two">
    组件 / 插件 / 自定义事件 / 传值
    <child :number="goNum" v-on:sendMsg='showGetMsg'></child>
    {{getData}}
    <child2 v-on:messageTwo='twoMessage' ></child2>
    <div class="line"></div>
    <child3></child3>
    <div class="line"></div>
    <child3></child3>
    <div class="line"></div>
    <child3></child3>
    <div class="line"></div>
    <p>总数： {{total}}</p>
    <allBtn v-on:increment='incrementTotal'></allBtn>
    <allBtn v-on:increment='incrementTotal'></allBtn>
    <div class="line"></div>
    <!-- 数据更新 -->
    <button @click='updateMessage'>更新数据</button>
    <div class="example" ref='example'>{{newMessage}}</div>
    <!-- 过渡效果 -->
    <button v-on:click="show = !show">Toggle</button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
    <button @click="show2 = !show2">slide-fade</button>
    <transition name="slide-fade">
      <p style="width:100px;border:1px solid red" v-if="show2">hello2</p>
    </transition>
    <!-- 动画钩子 -->
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave" v-on:leave-cancelled="leaveCancelled">
      <p v-if="show2">动画测试</p>
    </transition>
    
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group name='list' tag='p'>
      <span v-for="item in items" v-bind:key='item' class="list-item">{{item}}</span>
    </transition-group>
    <div class="line"></div>
    <input type="text" v-focus>
    <div class="line"></div>
    <div v-demo="{color:'red', text:'hello'}">width</div>
  </div>
</template>

<script>
import child from '@/components/child'
import child2 from '@/components/child2'
import child3 from '@/components/child3'
import allBtn from '@/components/allBtn'
import Vue from 'vue'
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color)
  console.log(binding.value.text)
})
export default {
  data () {
    return {
      goNum: 123412341234,
      getData: '',
      total: 0,
      newMessage: '没有更新',
      show: true,
      show2: true,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      nextNum: 11
    }
  },
  components: {
    child,
    child2,
    child3,
    allBtn
  },
  methods: {
    showGetMsg: function (data) {
      this.getData = data
    },
    twoMessage: function (text) {
      console.log('监听子组件2变化：' + text)
    },
    incrementTotal: function () {
      this.total += 1
    },
    updateMessage: function () {
      this.newMessage = '更新完成'
      console.log(this.$refs.example.textContent === '没有更新')
      this.$nextTick(function () {
        console.log(this.$refs.example.textContent === '更新完成')
      })
    },
    beforeEnter: function (el) {
      console.log('beforeEnter')
    },
    enter: function () {
      console.log('enter')
    },
    afterEnter: function () {
      console.log('afterEnter')
    },
    enterCancelled: function () {
      console.log('enterCancelled')
    },
    beforeLeave: function () {
      console.log('beforeLeave')
    },
    leave: function () {
      console.log('leave')
    },
    afterLeave: function () {
      console.log('afterLeave')
    },
    leaveCancelled: function () {
      console.log('leaveCancelled')
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }
  },
  mounted () {
    // 插件写法
    console.log(this.$myName)
    this.$myMethod()
    // 获取Url参数 getItem & getItem2
    console.log('getItem:' + this.$route.query.getItem)
    console.log('getItem2:' + this.$route.query.getItem2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .slide-fade-enter-active {
    transition: all .3s ease
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .list-item {
    display: inline-block;
    margin: 10px;
  }
  .list-enter-active, .list-leave-active{
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
