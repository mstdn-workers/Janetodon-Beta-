<template>
  <!-- undefinedに!!をつけるとfalseに他はtrueになる -->
  <div class="main" @dragenter="isFileEnter=true" @dragover="isFileEnter=true" @dragleave="isFileEnter=false"  @drop="isFileEnter=false">
    <div class="side-bar">
      <user-select></user-select>
      <notifications></notifications>
      <config></config>
    </div>

    <div class="content">
      <toot :isFileEnter="isFileEnter" @media-change="onMediaChange" @spoiler-change="onSpoilerChange"></toot>
      <timeline :isMediaExist="isMediaExist" :isSpoilerActive="isSpoilerActive" :excludeWords="excludeWords"></timeline>
    </div>
    <div class="modal-info">
      <b-modal :active.sync="isModalActive" @close="isTootActive = false;isAccountActive = false;">
        <toot-detail :id="tootId" v-if="isTootActive"></toot-detail>
        <account :id="accountId" v-else></account>
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
import TootDetail from '@/components/ContentModal/toot_detail'
import Config from '@/components/SideBar/config'

export default {
  data () {
    return {
      isFileEnter: false,
      isMediaExist: false,
      isSpoilerActive: false,
      isModalActive: false,
      isAccountActive: false,
      isTootActive: false,
      accountId: null,
      tootId: null,
      excludeWords: []
    }
  },
  beforeCreate () {
    let self = this
    if (!this.$client) {
      this.$router.push({ name: 'index' })
    }

    this.$eventCaller.$on('want-account', function (id) {
      if (self.isModalActive) {
        self.resetModal('want-account', id)
      } else {
        self.accountId = id
        self.isAccountActive = true
        self.isModalActive = true
      }
    })

    this.$eventCaller.$on('want-toot', function (id) {
      if (self.isModalActive) {
        self.resetModal('want-toot', id)
      } else {
        self.tootId = id
        self.isTootActive = true
        self.isModalActive = true
      }
    })

    this.$eventCaller.$on('change-exclude', function (words) {
      self.excludeWords = words
    })

    this.$db.find({ type: 'exclude_word' }).exec(function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      self.excludeWords = data
    })
  },
  components: {
    Toot,
    Timeline,
    UserSelect,
    Notifications,
    Account,
    TootDetail,
    Config
  },
  methods: {
    onMediaChange (isMediaExist) {
      this.isMediaExist = isMediaExist
    },
    onSpoilerChange (isSpoilerActive) {
      this.isSpoilerActive = isSpoilerActive
    },
    resetModal (call, id) {
      this.accountId = null
      this.isTootActive = false
      this.isAccountActive = false
      this.isModalActive = false
      this.$forceUpdate()

      let self = this
      setTimeout(function () {
        self.$eventCaller.$emit(call, id)
      }, 500)
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
