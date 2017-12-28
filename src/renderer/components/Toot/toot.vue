<template>
  <div class="toot">
    <b-field>
      <b-input class="spoiler-text" placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
      <b-input class="spoiler-text-deleted" v-model="spoilerText" placeholder="警告文" v-else></b-input>
    </b-field>

    <image-upload-area :isFileEnter="isFileEnter" :isUploading="isUploading" :dropMedia="dropMedia"></image-upload-area>

    <b-field>
      <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
    </b-field>
    <b-field>
      <b-upload v-if="dropMedia.length <= 4" v-model="dropMedia" drag-drop>
        <b-icon icon="upload"></b-icon>
      </b-upload>

      <toot-visibility @change="changeVisibility"></toot-visibility>

      <a v-if="isSpoilerActive" class="button spoiler-active" @click="isSpoilerActive=false">
        <div class="spoiler-button-text">
          CW
        </div>
      </a>
      <a v-else class="button" @click="isSpoilerActive=true">
        <div class="spoiler-button-text">
          CW
        </div>
      </a>
      <a v-if="dropMedia.length !== 0" class="button" @click="sensitive=!sensitive">
        <b-icon v-if="!sensitive" icon="eye"></b-icon>
        <b-icon v-else icon="eye-slash"></b-icon>
      </a>
      <div class="right">
        <div class="red" v-if="tootLength > 500">
          {{ 500 - tootLength }} / 500
        </div>
        <div v-else>
          {{ 500 - tootLength }} / 500
        </div>
      </div>
    </b-field>

    <upload-media :dropMedia="dropMedia" :isStart="isStart" @delete="deleteMedia"></upload-media>

  </div>
</template>

<script>
import TootVisibility from '@/components/Toot/toot_visibility'
import ImageUploadArea from '@/components/Toot/image_upload_area'
import UploadMedia from '@/components/Toot/upload_media'

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
      isStart: true
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

      this.mainText = ''
      this.spoilerText = ''
      this.dropMedia = []
      this.uploadedMedia = []
      this.preMedianum = 0
      this.visibility = 'public'
      this.isSpoilerActive = false

      this.$client.post('statuses', element, function (err, data, res) {
        if (err) {
          console.log(err)
        }
        console.log(data)
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
        self.mainText = resp.data.text_url + ' ' + self.mainText

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
    }
  },
  components: {
    TootVisibility,
    ImageUploadArea,
    UploadMedia
  },
  name: 'toot'
}
</script>

<style lang="sass">
@import '../../globals.sass'

.toot
  width: 100%
  top: 60px
  position: fixed
  z-index: 300
  flex: 1
  background-color: white
  padding-bottom: 20px

.right
  margin-left: auto

.red
  color: red

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
  color: rgb(41, 208, 183)
  &:hover
    color: rgb(41, 208, 183)


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
</style>
