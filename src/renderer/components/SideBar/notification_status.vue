<template>
  <div class="notification-status">
    <div class="notification-info">
      <article class="media">
        <figure class="media-left">
          <p class="image is-32x32">
            <img class="icon-image" :src="notification.account.avatar" />
          </p>
        </figure>
        <div class="notification-message">
          <icon :name="icon(notification.type)" :style="style(notification.type)" scale="1"></icon>
          <div class="notification-display" @click="wantAccount()">
              {{ displayName(notification.account) }}
          </div>
          <p class="notification-action-detail">
            さんが{{ displayNotification(notification.type) }}しました
          </p>
        </div>
      </article>
    </div>

    <one-status :status="status" v-if="status"></one-status>
    <div v-else style="border-bottom: 1px solid rgb(44, 71, 112);height: 40px">

    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'

export default {
  props: {
    notification: {}
  },
  data () {
    return {
      status: {}
    }
  },
  methods: {
    displayName (account) {
      let display = account.display_name
      if (display === '') {
        display = account.username
      }
      return display
    },
    displayNotification (type) {
      switch (type) {
        case 'reblog': return 'ブースト'
        case 'follow': return 'フォロー'
        case 'favourite': return 'お気に入りに登録'
        case 'mention' : return '返信'
      }
    },
    icon (type) {
      switch (type) {
        case 'reblog': return 'refresh'
        case 'follow': return 'users'
        case 'favourite': return 'star'
        case 'mention' : return 'reply'
      }
    },
    style (type) {
      switch (type) {
        case 'reblog': return 'color: rgb(60, 203, 223)'
        case 'follow': return 'color: rgb(60, 203, 223)'
        case 'favourite': return 'color: rgb(254, 187, 58)'
        case 'mention' : return 'color: rgb(60, 203, 223)'
      }
    },
    wantAccount () {
      this.$eventCaller.$emit('want-account', this.notification.account.id)
    }
  },
  beforeMount () {
    this.status = this.notification.status
  },
  components: {
    OneStatus
  },
  name: 'notification-status'
}
</script>

<style lang="sass">
.notification-status
  position: relative
  color: rgb(153, 149, 163)


.notification-info
  position: relative
  height: 40px
  width: 100%

  left: 60px
  top: 15px


.notification-message
  height: 32px
  width: 70%
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
  display: flex

.notification-display

  &:hover
    color: white
    text-decoration: underline
    cursor: pointer

.notification-action-detail
  text-overflow: ellipsis
  white-space: nowrap
  overflow: hidden
</style>
