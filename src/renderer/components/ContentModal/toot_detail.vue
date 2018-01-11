<template>
  <div class="toot-detail">
    <one-status class="ancestor" v-for="status in ancestors" :key="status.id" :status="status"></one-status>
    <toot-detail-main :status="status" v-if="status"></toot-detail-main>
    <one-status class="decendant" v-for="status in descendants" :key="status.id" :status="status"></one-status>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'
import TootDetailMain from '@/components/ContentModal/toot_detail_main'

export default {
  props: {
    id: {}
  },
  data () {
    return {
      status: null,
      ancestors: [],
      descendants: []
    }
  },
  mounted () {
    this.getStatus()
    this.getContext()
  },
  methods: {
    getStatus () {
      let self = this
      this.$client.get('statuses/' + this.id, {})
        .then(resp => {
          self.status = resp.data
          self.$forceUpdate()
        })
    },
    getContext () {
      let self = this
      this.$client.get('statuses/' + this.id + '/context', {})
        .then(resp => {
          self.ancestors = resp.data.ancestors
          self.descendants = resp.data.descendants
          self.$forceUpdate()
        })
    }
  },
  components: {
    OneStatus,
    TootDetailMain
  },
  name: 'toot-detail'
}
</script>

<style lang="sass">
.toot-detail
  background-color: $main-background
</style>
