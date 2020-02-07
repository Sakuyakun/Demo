<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.serverRequest.currComponentIs(this)
    this.serverRequest.login.loginIn({
      bindName: 'tableData',
      success: function (res, addData) {
        if (res.code === 1) {
          // 请求成功后的数据处理 res.data 为 bindValue
          addBindNameData(res.data)
        } else if (res.code === 2) {
          throw new Error(res.error)
        }
      },
      error: function (err) {
        // 错误处理
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
