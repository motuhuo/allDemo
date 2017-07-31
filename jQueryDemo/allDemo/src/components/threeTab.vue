<template>
  <div class="three">
    <!-- table左右切换 -->
    <ul class="table">
      <li :class="{active:active1=='1'}" @click='tabToggle(tabOne, 1)'>tabOne</li>
      <li :class="{active:active1=='2'}" @click='tabToggle(tabTwo, 2)'>tabTwo</li>
      <li :class="{active:active1=='3'}" @click='tabToggle(tabThree, 3)'>tabThree</li>
    </ul>
    <component :is='currentView'></component>
  </div>
</template>

<script>
import tabOne from '@/components/tabOne'
import tabTwo from '@/components/tabTwo'
import tabThree from '@/components/tabThree'
export default {
  data () {
    return {
      tabOne: 'tabOne',
      tabTwo: 'tabTwo',
      tabThree: 'tabThree',
      currentView: 'tabOne',
      active1: 1
    }
  },
  methods: {
    tabToggle: function (tabText, index) {
      this.currentView = tabText
      this.active1 = index
    },
    mouseUp (e) {
      // 获取点击位置
      console.log('子：' + e.pageY)
      var rect = e.target.getBoundingClientRect()
      console.log('父：' + rect.top)
      console.log('距父位置：' + Number(e.pageY - rect.top))
    }
  },
  components: {
    tabOne,
    tabTwo,
    tabThree
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  width: 100%;
  height: 50px;
  background:#ccc;
  clear: both;
}
.table li {
  box-sizing:border-box;
  width: 33.3%;
  float: left;
  height: 50px;
  line-height: 50px;
  border:1px solid #fff;
  text-align: center;
  cursor: pointer;
}
.table li.active {
  color: #fff;
}

</style>
