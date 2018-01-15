<template>
  <div class="status">
    <status-content :status="status"></status-content>

    <action-bar :status="status"></action-bar>
    <inline-ogp :ogps="ogps" v-if="ogps"></inline-ogp>

    <image-gallery v-if="status.media_attachments.length !== 0" :media="status.media_attachments" :sensitive="status.sensitive"></image-gallery>
  </div>
</template>

<script>
import ImageGallery from '@/components/Timeline/image_gallery'
import ActionBar from '@/components/Timeline/action_bar'
import InlineOgp from '@/components/Timeline/inline_ogp'
import StatusContent from '@/components/Timeline/status_content'

export default {
  props: {
    status: {}
  },
  data () {
    return {
      ogps: null
    }
  },
  methods: {
  },
  computed: {
    firstUrl: function () {
      return (this.status.spoiler_text.replace(/<(?!p)(.|\s).*?>/g, '') + this.status.content.replace(/<(?!p)(.|\s).*?>/g, '')).match(/https?:\/\/[^\s<>]*/)
    }
  },
  mounted () {
    let self = this

    if (this.firstUrl) {
      var parser = require('ogp-parser')

      parser(this.firstUrl[0], false).then(function (data) {
        if (Object.keys(data.ogp).length !== 0) {
          self.ogps = data.ogp
        }
      }).catch(function (error) {
        console.error(error)
      })
    }
  },
  watch: {
    ogps: function () {
      console.log('ogps change')
    }
  },
  components: {
    ImageGallery,
    ActionBar,
    InlineOgp,
    StatusContent
  },
  name: 'one-status'
}
</script>

<style lang="sass">
.status
  padding: 8px 10px
  padding-left: 68px
  position: relative
  min-height: 48px
  border-bottom: 1px solid rgb(44, 71, 112)
  cursor: default
  font-size: 15px
  width: 90%
</style>
