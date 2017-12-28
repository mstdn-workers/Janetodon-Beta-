<template>
  <div>
    <div v-if="isFileEnter && dropMedia.length <= 4" class="view-box-active">
      <b-upload v-model="dropMedia" multiple drag-drop>
        <div class="view-box"></div>
      </b-upload>
      <div class="upload-area">
        <div class="upload-area-content">
          <div class="center">
            ドラッグ&amp;ドロップでアップロード
          </div>
        </div>
      </div>
    </div>
    <div v-else class="view-box-deleted">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFileEnter: {},
    dropMedia: {}
  },
  data () {
    return {
    }
  },
  name: 'image-upload-area'
}
</script>

<style lang="sass">
  /* :FIXME I hope to reject follow import sentence
@import '../../globals.sass'
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
  background-color: rgb(72, 68, 87)

.upload-area-content
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
