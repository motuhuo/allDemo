<template>
  <div class="tabTwo">
    tabTwo12
    <button @click='goTwoTab'>goTwoTab</button>
    <div class="line"></div>
    <p v-html='html'></p>
    <!-- 过滤器 -->
    <p>{{ 'name' | upper }}</p>
    <div class="line"></div>
    <input type="text" v-model="example0">
    <div class="line"></div>
    <input type="text" v-model="example1">
    <div class="line"></div>
    <input type="text" v-model="example2.inner0">
    <!-- 添加新属性 -->
    <div @click='addProp'>加入新属性</div>
    <ul>
      <!-- <li v-for="(item, index) in hots"><button class='btn' @click='item.price -=1'>-</button> {{item.price}} <button class='btn' @click='item.price +=1'>+</button> </li> -->
      <li v-for="(item, index) in hots"><button class='btn' @click='lesNum(index)'>-</button> {{item.price}} and {{item.count}} <button class='btn'  @click='addNum(index)'>+</button> </li>
    </ul>
    <div>简单逻辑</div>
    <!-- 3胜 ，1平 -->
    <ul class="wrap">
      <li v-for="item in list">{{item.number | result}}</li>
    </ul>
    <!-- count++ -->
    <p>{{countNum}}</p>
    <button @click="countNum ++">增加</button>
    <button @click="countNum --">减少</button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'hello',
  data () {
    return {
      html: "<span style='color : red;'>显示红色的字你就解析成功了</span>",
      example0: '',
      example1: '',
      example2: {
        inner0: 1,
        inner1: 2
      },
      hots: [
        {
          id: 166,
          price: 10
        },
        {
          id: 110,
          price: 4
        },
        {
          id: 100,
          price: 2
        }
      ],
      list: [
        {
          number: '3,1'
        },
        {
          number: '1'
        },
        {
          number: '3'
        },
        {
          number: '1,1'
        }
      ],
      countNum: 0
    }
  },
  methods: {
    goTwoTab () {
      this.$router.push('twoTab')
    },
    a (curVal, oldVal) {
      console.log(curVal, oldVal)
    },
    addProp () {
      this.hots.forEach(function (value, index, array) {
        // Vue.set(array[index], 'count', 1)
        Vue.set(value, 'count', 1)
      })
      console.log(this.hots)
    },
    lesNum (index) {
      if (this.hots[index].price > 0) {
        this.hots[index].price -= 1
      }
    },
    addNum (index) {
      this.hots[index].price += 1
      if (this.hots[index].count) {
        this.hots[index].count += 1
      }
    }
  },
  filters: {
    upper (msg) {
      return msg.toString().toUpperCase()
    },
    result (value) {
      var text = ''
      var listForSplit = value.split(',')
      for (var i = 0; i < listForSplit.length; i++) {
        console.log(listForSplit[i])
        switch (listForSplit[i]) {
          case '1': text += '平'
            break
          case '3': text += '胜'
            break
        }
      }
      return text
    }
  },
  watch: {
    example0 (curVal, oldVal) {
      console.log(curVal, oldVal)
    },
    // watch监控 example1改变值时，触发 a 函数
    example1: 'a',
    example2: {
      handler (curVal, oldVal) {
        console.log(curVal, oldVal)
      },
      deep: true
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line{
  width: 100%;
  height: 1px;
  background:#e5e5e5;
}
.btn {
  padding: 10px;
}
ul {
  clear: both;
  overflow: hidden;
}
</style>
