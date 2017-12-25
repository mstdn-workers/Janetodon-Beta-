<template>
  <div class="toot">
    <b-field>
      <b-input class="spoiler-text" placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
      <b-input class="spoiler-text-deleted" placeholder="警告文" v-else></b-input>
    </b-field>

    <image-upload-area :isFileEnter="isFileEnter" :dropMedia="dropMedia"></image-upload-area>

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
      <div class="right">
        <div class="red" v-if="tootLength > 500">
          {{ 500 - tootLength }} / 500
        </div>
        <div v-else>
          {{ 500 - tootLength }} / 500
        </div>
      </div>
    </b-field>

    <div class="upload-media-gallery" v-if="dropMedia.length !== 0">
      <div class="upload-media">
        <div class="upload-media-one" v-for="(one_media, index) in dropMedia">
          <a class="button upload-delete-button overlay" @click="dropMedia.splice(index, 1)">
            <span class="icon is-small">
              <b-icon icon="times"></b-icon>
            </span>
          </a>
          <figure class="media-left">
            <img :src="encodePath(one_media)" class="upload-media-content"/>
          </figure>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TootVisibility from '@/components/toot_visibility'
import ImageUploadArea from '@/components/image_upload_area'

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
      dropMedia: []
    }
  },
  methods: {
    toot () {
      // let self = this

      let element = {
        status: this.mainText,
        spoiler_text: this.spoilerText,
        visibility: this.visibility
      }

      console.log(element)

      this.mainText = ''
      this.spoilerText = ''
      this.$client.post('statuses', element, function (err, data, res) {
        if (err) {
          console.log(err)
        }
        console.log(data)
      })
    },
    encodePath (file) {
      return window.URL.createObjectURL(file)
    },
    changeVisibility (newVisibility) {
      this.visibility = newVisibility
    }
  },
  computed: {
    tootLength: function () {
      return this.mainText.length + this.spoilerText.length
    }
  },
  components: {
    TootVisibility,
    ImageUploadArea
  },
  name: 'toot'
}
</script>

<style>
html, body, main {
  height: 100%;
}

.right {
   margin-left: auto;
 }

.red {
  color: red;
}

.spoiler-text {
  animation-name: verticalFadeIn;
  animation-duration: 300ms;
  animation-timing-function: ease;
  height: 4ex;
  opacity: 1;
}

.spoiler-text-deleted {
  animation-name: verticalFadeOut;
  animation-duration: 300ms;
  animation-timing-function: ease;
  height: 0ex;
  opacity: 0;
}

.spoiler-button-text{
  font-weight: bold;
  font-size: 0.8em;
  letter-spacing: -0.1em;
}

.spoiler-active {
  color: rgb(41, 208, 183);
}

.spoiler-active:hover {
  color: rgb(41, 208, 183);
}

.upload-media-gallery{
    height: 128px;
    width: 512px;
}

.upload-media{
    border: none;
    display: flex;
    float: left;
}

.upload-media-content {
  width: 128px;
  height: 128px;
  -o-object-fit: cover;
  object-fit: cover;
}

.upload-delete-button {
  font-size: 18px;
  width: 24px;
  height: 24px;
  line-height: 18px;
  position: absolute;
  top: 8px;
  left: 4px;
}

.upload-media-one {
  width: 128px;
  height: 128px;
  font-size: 15px;
  line-height: 20px;
  word-wrap: break-word;
  font-weight: 400;
  overflow: hidden;
  white-space: pre-wrap;
  position: relative;
}

.overlay {
  box-sizing: content-box;
  background: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  padding: 2px;
}

@keyframes verticalFadeIn {
  0% {
    height: 0ex;
    opacity: 0;
  }
  100% {
    height: 4ex;
    opacity: 1;
  }
}

@keyframes verticalFadeOut {
  0% {
    height: 4ex;
    opacity: 1;
  }
  100% {
    height: 0ex;
    opacity: 0;
  }
}
</style>
