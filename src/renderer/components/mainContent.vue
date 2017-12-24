<template>
  <div>
    <div class="main">
      <toot></toot>
    </div>
  </div>
</template>

<script>
import Toot from '@/components/Toot'

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
  components: {
    Toot
  },
  name: 'main-content'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
