<template>
  <div class="status">
    <div class="status-info">
      <div class="status-avatar">
        <div class="account-avatar icon-image" :style="avatarStyle">
        </div>
      </div>
      <span class="display-name">
        {{ displayName(status.account) }}
        <span class="display-username">{{ '@' + status.account.acct }}</span>
      </span>
    </div>
    <div class="status-content">
      <div v-if="!status.spoiler_text">
        <span v-html="content"></span>
      </div>
      <div v-else>
        <span v-html="spoilerText"></span>
        <b-collapse :open="false">
          <button class="button is-small" slot="trigger" @click="isVisible = ~isVisible">
            {{ isVisible ? "隠す" : " 続きを見る" }}
          </button>
          <div>
            <span v-html="content"></span>
          </div>
        </b-collapse>
      </div>
    </div>

    <action-bar :status="status"></action-bar>

    <image-gallery v-if="status.media_attachments.length !== 0" :media="status.media_attachments" :sensitive="status.sensitive"></image-gallery>
  </div>
</template>

<script>
import ImageGallery from '@/components/Timeline/image_gallery'
import ActionBar from '@/components/Timeline/action_bar'

export default {
  props: {
    status: {}
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    convertUrlToLink (str) {
      return str.replace(/https?:\/\/([^\s<>]*)/g, function () {
        console.log(arguments[1])
        return '<a href="' + arguments[0] + '" target="_blank">' + arguments[1].slice(0, 30) + '...' + '</a>'
      })
    },
    displayName (account) {
      let display = account.display_name
      if (display === '') {
        display = account.username
      }
      return display
    }
  },
  computed: {
    avatarStyle: function () {
      return "width): 48px; height: 48px;background-size: 48px 48px; background-image: url('" + this.status.account.avatar + "');"
    },
    spoilerText: function () {
      let displayText = this.status.spoiler_text.replace(/<(?!br)(.|\s).*?>/g, '')
      return this.convertUrlToLink(displayText)
    },
    content: function () {
      let displayText = this.status.content.replace(/<(?!br)(.|\s).*?>/g, '')
      return this.convertUrlToLink(displayText)
    }
  },
  components: {
    ImageGallery,
    ActionBar
  },
  name: 'one-status'
}
</script>

<style lang="sass">
$action-active-color: rgb(25, 155, 179)
.status
  padding: 8px 10px
  padding-left: 68px
  position: relative
  min-height: 48px
  border-bottom: 1px solid rgb(44, 71, 112)
  cursor: default
  font-size: 15px

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

.display-name
  display: block
  max-width: 100%
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

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
</style>
