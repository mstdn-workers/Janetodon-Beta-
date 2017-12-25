<template>
  <div class="main" @dragenter="isFileEnter=true" @dragover="isFileEnter=true" @dragleave="isFileEnter=false"  @drop="isFileEnter=false">
    <toot :isFileEnter="isFileEnter"></toot>
    <timeline></timeline>
  </div>
</template>

<script>
import Toot from '@/components/toot'
import Timeline from '@/components/timeline'

export default {
  data () {
    return {
      isFileEnter: false
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
