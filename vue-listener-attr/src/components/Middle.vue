<template>
  <div class="Middle">
    <div>
      <div>I am middle</div>
      <div>{{ attr1 }}</div>
    </div>

    <last v-bind="$attrs" v-on="$listeners"></last>
  </div>
</template>

<script>
import last from './Last'

export default {
  components: {
    last
  },
  props: ['attr1'],
  // First 父组件中没有被继承的绑定属性会被作为普通的 HTML 属性应用在父元素上
  // 但如果在子组件设置 inheritAttrs 为 false，则没有被继承的绑定属性可以通过 $attr 对象获取
  inheritAttrs: false
}
</script>

<style scoped>
.Middle{
  border: 4px solid #929292;
  padding: 20px;
  margin-top: 20px;
}
</style>