<template>
  <div class="timeline">
    <one-status :username="username" :displayName="displayName" :status="status"></one-status>
    <one-status :username="username" :displayName="displayName" :spoilerText="spoilerText" :status="status"></one-status>
  </div>
</template>

<script>
import OneStatus from '@/components/one_status'

export default {
  data () {
    return {
      username: 'user',
      displayName: 'と',
      spoilerText: '警告',
      status: 'This is a status'
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
