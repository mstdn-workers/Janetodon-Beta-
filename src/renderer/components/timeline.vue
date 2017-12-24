<template>
  <div class="timeline">
    <div  v-for="status in statuses">
      <one-status :status="status"></one-status>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/one_status'

export default {
  data () {
    return {
      statuses: []
    }
  },
  components: {
    OneStatus
  },
  mounted () {
    this._getTimeline()
  },
  methods: {
    _getTimeline () {
      let self = this
      this.$client.get('timelines/public?local=true', function (err, data, res) {
        if (err) {
          console.log(err)
          return
        }
        self.statuses = data
      })
    }
  },
  name: 'timeline'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
