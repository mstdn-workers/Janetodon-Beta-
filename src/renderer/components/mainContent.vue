<template>
  <!-- undefinedに!!をつけるとfalseに他はtrueになる -->
  <div class="main" @dragenter="isFileEnter=true" @dragover="isFileEnter=true" @dragleave="isFileEnter=false"  @drop="isFileEnter=false">
    <div class="side-bar">
      <user-select></user-select>
      <notifications></notifications>
    </div>

    <div class="content">
      <toot :isFileEnter="isFileEnter" @media-change="onMediaChange" @spoiler-change="onSpoilerChange"></toot>
      <timeline :isMediaExist="isMediaExist" :isSpoilerActive="isSpoilerActive"></timeline>
    </div>
    <div class="modal-info">
      <b-modal :active.sync="isAccountModalActive">
        <account :accountId="424"></account>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Toot from '@/components/Toot/toot'
import Timeline from '@/components/Timeline/timeline'
import UserSelect from '@/components/SideBar/user_select'
import Notifications from '@/components/SideBar/notification'
import Account from '@/components/ContentModal/account'

export default {
  data () {
    return {
      isFileEnter: false,
      isMediaExist: false,
      isSpoilerActive: false,
      isAccountModalActive: true,
      isTootModalActive: false
    }
  },
  beforeCreate () {
    if (!this.$client) {
      this.$router.push({ name: 'index' })
    }
  },
  components: {
    Toot,
    Timeline,
    UserSelect,
    Notifications,
    Account
  },
  methods: {
    onMediaChange (isMediaExist) {
      this.isMediaExist = isMediaExist
    },
    onSpoilerChange (isSpoilerActive) {
      this.isSpoilerActive = isSpoilerActive
    }
  },
  name: 'main-content'
}
</script>

<style lang="sass">
.main
  display: flex

.content
  display: flex
  position: relative
  width: 100%

  left: 64px

.side-bar
  width: 64px
  height: 100%

  background-color: $side-bar-back

  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5)
  z-index: 1000

  position: fixed

  top: 60px

.icon-image
  border-radius: 24px

.modal-info
  z-index: 9999
</style>
