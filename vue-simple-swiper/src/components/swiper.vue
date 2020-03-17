<template>
  <div class="swiper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      current: ''
    }
  },
  watch: {
    value () {
      this.showEle()
    }
  },
  mounted () {
    this.names = this.$children.map(vm => vm.name)
    this.showEle()
    this.play()
  },
  beforeDestroy () {
    clearInterval(this.setPlayInter)
  },
  methods: {
    showEle () {
      this.current = this.value || this.$children[0].name
      this.$children.forEach(vm => {
        vm.selected = this.current
      })
    },
    play () {
      this.setPlayInter = setInterval(() => {
        let newIndex = this.names.indexOf(this.current) + 1
        this.$emit('input', this.names[newIndex])
      }, 3000)
    }
  }
}
</script>

<style>
.swiper{
  width: 640px;
  height: 360px;
  overflow: hidden;
  margin: 0 auto;
  border: 5px solid #dddddd;
  position: relative;
}
</style>