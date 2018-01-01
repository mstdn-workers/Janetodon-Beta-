<template>
  <div :class="{ timeline: true, 'media-appear': isMediaExist, 'spoiler-appear': isSpoilerActive}">
    <div  v-for="status in reverseStatuses">
      <one-status :status="status"></one-status>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'

export default {
  props: {
    isMediaExist: {},
    isSpoilerActive: {}
  },
  data () {
    return {
      statuses: [],
      maxId: 0,
      listener: null,
      isGettingPast: false,
      oldScrollTop: 0
    }
  },
  components: {
    OneStatus
  },
  computed: {
    reverseStatuses: function () {
      let reverseStatuses = this.statuses.slice() // 引数無しで配列の値渡しができる
      return reverseStatuses.reverse()
    }
  },
  mounted () {
    this.getTimeline(null)
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

    document.addEventListener('scroll', function (event) {
      console.log()
      if (window.innerHeight + document.body.scrollTop >= document.documentElement.scrollHeight && !self.isGettingPast) {
        console.log('get')
        self.isGettingPast = true
        document.body.scrollTop -= 1
        self.oldScrollTop = document.body.scrollTop
        self.getTimeline(self.maxId)
      }
    })
  },
  updated () {
    if (this.isGettingPast) {
      this.isGettingPast = false
      document.body.scrollTop = this.oldScrollTop
    }
  },
  methods: {
    getTimeline (maxId) {
      let self = this
      this.$client.get('timelines/public?local=true&limit=40' + (maxId ? '&max_id=' + maxId : ''), {}, function (err, data, res) {
        if (err) {
          console.log(err)
          return
        }
        self.statuses = self.statuses.concat(data)
        self.maxId = data[data.length - 1].id
      })
    }
  },
  name: 'timeline'
}
</script>

<style lang="sass">
.timeline
  position: relative
  top: 306px
  transition: all 300ms 0s ease
  display: flex
  flex-flow: column-reverse
  // 何故か画面いっぱいに背景色が広がらないため
  background-color: $main-background
  width: 100%

.media-appear
  transform: translateY(128px)
.spoiler-appear
  transform: translateY(34px)
</style>
