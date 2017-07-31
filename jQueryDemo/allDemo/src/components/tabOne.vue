<template>
  <div class="tabOne">
    <!-- mock数据的引用 -->
    <ul>
      <li v-for='item in users'>{{item.name}}</li>
    </ul>
    <!-- 获取元素 -->
    <div class="dome" ref='dom'>元素</div>
    <!-- 获取位置 -->
    <div class="getPosition" @click='mouseUp'></div>
    <!-- js调协高度 -->
    <div ref='domHeight' class="domHeight">设置高度</div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import Mock from 'mockjs'
import data2 from '@/mock/mock.js'
export default {
  name: 'hello',
  data () {
    return {
      users: []
    }
  },
  methods: {
    mouseUp (e) {
      console.log('子Y：' + e.pageY)
      var rect = e.target.getBoundingClientRect()
      console.log('父Y：' + rect.top)
      console.log('距父位置Y：' + Number(e.pageY - rect.top))
      console.log('子X:' + e.pageX)
      console.log('父X:' + rect.left)
      console.log('距父位置X:' + Number(e.pageX - rect.left))
    }
  },
  mounted () {
    console.log(data2)
    for (let i = 0; i < 10; i++) {
      this.users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
      }))
      console.log(this.$refs.dom.innerHTML)
      // 设置css
      // this.$refs.domHeight.style.cssText = 'height:100px; border:1px solid red'
      this.$refs.domHeight.setAttribute('style', 'height:100px; border:1px solid red')
      // 去除属性border
      this.$refs.domHeight.style.removeProperty('border')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  clear: both;
  overflow: hidden;
}
ul li{
  float: left;
  width: 200px;
  margin-right: 20px;
}
.getPosition {
  width: 500px;
  height: 400px;
  margin-left: 10px;
  border: 1px solid red;
}
.domHeight {
  background: #ccc;
}
</style>
