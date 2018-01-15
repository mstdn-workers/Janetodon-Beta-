<template>
  <div class="toot">
    <my-icon></my-icon>
    <b-field class="toot-area">
      <b-input class="spoiler-text" placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
      <b-input class="spoiler-text-deleted" v-model="spoilerText" placeholder="警告文" v-else></b-input>
    </b-field>

    <b-field class="toot-area">
      <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
    </b-field>
    <div class="toot-settings">
      <b-field class="toot-settings_contents">
        <b-upload class="toot-setting-button" v-if="dropMedia.length <= 4" v-model="dropMedia" drag-drop>
          <icon name="upload"></icon>
        </b-upload>

        <toot-visibility @change="changeVisibility"></toot-visibility>

        <a class="button toot-setting-button" @click="isSpoilerActive=!isSpoilerActive">
          <div :class="['spoiler-button-text', {'spoiler-active': isSpoilerActive}]">
            CW
          </div>
        </a>
        <a v-if="dropMedia.length !== 0" class="button toot-setting-button" @click="sensitive=!sensitive">
          <icon v-if="!sensitive" name="eye"></icon>
          <icon v-else name="eye-slash"></icon>
        </a>
        <div class="right">
          <div :style="{ fontWeight: 600, color: tootLength > 500 ? 'red' : 'rgb(45, 45, 45)'}">
            {{ 500 - tootLength }} / 500
          </div>
        </div>
      </b-field>
    </div>

    <div class="reply-status" :class="[this.isTargetExist ? 'reply-status_active' : 'reply-status_delete']" v-if="replyTargetStatus">
      <status-content :status="replyTargetStatus"></status-content>
    </div>

    <image-upload-area :isFileEnter="isFileEnter" :isUploading="isUploading" :dropMedia="dropMedia"></image-upload-area>
    <upload-media :dropMedia="dropMedia" :isStart="isStart" @delete="deleteMedia"></upload-media>

  </div>
</template>

<script>
import TootVisibility from '@/components/Toot/toot_visibility'
import ImageUploadArea from '@/components/Toot/image_upload_area'
import UploadMedia from '@/components/Toot/upload_media'
import MyIcon from '@/components/Toot/my_icon'
import StatusContent from '@/components/Timeline/status_content'

export default {
  props: {
    isFileEnter: {}
  },
  data () {
    return {
      mainText: '',
      spoilerText: '',
      isSpoilerActive: false,
      visibility: 'public',
      dropMedia: [],
      uploadedMedia: [],
      isUploading: false,
      preMediaNum: 0,
      sensitive: false,
      isStart: true,
      inReplyToId: null,
      replyTargetName: null,
      replyTargetStatus: null,
      isTargetExist: false
    }
  },
  methods: {
    toot () {
      // let self = this
      if (this.isUploading) {
        return
      }

      let element = {
        status: this.mainText,
        spoiler_text: this.spoilerText,
        visibility: this.visibility,
        media_ids: this.mediaIds,
        sensitive: this.sensitive
      }

      if (this.inReplyToId) {
        element.in_reply_to_id = this.inReplyToId
      }

      let matchUser = new RegExp('@' + this.replyTargetName)

      if (this.replyTargetName && this.mainText.match(matchUser)) {
        this.inReplyToId = null
      }

      this.mainText = ''
      this.spoilerText = ''
      this.dropMedia = []
      this.uploadedMedia = []
      this.preMedianum = 0
      this.visibility = 'public'
      this.isSpoilerActive = false
      this.inReplyToId = null

      this.$client.post('statuses', element, function (err, data, res) {
        if (err) {
          console.log(err)
        }
      })
    },
    changeVisibility (newVisibility) {
      this.visibility = newVisibility
    },
    deleteMedia (index) {
      this.mainText = this.mainText.replace(this.uploadedMedia[index].text_url + ' ', '')
      this.mainText = this.mainText.replace(this.uploadedMedia[index].text_url, '')

      this.dropMedia.splice(index, 1)
      this.uploadedMedia.splice(index, 1)
      this.preMediaNum = this.dropMedia.length
    },
    uploadMedia (index) {
      const fs = require('fs')

      let self = this

      this.$client.post('media', { file: fs.createReadStream(this.dropMedia[index].path) }).then(resp => {
        self.uploadedMedia.push(resp.data)
        self.mainText = self.mainText + ' ' + resp.data.text_url

        if (self.dropMedia.length <= index + 1) {
          self.isUploading = false
        } else {
          self.uploadMedia(index + 1)
        }
      })
    }
  },
  mounted () {
    this.isStart = false

    let self = this
    this.$eventCaller.$on('reply', function (status) {
      self.mainText = self.mainText.replace(/@\S+\n/g, '')
      self.mainText = self.mainText.replace(/@\S+/g, '')

      self.inReplyToId = status.id
      self.replyTargetName = status.account.username
      self.replyTargetStatus = status
      self.isTargetExist = true

      self.mainText = '@' + self.replyTargetName + '\n' + self.mainText
    })
  },
  computed: {
    tootLength: function () {
      return this.mainText.length + this.spoilerText.length
    },
    mediaIds: function () {
      let mediaIds = []
      for (var i in this.uploadedMedia) {
        mediaIds.push(this.uploadedMedia[i].id)
      }
      return mediaIds
    }
  },
  watch: {
    dropMedia: function () {
      if (this.preMediaNum < this.dropMedia.length) {
        this.isUploading = true
        this.uploadMedia(this.preMediaNum)
        this.preMediaNum = this.dropMedia.length
      }

      this.$emit('media-change', this.dropMedia.length !== 0)
    },
    isSpoilerActive: function () {
      this.$emit('spoiler-change', this.isSpoilerActive)
    },
    mainText: function () {
      let matchUser = new RegExp('@' + this.replyTargetName)

      if (this.replyTargetName && !this.mainText.match(matchUser)) {
        this.inReplyToId = null
        this.replyTargetName = null
        this.isTargetExist = false
      }
    }
  },
  components: {
    TootVisibility,
    ImageUploadArea,
    UploadMedia,
    MyIcon,
    StatusContent
  },
  name: 'toot'
}
</script>

