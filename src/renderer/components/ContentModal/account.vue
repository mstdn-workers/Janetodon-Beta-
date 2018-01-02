<template>
  <div class="account">
    <div class="account-info">
      <figure class="media-left">
        <p class="image is-96x96">
          <img class="account-icon" :src="accountInfo.avatar">
        </p>
        <p class="image account-header">
          <img class="account-header_img" :src="accountInfo.header" />
        </p>
      </figure>
      <strong>{{ displayName }}</strong>
      <small>@{{ accountInfo.acct }}</small>
      <div class="account-detail" v-html="accountInfo.note">
      </div>
    </div>

    <div class="account-action-bar">
      <div class="account-action-bar_content">
        <p>
          投稿
        </p>
        <strong style="font-size: 22px">{{ accountInfo.statuses_count }}</strong>
      </div>
      <div class="account-action-bar_content">
        <p>
          フォロー
        </p>
        <strong style="font-size: 22px">{{ accountInfo.following_count }}</strong>
      </div>
      <div class="account-action-bar_content">
        <p>
          フォロワー
        </p>
        <strong style="font-size: 22px">{{ accountInfo.followers_count }}</strong>
      </div>
    </div>
    <div class="account-timeline">
      <div v-for="status in accountStatuses" :key="status.id">
        <one-status :status="status"></one-status>
      </div>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'

export default {
  props: {
    accountId: {}
  },
  data () {
    return {
      accuontInfo: {},
      accountStatuses: []
    }
  },
  mounted () {
    this.getAccount()
    this.getStatuses()
  },
  computed: {
    displayName: function () {
      let display = this.accountInfo.display_name
      if (display === '') {
        display = this.accountInfo.username
      }
      return display
    }
  },
  methods: {
    getAccount () {
      let self = this
      this.$client.get('accounts/' + this.accountId, {})
        .then(resp => {
          self.accountInfo = resp.data
          this.$forceUpdate()
        })
    },
    getStatuses () {
      let self = this
      this.$client.get('accounts/' + this.accountId + '/statuses?limit=40', {})
        .then(resp => {
          console.log(resp.data)
          self.accountStatuses = resp.data
          this.$forceUpdate()
        })
    }
  },
  components: {
    OneStatus
  },
  name: 'account'
}
</script>

<style lang="sass">
.account
  +flex-center
  flex-flow: column

  position: relative
  background-color: rgb(30, 33, 40)

.account-info
  +flex-center
  flex-flow: column
.account-icon
  border-radius: 48px

.account-header
  position: absolute
  left: 0
  top: 0

  overflow: hidden

  &_img
    opacity: 0.2
    width: 100%
    height: 100%
    -o-object-fit: cover
    object-fit: cover

.account-detail
  text-align: center

.account-action-bar
  display: flex
  position: relative
  width: 100%

  flex: 1 1 auto

  top: 5px
  line-height: 36px
  justify-content: center
  &_content
    margin: 5px 36px

.account-timeline
  width: 100%
</style>
