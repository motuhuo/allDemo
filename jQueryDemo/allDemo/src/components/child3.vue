<template>
  <div class="child3">
    <button class="btn" v-on:click='counter += 1'>{{counter}}</button>
    <input type="text" v-focus>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  padding: 20px;
}
</style>
