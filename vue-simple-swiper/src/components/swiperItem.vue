<template>
  <transition>
    <div class="swiper-item" v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'swiper-item',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    isShow () {
      return this.selected === this.name
    }
  },
  data () {
    return {
      selected: ''
    }
  }
}
</script>

<style>
.swiper-item{
  width: 100%;
  height: 100%;
}

/* transition */
.v-enter-active,
.v-leave-active{
  transition: all 1s linear;
}
.v-leave-to{
  transform: translate(-100%);
}
.v-enter{
  transform: translate(100%);
}
.v-enter-active{
  position: absolute;
  top: 0;
  left: 0;
}
</style>