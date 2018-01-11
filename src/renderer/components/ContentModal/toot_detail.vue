<template>
  <div class="toot-detail">
    <one-status class="ancestor" v-for="status in ancestors" :key="status.id" :status="status"></one-status>
    <div class="main-status" id="main-status">

    </div>
    <one-status class="decendant" v-for="status in descendants" :key="status.id" :status="status"></one-status>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'

export default {
  props: {
    id: {}
  },
  data () {
    return {
      status: {},
      ancestors: [],
      descendants: []
    }
  },
  methods: {
    getStatus () {
      let self = this
      this.$client.get('statuses/' + this.id, {})
        .then(resp => {
          self.status = resp.data
          this.$forceUpdate()
        })
    },
    getContext () {
      let self = this
      this.$client.get('statuses/' + this.id + '/context', {})
        .then(resp => {
          self.ancestors = resp.data.ancestors
          self.descendants = resp.data.descendants
          this.$forceUpdate()
        })
    }
  },
  components: {
    OneStatus
  },
  name: 'toot-detail'
}
</script>

<style lang="sass">
</style>
