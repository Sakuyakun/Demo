<template>
  <div class="First">
    I am First
    <middle
      :attr1="attr1"
      :attr2="attr2"
      @click="handleLastCompEvent">
    </middle>
  </div>
</template>

<script>
import middle from './Middle'

export default {
  name: 'HelloWorld',
  components: {
    middle
  },
  data () {
    return {
      attr1: '来自 First 组件的值 1',
      attr2: '来自 First 组件的值 2'
    }
  },
  methods: {
    handleLastCompEvent () {
      alert('tigger first method success')
    }
  }
}
</script>

<style scoped>
.First{
  width: 400px;
  border: 4px solid #4a4a4a;
  padding: 20px;
  margin: auto;
}
</style>
