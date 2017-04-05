<template>
  <div class="ratings">
  	我是ratings child2
  	<input type="text" v-model="msg" @change="onInput">
  </div>
</template>

<script type="ecmascript-6">
    export default {
	  data () {
	    return {
	    	msg: '请输入值'
	    }
	  },
    methods: {
      onInput: function () {
        if (this.msg.trim()) {
          this.$emit('messageOne', this.msg);
        }
      }
    }
	}
</script>

<style lang="stylus" rel="stylesheet"></style>
