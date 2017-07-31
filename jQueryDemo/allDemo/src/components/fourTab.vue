<template>
  <div class="fourTab">
    <div class="aBox">
      <router-link to="/fourTab/onePage" :class="($route.path==='/fourTab' ? 'router-link-exact-active':'')">onePage</router-link>
      <router-link to="/fourTab/twoPage">twoPage</router-link>
      <router-link to="/fourTab/threePage">threePage</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    console.log(this.$route.path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aBox {
  clear: both;
  overflow: hidden;
}
</style>
