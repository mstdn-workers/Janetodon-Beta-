<template>
  <div class="notifications">
    <a :class="{ 'notifications_button': true, 'notifications_active': isSelecting}">
      <b-icon icon="bell" size="is-large"></b-icon>
    </a>
  </div>
</template>

<script>
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
        if (event.target.parentNode.parentNode.className === 'notifications_button') {
          self.isSelecting = !self.isSelecting
        } else {
          self.isSelecting = false
        }
      })
    },
    methods: {
      getNotifications () {
        let self = this

        this.$client.get('notifications', {})
          .then(resp => {
            self.notifications = self.notifications.concat(resp.data)
          })
      }
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
    color: rgb(232, 213, 45)!important
    &:hover
      color: rgb(232, 213, 45)!important
  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important

</style>
