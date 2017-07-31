<template>
  <div class="child">
    {{number}}
    <button @click='sendMsgToParent'>向父组件传值</button>
    <br>
    <button @click='sendTwo'>传给兄弟组件</button>
    <button @click='changeOne'>改变组件1中的值</button>
  </div>
</template>

<script>
import bus from '@/components/bus'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toTwo: '来自组件1'
    }
  },
  props: {
    number: {
      type: Number
    }
  },
  methods: {
    sendMsgToParent: function () {
      this.$emit('sendMsg', 'the message is childOne')
    },
    sendTwo: function () {
      console.log('传给兄弟组件2')
      bus.$emit('childMsg', this.toTwo)
    },
    changeOne: function () {
      this.toTwo = '组件1的值发生改变'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
