<template>
  <div id="app">
    demo
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted () {
    const alert = this.$alert()
    
    setTimeout(() => {
      alert.close()
    }, 1000)
  }
}
</script>

<style>
</style>
