<template>
  <div class="account">
    <div class="account-all">
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
        <div class="account-action-bar_content" @click="displayThing='status'">
          <p>
            投稿
          </p>
          <strong style="font-size: 22px">{{ accountInfo.statuses_count }}</strong>
        </div>
        <div class="account-action-bar_content" @click="displayThing='following'">
          <p>
            フォロー
          </p>
          <strong style="font-size: 22px">{{ accountInfo.following_count }}</strong>
        </div>
        <div class="account-action-bar_content" @click="displayThing='follower'">
          <p>
            フォロワー
          </p>
          <strong style="font-size: 22px">{{ accountInfo.followers_count }}</strong>
        </div>
      </div>
      <div class="account-timeline" v-if="displayThing === 'status'">
        <div v-for="status in accountStatuses" :key="status.id">
          <one-status :status="status"></one-status>
        </div>
      </div>
      <div class="follows" v-if="displayThing === 'following'">
        <div v-for="follower in accountFollowing" :key="follower.id">
          <follow-account :account="follower"></follow-account>
        </div>
      </div>
      <div class="follows" v-if="displayThing === 'follower'">
        <div v-for="follower in accountFollowers" :key="follower.id">
          <follow-account :account="follower"></follow-account>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'
import FollowAccount from '@/components/ContentModal/follow_account'

export default {
  props: {
    accountId: {}
  },
  data () {
    return {
      accuontInfo: {},
      accountStatuses: [],
      accountFollowers: [],
      accountFollowing: [],
      displayThing: 'status'
    }
  },
  mounted () {
    this.getAccount()
    this.getStatuses()
    this.getFollowers()
    this.getFollowing()
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
          self.accountStatuses = resp.data
          this.$forceUpdate()
        })
    },
    getFollowers () {
      let self = this
      this.$client.get('accounts/' + this.accountId + '/followers?limit=80', {})
        .then(resp => {
          self.accountFollowers = resp.data
          this.$forceUpdate()
        })
    },
    getFollowing () {
      let self = this
      this.$client.get('accounts/' + this.accountId + '/following?limit=80', {})
        .then(resp => {
          self.accountFollowing = resp.data
          this.$forceUpdate()
        })
    }
  },
  components: {
    OneStatus,
    FollowAccount
  },
  name: 'account'
}
</script>

<style lang="sass">
$border-color: rgb(44, 48, 57)
.account
  height: 80vh

.account-all
  +flex-center
  flex-flow: column

  position: relative
  background-color: rgb(30, 33, 40)

.account-info
  +flex-center
  flex-flow: column
  height: 285px

.account-icon
  border-radius: 48px

.account-header
  position: absolute
  left: 0
  top: 0

  height: 285px

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

  top: 2px
  line-height: 36px
  justify-content: center

  border-top: solid 2px $border-color
  border-bottom: solid 2px $border-color
  &_content
    padding: 0px 36px
    cursor: pointer
    border-left: solid 1px $border-color
    border-right: solid 1px $border-color

.account-timeline
  width: 100%

.follows
  width: 100%
</style>
