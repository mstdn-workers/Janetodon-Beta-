<template>
  <div class="main" @dragenter="isFileEnter=true" @dragover="isFileEnter=true" @dragleave="isFileEnter=false"  @drop="isFileEnter=false">
    <toot :isFileEnter="isFileEnter" @media-change="onMediaChange"></toot>
    <timeline :isExist="isExist"></timeline>
  </div>
</template>

<script>
import Toot from '@/components/Toot/toot'
import Timeline from '@/components/Timeline/timeline'

export default {
  data () {
    return {
      isFileEnter: false,
      isExist: false
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
  methods: {
    onMediaChange (isExist) {
      this.isExist = isExist
    }
  },
  name: 'main-content'
}
</script>

<style>
.main {
  display: flex;
}
</style>
