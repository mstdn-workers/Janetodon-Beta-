<template>
  <div class="upload-media">
    <div class="upload-media-gallery-active" v-if="dropMedia.length !== 0">
      <div class="upload-media">
        <div class="upload-media_one animated bounceIn" v-for="(one_media, index) in dropMedia">
          <a class="button upload-media_delete-button overlay" @click="deleteMedia(index)">
            <span class="icon is-small">
              <b-icon icon="times"></b-icon>
            </span>
          </a>
          <figure class="media-left">
            <img :src="encodePath(one_media)" class="upload-media_content"/>
          </figure>
        </div>
      </div>
    </div>
    <div v-else-if="!isStart" class="upload-media-gallery-delete">

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      dropMedia: {},
      isStart: {}
    },
    methods: {
      encodePath (file) {
        return window.URL.createObjectURL(file)
      },
      deleteMedia (index) {
        this.$emit('delete', index)
      }
    },
    name: 'upload-media'
  }
</script>

<style lang="sass">
.upload-media-gallery-active
  animation-name: imageGarallyFadeIn
  animation-duration: 200ms
  animation-timing-function: ease
  height: 128px
  width: 512px
  margin-left: 4px

  position: absolute
  top: 30px

.upload-media-gallery-delete
  animation-name: imageGarallyFadeOut
  animation-duration: 200ms
  animation-timing-function: ease
  height: 0px
  width: 512px
  margin-left: 4px

  position: absolute
  top: 30px

.upload-media
  border: none
  display: flex
  float: left
  position: relative

  &_content
    width: 128px
    height: 128px
    -o-object-fit: cover
    object-fit: cover

  &_delete-button
    font-size: 18px
    width: 24px
    height: 24px
    line-height: 18px
    position: absolute
    top: 8px
    left: 4px

  &_one
    width: 128px
    height: 128px
    font-size: 15px
    line-height: 20px
    word-wrap: break-word
    font-weight: 400
    overflow: hidden
    white-space: pre-wrap
    position: relative

.overlay
  box-sizing: content-box
  background: rgba(0, 0, 0, 0.5)
  color: rgba(255, 255, 255, 0.7)
  border-radius: 4px
  padding: 2px
</style>
