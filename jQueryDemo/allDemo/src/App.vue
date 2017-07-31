<template>
  <div class="app">
      <router-link to="/oneTab" :class="($route.path==='/' ? 'router-link-exact-active':'')">one(class绑定)</router-link>
      <router-link to="/twoTab?getItem=12&getItem2=234">组件</router-link>
      <router-link to="/threeTab">逻辑</router-link>
      <router-link to="/fourTab">路由</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$route.path)
  }
}
</script>

<style>

.tabBox {
  width: 100%;
  height: 1rem;
  background: #f18181;
  font-size: 0.24rem;
}
.app a {
  display: inline-block;
  float: left;
  width: 25%;
  height: 100%;
  box-sizing:border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.router-link-exact-active{
  color: red;
}
</style>
