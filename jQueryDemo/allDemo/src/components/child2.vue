<template>
  <div class="child2">
    child2
    <br>
    <input type="text" placeholder="请输入值" v-model='msg' @change='onInput'>
    <button @click='getOne'>获取one数据</button>
    来自组件1的值：{{getOneMsg}}
    <br>
  </div>
</template>

<script>
import bus from '@/components/bus'
export default {
  data () {
    return {
      msg: '',
      getOneMsg: ''
    }
  },
  methods: {
    onInput: function () {
      if (this.msg.trim()) {
        this.$emit('messageTwo', this.msg)
      }
    },
    getOne: function () {
      console.log('子组件1')
    }
  },
  created () {
    bus.$on('childMsg', (one) => {
      this.getOneMsg = one
      console.log('获取组件1的值')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
