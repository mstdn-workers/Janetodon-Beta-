<template>
  <div :class="{ timeline: true, 'media-appear': isMediaExist, 'spoiler-appear': isSpoilerActive}">
    <a :class="['to-top', isTop ? 'to-top_delete' : 'to-top_active']" @click="moveToTop">最新tootへ戻る</a>
    <div  v-for="status in statuses" :key="status.id" v-if="!isExcludeStatus(status)">
      <one-status :status="status"></one-status>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'

export default {
  props: {
    isMediaExist: {},
    isSpoilerActive: {},
    excludeWords: []
  },
  data () {
    return {
      statuses: [],
      maxId: 0,
      listener: null,
      isGettingPast: false,
      oldScrollTop: 0,
      isTop: true
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
      self.isTop = (document.body.scrollTop === 0)

      if (window.innerHeight + document.body.scrollTop >= document.documentElement.scrollHeight && !self.isGettingPast) {
        console.log('get')
        self.isGettingPast = true
        document.body.scrollTop -= 1
        self.oldScrollTop = document.body.scrollTop
        self.getTimeline(self.maxId)
      }
    })

    var moment = require('moment')

    // momentの設定
    moment.updateLocale('ja', {
      relativeTime: {
        future: '%s分後',
        past: '%s前',
        s: '数秒',
        ss: '%d秒',
        m: '1分',
        mm: '%d分',
        h: '1時間',
        hh: '%d時間',
        d: '1日',
        dd: '%d日',
        M: '1ヶ月',
        MM: '%dヶ月',
        y: '1年',
        yy: '%d年'
      }
    })

    moment.relativeTimeThreshold('s', 55)
    moment.relativeTimeThreshold('ss', 20)
    moment.relativeTimeThreshold('m', 44)
    moment.relativeTimeThreshold('h', 20)
    moment.relativeTimeThreshold('d', 25)
    moment.relativeTimeThreshold('M', 10)

    moment.locale('ja')
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
    },
    moveToTop () {
      document.body.scrollTop = 0
    },
    isExcludeStatus (status) {
      let result = false
      this.excludeWords.some(function (value) {
        let regexp = new RegExp(value['word'])

        if (status.content.match(regexp) || status.spoiler_text.match(regexp)) {
          result = true
          return true
        }
      })
      return result
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
  flex-flow: column
  // 何故か画面いっぱいに背景色が広がらないため
  background-color: $main-background
  width: 95%

.media-appear
  transform: translateY(128px)
  &.spoiler-appear
    transform: translateY(128px + 32px)
.spoiler-appear
  transform: translateY(34px)

.to-top
  position: fixed
  left: 48%
  top: 320px
  background-color: rgb(124, 124, 124)!important
  color: rgb(50, 50, 50)!important
  font-size: 20px
  padding: 10px 20px 10px 20px
  transition: all 300ms 0s ease

  border-radius: 20px

  z-index: 200
  &:hover
    background-color: rgb(124, 124, 124) - rgb(20, 20, 20)!important
    color: rgb(50, 50, 50)!important

  &_delete
    transition: all 100ms 0s ease
    transform: scale(0)

  &_active
    transform: scale(1)
    animation-name: appearTop
    animation-duration: 400ms
    animation-timing-function: ease


@keyframes appearTop
  50%
    transform: scale(1.4)
  60%
    transform: scale(0.8)
  70%
    transform: scale(1.1)
  80%
    transform: scale(0.9)
  90%
    transform: scale(1.05)
</style>
