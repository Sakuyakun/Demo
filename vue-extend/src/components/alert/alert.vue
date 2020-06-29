<template>
  <div class="visible" v-show="visible">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'alert',
  data () {
    return {
      visible: false,
      text: 'warning warning warning'
    }
  },
  mounted () {
    this.$once('hook:beforeDestroy', this.$_handleClose)
  },
  methods: {
    $_handleClose () {
      window.alert('disarm the alarm')
    }
  }
}
</script>

<style scoped>
.visible{
  color: red;
}
</style>