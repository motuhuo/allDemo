export default {
  install (Vue) {
    Vue.prototype.$myName = 'nameChange'
    Vue.prototype.$myMethod = function () {
      console.log('myMethod')
    }
  }
}
