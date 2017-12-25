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
      statuses: [],
      since_id: 0,
      listener: null
    }
  },
  components: {
    OneStatus
  },
  mounted () {
    this._getTimeline()
    this.listener = this.$client.stream('streaming/public/local')

    let self = this
    this.listener.on('message', msg => {
      if (msg.event === 'update') {
        self.statuses.unshift(msg.data)
        self.$forceUpdate()
      }
      if (msg.event === 'delete') {
        self.statuses.some(function (value, i) {
          if (value.id === msg.data) {
            self.statuses.splice(i, 1)
            self.$forceUpdate()
          }
        })
      }
    })
  },
  methods: {
    _getTimeline () {
      let self = this
      this.$client.get('timelines/public?local=true', function (err, data, res) {
        if (err) {
          console.log(err)
          return
        }
        self.statuses = self.statuses.concat(data)
      })
    }
  },
  name: 'timeline'
}
</script>

<style>
</style>
