<template>
  <div id="app">
    <First />
  </div>
</template>

<script>
import First from './components/First.vue'

export default {
  name: 'app',
  components: {
    First
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
