<template>
  <div class="timeline">
    <one-status></one-status>
  </div>
</template>

<script>
import OneStatus from '@/components/one_status'

export default {
  data () {
    return {
    }
  },
  components: {
    OneStatus
  },
  name: 'timeline'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
