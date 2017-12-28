<template>
  <div>
    <div v-if="isFileEnter && dropMedia.length <= 4" class="view-box-active">
      <b-upload v-model="dropMedia" multiple drag-drop>
        <div class="view-box"></div>
      </b-upload>
      <div class="upload-area">
        <div class="upload-area_content">
          <div class="center">
            ドラッグ&amp;ドロップでアップロード
          </div>
        </div>
      </div>
    </div>
    <div v-else class="view-box-deleted">
    </div>

    <b-modal :active.sync="isUploading" style="z-index:1000;">
      <div class="card uploading-modal">
        <div class="media-content uploading-modal_content">
          <b-icon icon="spinner" custom-class="fa-spin"> </b-icon> &nbsp; Uploading
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    isFileEnter: {},
    dropMedia: {},
    isUploading: {}
  },
  data () {
    return {
    }
  },
  name: 'image-upload-area'
}
</script>

<style lang="sass">
.view-box
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0)
  display: flex
  z-index: 500
  /* visibility: hidden;
  position: fixed
  top: 0px
  left: 0px
  display: flex

.view-box-active
  +flex-center

  animation-name: fadeIn
  animation-duration: 300ms
  animation-timing-function: ease
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.67)
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  position: fixed
  top: 0px
  left: 0px
  z-index: 500

.view-box-deleted
  animation-name: fadeOut
  animation-duration: 200ms
  animation-timing-function: ease
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.67)
  opacity: 0
  z-index: 500
  position: fixed
  top: 0px
  left: 0px
  pointer-events: none

.upload-area
  +flex-center

  border-radius: 8px
  width: 320px
  height: 160px
  display: flex
  box-sizing: border-box
  position: relative
  background-color: $modal-back

  &_content
    +flex-center

    flex: 1
    color: rgb(215, 215, 215)
    font-size: 20px
    font-weight: 600
    border: 2px dotted
    height: 90%
    border-radius: 8px

.center
  +flex-center

  height: 100%
  display: flex


.uploading-modal
  display: flex
  height: 240px
  background-color: $modal-back

  &_content
    +flex-center
    color: rgb(215, 215, 215)
    font-size: 24px
    font-weight: 600
    display: flex

@keyframes fadeIn
  0%
    opacity: 0%

  100%
    opacity: 100%


@keyframes fadeOut
  0%
    opacity: 100%

  100%
    opacity: 0%
</style>
