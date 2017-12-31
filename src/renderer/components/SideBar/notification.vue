<template>
  <div class="notifications">
    <a :class="{ 'notifications_button': true, 'notifications_active': isSelecting}">
      <b-icon icon="bell" size="is-large"></b-icon>
    </a>
    <div :class="[isSelecting ? 'notifications_timeline_active' : 'notifications_timeline_delete', 'notifications_timeline']" id="notification">
      <notification-status :notification="notification" v-for="notification in reverseNotifications"></notification-status>
    </div>
  </div>
</template>

<script>
import notificationStatus from '@/components/SideBar/notification_status'

export default {
  data () {
    return {
      isSelecting: false,
      notifications: []
    }
  },
  mounted () {
    let self = this
    this.getNotifications()

    const listener = this.$client.stream('streaming/user')

    listener.on('message', msg => {
      if (msg.event === 'notification') {
        self.notification = self.notifications.concat(msg.data)
      }
    })

    window.addEventListener('click', function (event) {
      if (event.target.closest('.notifications_button')) {
        self.isSelecting = !self.isSelecting
      } else if (!event.target.closest('.notifications')) {
        self.isSelecting = false
      }
    })
  },
  methods: {
    getNotifications () {
      let self = this

      this.$client.get('notifications', {})
        .then(resp => {
          console.log(resp.data)
          self.notifications = self.notifications.concat(resp.data)
        })
    }
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
</style>
