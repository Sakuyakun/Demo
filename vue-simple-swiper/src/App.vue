<template>
  <div id="app">
    <swiper v-model="selected">
      <swiper-item name="item1">
        <div class="item">
          <span>item1</span>
        </div>
      </swiper-item>

      <swiper-item name="item2">
        <div class="item">
          <span>item2</span>
        </div>
      </swiper-item>

      <swiper-item name="item3">
        <div class="item">
          <span>item3</span>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import swiper from './components/swiper'
import swiperItem from './components/swiperItem'

export default {
  name: 'App',
  components: {
    swiper,
    swiperItem
  },
  data () {
    return {
      selected: 'item1'
    }
  }
}
</script>

<style>
.item{
  background: #aad2e6;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
