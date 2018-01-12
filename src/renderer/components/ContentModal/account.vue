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
        <action-bar-content :display="'ツイート'" :choice="'status'" :count="accountInfo.statuses_count" @click="choiceDisplayThing"></action-bar-content>
        <action-bar-content :display="'フォロー'" :choice="'following'" :count="accountInfo.following_count" @click="choiceDisplayThing"></action-bar-content>
        <action-bar-content :display="'フォロワー'" :choice="'follower'" :count="accountInfo.followers_count" @click="choiceDisplayThing"></action-bar-content>
      </div>
      <div class="account-timeline" v-if="displayThing === 'status'">
        <one-status v-for="status in accountStatuses" :key="status.id" :status="status"></one-status>
      </div>
      <div class="follows" v-if="displayThing === 'following'">
        <follow-account v-for="follower in accountFollowing" :key="follower.id" :account="follower"></follow-account>
      </div>
      <div class="follows" v-if="displayThing === 'follower'">
        <follow-account :account="follower" v-for="follower in accountFollowers" :key="follower.id"></follow-account>
      </div>
    </div>
  </div>
</template>

<script>
import OneStatus from '@/components/Timeline/one_status'
import FollowAccount from '@/components/ContentModal/follow_account'
import ActionBarContent from '@/components/ContentModal/account_action_bar_content.vue'

export default {
  props: {
    id: {}
  },
  data () {
    return {
      accountInfo: {},
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
      this.$client.get('accounts/' + this.id, {})
        .then(resp => {
          self.accountInfo = resp.data
          self.$forceUpdate()
        })
    },
    getStatuses () {
      let self = this
      this.$client.get('accounts/' + this.id + '/statuses?limit=40', {})
        .then(resp => {
          self.accountStatuses = resp.data
          self.$forceUpdate()
        })
    },
    getFollowers () {
      let self = this
      this.$client.get('accounts/' + this.id + '/followers?limit=80', {})
        .then(resp => {
          self.accountFollowers = resp.data
          self.$forceUpdate()
        })
    },
    getFollowing () {
      let self = this
      this.$client.get('accounts/' + this.id + '/following?limit=80', {})
        .then(resp => {
          self.accountFollowing = resp.data
          self.$forceUpdate()
        })
    },
    choiceDisplayThing (choice) {
      this.displayThing = choice
    }
  },
  components: {
    OneStatus,
    FollowAccount,
    ActionBarContent
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
  background-color: $main-background

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

.account-timeline
  width: 100%

.follows
  width: 100%
</style>
