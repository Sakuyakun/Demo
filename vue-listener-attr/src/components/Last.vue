<template>
  <div class="Last">
    <div>I am last</div>
    <div @click="tiggerFirstCompMethod">{{ attr2 }}</div>
  </div>
</template>

<script>
export default {
  props: ['attr2'],
  methods: {
    tiggerFirstCompMethod () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.Last{
  border: 4px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}
</style>