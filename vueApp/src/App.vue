<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods"><div class="content">商品</div></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings"><div class="content">评论</div></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller"><div class="content">商家</div></router-link>
      </div>
    </div>
    
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type='ecmascript-6'>
import header from './components/header/header.vue'
const ERR_Ok = 0;
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then(( response ) => {
      response = response.body;
      if (response.errno === ERR_Ok){
        this.seller = response.data;
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>
<!--  lang="stylus" rel="stylesheet"-->
<style lang="stylus" rel="stylesheet">
@import "./common/stylus/mixin.styl"
#app
  .tab
    display:flex
    width:100%
    height:40px
    border-1px(rgba(7,17,27,0.1))
    line-height:40px
    .tab-item
      flex:1
      text-align:center
      .content
        disable:block
      .router-link-active
        color:red
</style>
