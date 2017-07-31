<template>
  <div class="one">
  <!-- class绑定 -->
    <div class="static" v-bind:class="{active:isActive,'text-danger':hasError}">css共存</div>

    <div v-bind:class="[rightClass, errorClass]">数组方式</div>

    <div v-bind:style="styleObject">styleObject</div>
    <!-- 条件渲染 -->
    <div v-if="ok">yes</div>
    <div v-else>no</div>
    
    <div v-if="Math.random()>0.5">you can see</div>
    <div v-else>can't see</div>
    <!-- 列表渲染 -->
    <ul>
      <li v-for="item in items">{{item.message}}</li>
    </ul>
    <div class="line"></div>
    <ul>
      <li v-for="(item, index) in items">
        {{ok}} - {{index}} - {{item.message}}
      </li>
    </ul>
    <div class="line"></div>
    <!-- 添加 删除 -->
    <div>
      <input type="text" v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo">
      <ul>
        <li v-for="(todo, index) in todos" v-bind:key="index" v-bind:title="todo">{{todo}} {{index}} <button @click='todos.splice(index, 1)'>xx</button></li>
      </ul>
    </div>
    <!-- 显示过滤 排序 -->
    <ul>
      <li v-for="n in evenNumbers">{{n}}</li>
    </ul>
    <div class="line"></div>
    <!-- 事件处理 -->
    <button v-on:click="counter += 1">增加1</button>
    <p>这个按钮被点击了{{counter}}次</p>
    <button v-on:click="warn('form cannot be submitted yet', $event)">Submit</button>
    <div class="line"></div>
    <!-- 表单 -->
    <input type="text" v-model="message1" placeholder="add txt">
    <p>Message is: {{message1}}</p>

    <input type="checkbox" id="checkbox2" v-model="checked">
    <label for="checkbox2">{{checked}}</label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      hasError: false,
      rightClass: 'active',
      errorClass: 'text-danger',
      styleObject: {
        color: 'blue',
        fontSize: '0.3rem'
      },
      ok: true,
      items: [
        {message: 'foo'},
        {message: 'bar'}
      ],
      newTodoText: '',
      todos: [
        'Do the dishes',
        'Take out the trash',
        'Mow the lawn'
      ],
      numbers: [1, 2, 3, 4, 5, 6, 6],
      counter: 0,
      message1: '',
      checked: true
    }
  },
  methods: {
    addNewTodo: function () {
      this.todos.push(this.newTodoText)
      this.newTodoText = ''
    },
    warn: function (message, event) {
      // if (event) event.preventDefault()
      // console.log(event)
      alert(message)
    }
  },
  computed: {
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  width: 100%;
  display: block;
}
  .static {
    color: blue;
  }
  .active {
    color: pink;
  }
  .text-danger{
    color: red;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #e5e5e5;
  }
</style>
