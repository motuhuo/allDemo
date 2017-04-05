<template>
  <div class="ratings">
  	我是ratings
  	<child2 @messageOne="recieveMessage"></child2>
    {{ msg | placeholder('Text if msg is missing') }} 
  </div>
</template>

<script type="ecmascript-6">
import child2 from '@/components/child2/child2'

  export default {
    data () {
      return {
        msg: 'ABC'
      }
    },
	  components: {
      child2
    },
    methods: {
      recieveMessage: function (text) {
        alert('监听到子组件变化'+text);
      }
    }
	}
</script>

<style lang="stylus" rel="stylesheet"></style>
