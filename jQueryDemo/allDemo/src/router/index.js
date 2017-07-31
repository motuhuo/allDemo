import Vue from 'vue'
import Router from 'vue-router'
import oneTab from '@/components/oneTab'
import twoTab from '@/components/twoTab'
import threeTab from '@/components/threeTab'
import fourTab from '@/components/fourTab'
import caJian from '@/components/caJian'
import onePage from '@/components/onePage'
import twoPage from '@/components/twoPage'
import threePage from '@/components/threePage'

Vue.use(Router)
// 插件的写法
Vue.use(caJian)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'oneTab',
      component: oneTab
    },
    {
      path: '/oneTab',
      name: 'oneTab',
      component: oneTab
    },
    {
      path: '/twoTab',
      name: 'twoTab',
      component: twoTab
    },
    {
      path: '/threeTab',
      name: 'threeTab',
      component: threeTab
    },
    {
      path: '/fourTab',
      name: 'fourTab',
      component: fourTab,
      children: [
        {
          path: '/',
          component: onePage,
          name: 'onePage'
        },
        {
          path: '/fourTab/onePage',
          component: onePage,
          name: 'onePage'
        },
        {
          path: '/fourTab/twoPage',
          component: twoPage,
          name: 'twoPage'
        },
        {
          path: '/fourTab/threePage',
          component: threePage,
          name: 'threePage'
        }
      ]
    }
  ]
})
