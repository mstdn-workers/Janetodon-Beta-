<template>
  <div class="account-content">
    <div class="status-info" @click="wantAccount()" @mouseenter="isHoverName=true" @mouseleave="isHoverName=false">
      <div class="status-avatar">
        <div class="account-avatar icon-image" :style="avatarStyle">
        </div>
      </div>
      <span class="display-toot-info">
        <span class="display-name">
          <span :class="{ 'display-name_hover': isHoverName }">
            {{ displayName(status.account) }}
          </span>
          <span class="display-username">{{ '@' + status.account.acct }}</span>
        </span>
        <span class="date-diff"> {{ dateDifference }}</span>
      </span>
    </div>
    <div class="status-content" @click="onStatusClick">
      <div v-if="!status.spoiler_text">
        <span v-html="content"></span>
      </div>
      <div v-else>
        <span v-html="spoilerText"></span>
        <b-collapse :open="false">
          <button class="button is-small" slot="trigger" @click="onVisibleChange">
            {{ isVisible ? "隠す" : " 続きを見る" }}
          </button>
          <div>
            <span v-html="content"></span>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {}
  },
  data () {
    return {
      isVisible: false,
      isChangingVisiblity: false,
      isHoverName: false,
      dateDifference: null
    }
  },
  methods: {
    convertUrlToLink (str) {
      return str.replace(/https?:\/\/([^\s<>]*)/g, function () {
        return '<a href="' + arguments[0] + '" target="_blank">' + arguments[1].slice(0, 30) + '...' + '</a>'
      })
    },
    displayName (account) {
      let display = account.display_name
      if (display === '') {
        display = account.username
      }
      return display
    },
    wantAccount () {
      this.$eventCaller.$emit('want-account', this.status.account.id)
    },
    getDateDifference () {
      var moment = require('moment')
      let tootDate = moment(this.status.created_at)
      return tootDate.fromNow()
    },
    onStatusClick () {
      if (this.isChangingVisiblity) {
        this.isChangingVisiblity = false
        return
      }
      this.$eventCaller.$emit('want-toot', this.status.id)
    },
    onVisibleChange () {
      this.isVisible = ~this.isVisible
      this.isChangingVisiblity = true
    }
  },
  computed: {
    avatarStyle: function () {
      return "width): 48px; height: 48px;background-size: 48px 48px; background-image: url('" + this.status.account.avatar + "');"
    },
    spoilerText: function () {
      let displayText = this.status.spoiler_text.replace(/<(?!(p|br))(.|\s).*?>/g, '')
      return this.convertUrlToLink(displayText)
    },
    content: function () {
      let displayText = this.status.content.replace(/<(?!(p|br))(.|\s).*?>/g, '')
      return this.convertUrlToLink(displayText)
    },
    firstUrl: function () {
      return (this.status.spoiler_text.replace(/<(?!p)(.|\s).*?>/g, '') + this.status.content.replace(/<(?!p)(.|\s).*?>/g, '')).match(/https?:\/\/[^\s<>]*/)
    }
  },
  mounted () {
    let self = this

    if (!status.spoiler_text) {
      this.isVisible = true
    }

    self.dateDifference = self.getDateDifference()
    setInterval(function () {
      self.dateDifference = self.getDateDifference()
      self.$forceUpdate()
    }, 10 * 1000)
  },
  name: 'status-content'
}
</script>

<style lang="sass">
$action-active-color: rgb(25, 155, 179)

.status-info
  cursor: pointer

.status-avatar
  width: 48px
  height: 48px
  left: 10px
  position: absolute
  top: 10px

.account-avatar
  background: transparent no-repeat
  background-position: 50%
  background-clip: padding-box
  position: relative
  cursor: pointer

.display-toot-info
  display: block
  max-width: 100%
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap


.display-name
  display: inline-block
  max-width: 75%
  overflow: hidden
  text-overflow: ellipsis

  &_hover
    color: white
    text-decoration: underline


.display-username
  font-size: 14px
  color: gray

.status-content
  font-size: 15px
  line-height: 20px
  word-wrap: break-word
  font-weight: 400
  overflow: hidden
  white-space: pre-wrap
  cursor: pointer

.date-diff
  float: right
  position: relative
  right: 15px
  color: gray

</style>
