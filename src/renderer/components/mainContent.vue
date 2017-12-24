<template>
  <div>
    <div class="main">
      hoge
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    // undefinedに!をつけるとtrueになる
    if (!this.$client) {
      this.$router.push({ name: 'index' })
    }
  },
  name: 'main-content'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
