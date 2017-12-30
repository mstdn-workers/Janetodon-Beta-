<template>
  <div class="media" style="direction: ltr;">
    <div v-if="isShow" class="image-gallery">
      <a  class="button media-secret-button overlay" @click="isShow=false">
        <span class="icon is-small">
          <b-icon icon="eye"></b-icon>
        </span>
      </a>
      <div class="media-gallery" style="height: 110px;">
        <div v-for="one_media in formatedMedia" class="media-gallery_item" :style="one_media.style">
          <a @click="isImageModalActive = true;imgSrc = one_media.media.url">
            <img class="media-gallery_thumbnail" :src="one_media.media.preview_url" />
          </a>
        </div>
      </div>
    </div>

    <div class="media-secret" v-else @click="isShow=true" style="height: 110px">
      {{ this.sensitive ? '閲覧注意' : '非表示のメディア' }}
      クリックして表示
    </div>
    <div style="z-index: 1000">
      <b-modal :active.sync="isImageModalActive">
        <p class="image">
          <img :src="imgSrc">
        </p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: {},
    sensitive: {}
  },
  data () {
    return {
      counter: 0,
      isImageModalActive: false,
      imgSrc: '',
      isShow: true
    }
  },
  methods: {
    createMediaStyle (index) {
      let length = this.media.length

      switch (length) {
        case 1:
          return 'left: auto; top: auto; right: auto; bottom: auto; width: 100%; height: 100%;'
        case 2:
          switch (index) {
            case 0:
              return 'left: auto; top: auto; right: 2px; bottom: auto; width: 50%; height: 100%;'

            case 1:
              return 'left: 2px; top: auto; right: auto; bottom: auto; width: 50%; height: 100%;'
          }
          break
        case 3:
          switch (index) {
            case 0:
              return 'left: auto; top: auto; right: 2px; bottom: auto; width: 50%; height: 100%;'
            case 1:
              return 'left: 2px; top: auto; right: auto; bottom: 2px; width: 50%; height: 50%;'
            case 2:
              return 'left: 2px; top: 2px; right: auto; bottom: auto; width: 50%; height: 50%;'
          }
          break
        case 4:
          switch (index) {
            case 0:
              return 'left: auto; top: auto; right: 2px; bottom: 2px; width: 50%; height: 50%;'
            case 1:
              return 'left: 2px; top: auto; right: auto; bottom: 2px; width: 50%; height: 50%;'
            case 2:
              return 'left: auto; top: 2px; right: 2px; bottom: auto; width: 50%; height: 50%;'
            case 3:
              return 'left: 2px; top: 2px; right: auto; bottom: auto; width: 50%; height: 50%;'
          }
          break
      }
    }
  },
  computed: {
    formatedMedia: function () {
      let retVal = []
      for (let i in this.media) {
        retVal.push({ style: this.createMediaStyle(Number(i)), media: this.media[i] })
      }
      return retVal
    }
  },
  mounted () {
    this.isShow = !this.sensitive
  },
  name: 'image-gallery'
}
</script>

<style lang="sass">

.media
  font-size: 15px
  line-height: 20px
  word-wrap: break-word
  font-weight: 400
  overflow: hidden
  white-space: pre-wrap
  position: relative

.meida-gallery
  -webkit-box-sizing: border-box
  box-sizing: border-box
  position: relative

  &_item
    border: none
    display: block
    float: left

  &_thumbnail
    width: 100%
    height: 100%
    -o-object-fit: cover
    object-fit: cover

.media-secret
  +flex-center
  width: 100%
  text-align: center
  display: flex
  flex-direction: column
  cursor: pointer
  background-color: black
  color: white

.media-secret-button
  font-size: 18px
  width: 24px
  height: 24px
  line-height: 18px
  position: absolute
  top: 4px
  left: 4px
  &:hover
    color: rgba(255, 255, 255, 0.7)
    background-color: rgba(0, 0, 0, 0.9)

.overlay
  box-sizing: content-box
  background: rgba(0, 0, 0, 0.5)
  color: rgba(255, 255, 255, 0.7)
  border-radius: 4px
  padding: 2px
</style>
