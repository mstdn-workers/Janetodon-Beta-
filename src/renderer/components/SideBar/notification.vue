<template>
  <div class="notifications">
    <a :class="{ 'notifications_button': true, 'notifications_active': isSelecting}">
      <b-icon icon="bell" size="is-large" :custom-class="hasNewNotification ? 'notifications_vibe' : ''"></b-icon>
    </a>
    <div :class="[isSelecting ? 'notifications_timeline_active' : 'notifications_timeline_delete', 'notifications_timeline']" id="notification">
      <notification-status :notification="notification" v-for="notification in notifications" :key="notification.id"></notification-status>
    </div>
  </div>
</template>

<script>
import notificationStatus from '@/components/SideBar/notification_status'

export default {
  data () {
    return {
      isSelecting: false,
      notifications: [],
      hasNewNotification: false
    }
  },
  mounted () {
    let self = this
    this.getNotifications()

    const listener = this.$client.stream('streaming/user')

    listener.on('message', msg => {
      if (msg.event === 'notification') {
        console.log(msg)
        self.notifications = [msg.data].concat(self.notifications)

        if (!self.isSelecting) {
          self.hasNewNotification = true
        }
      }
    })

    window.addEventListener('click', function (event) {
      if (event.target.closest('.notifications_button')) {
        self.isSelecting = !self.isSelecting
        self.hasNewNotification = false
      } else if (!event.target.closest('.notifications')) {
        self.isSelecting = false
      }
    })
  },
  methods: {
    getNotifications () {
      let self = this

      this.$client.get('notifications?limit=30', {})
        .then(resp => {
          self.notifications = self.notifications.concat(resp.data)
        })
    }
  },
  updated () {
    let notificationTimeline = document.getElementsByClassName('notifications_timeline')[0]
    console.log(notificationTimeline)
    notificationTimeline.scrollTop = 0
  },
  computed: {
    reverseNotifications: function () {
      let reverseNotifications = this.notifications.slice() // 引数無しで配列の値渡しができる
      return reverseNotifications.reverse()
    }
  },
  components: {
    notificationStatus
  },
  name: 'notification'
}
</script>

<style lang="sass">
html body
.notifications
  +flex-center
  width: 64px
  height: 64px

  &_active
    color: rgb(254, 187, 58)!important
    &:hover
      color: rgb(254, 187, 58)!important
  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important

  &_vibe
    transform-origin: 24px 5px

    animation-name: ring
    animation-duration: 1200ms
    animation-timing-function: ease
    animation-iteration-count: infinite

  &_timeline
    position: absolute
    transition: all 200ms 0s ease
    display: flex
    flex-flow: column-reverse
    border: solid 5px white
    border-radius: 40px
    background-color: $main-background
    width: 80vw
    max-height: 80vh
    overflow: scroll
    top: 0px
    left: 64px
    transform-origin: -25px 90px
    padding: 10px

    &::-webkit-scrollbar
      display: none

    &:after
      content: ""
      display: block
      position: absolute
      width: 0
      height: 0
      border-style: solid
      border-width: 0 10px 20px
      border-color: transparent transparent rgb(102, 96, 135)
      top: 80px
      left: -25px
      transform: rotate(-90deg)

    &_active
      animation-name: notification_appear
      animation-duration: 300ms
      animation-timing-function: ease-in-out

    &_delete
      transform: scale(0)

@keyframes ring
  0%, 10%, 20%, 30%
    transform: rotate(30deg)
  5%, 15%, 25%, 35%
    transform: rotate(-30deg)
  40%
    transform: rotate(0deg)
</style>