<style lang="sass">
$button-color: rgb(67, 71, 89)
$button-back: rgb(194, 198, 210)
$toot-back: rgb(83, 91, 111)
.toot
  width: 100%
  top: 60px
  position: fixed
  z-index: 300
  flex: 1
  padding-bottom: 20px
  background-color: $toot-back!important

.toot-area
  width: 85%
  position: relative
  left: 2%
.input
  background-color: white!important
.textarea
  background-color: white!important
.right
  margin-left: auto

.spoiler-text
  animation-name: verticalFadeIn
  animation-duration: 300ms
  animation-timing-function: ease
  height: 4ex
  opacity: 1

.spoiler-text-deleted
  animation-name: verticalFadeOut
  animation-duration: 300ms
  animation-timing-function: ease
  height: 0ex
  opacity: 0

.spoiler-button-text
  font-weight: bold
  font-size: 0.8em
  letter-spacing: -0.1em

.spoiler-active
  color: rgb(41, 208, 183)!important
  &:hover
    color: rgb(41, 208, 183)!important

.toot-settings
  +flex-center
  width: 100%
  position: absolute
  &_contents
    width: 50%
    left: 5%
    top: -12px
    padding: 10px
    background: $button-back
    box-shadow: inset 0 5px 5px rgba(0, 0, 0, 0.05)
    border-radius: 0 0 4px 4px
    display: flex
    position: absolute

.toot-setting-button
  border-radius: 0
  border: 0
  background-color: $button-back!important
  color: $button-color!important
  &:hover
    color: $button-color!important
    background-color: rgb(194, 198, 210) - rgb(10, 10, 10)!important

.reply-status
  padding: 8px 10px
  padding-left: 68px
  position: absolute
  min-height: 48px
  cursor: default
  font-size: 15px
  width: 90%
  background-color:  rgba(40, 44, 55, 0.86)
  top: 0px
  width: 75%
  max-height: 90px
  overflow: auto

  &_active
    animation-name: replyStatusIn
    animation-duration: 300ms
    animation-timing-function: ease
    left: 15%

  &_delete
    animation-name: replyStatusOut
    animation-duration: 300ms
    animation-timing-function: ease
    left: 100%

// override
.upload .upload-draggable
  display: inline-block
  cursor: pointer
  padding: 0.25em
  border: 0
  border-radius: 5px

@keyframes verticalFadeIn
  0%
    height: 0ex
    opacity: 0

  100%
    height: 4ex
    opacity: 1


@keyframes verticalFadeOut
  0%
    height: 4ex
    opacity: 1

  100%
    height: 0ex
    opacity: 0


@keyframes imageGarallyFadeIn
  0%
    height: 0px
    opacity: 1

  100%
    height: 128px
    opacity: 0


@keyframes imageGarallyFadeOut
  0%
    height: 128px
    opacity: 1

  100%
    height: 0px
    opacity: 0

@keyframes replyStatusIn
  0%
    left: 100%

@keyframes replyStatusOut
  0%
    left: 15%
</style>
