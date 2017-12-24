<template>
  <div class="main">
    <toot></toot>
    <timeline></timeline>
  </div>
</template>

<script>
import Toot from '@/components/toot'
import Timeline from '@/components/timeline'

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
    Toot,
    Timeline
  },
  name: 'main-content'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
