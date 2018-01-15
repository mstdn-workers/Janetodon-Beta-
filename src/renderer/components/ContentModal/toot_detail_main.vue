<template>
  <div class="toot-detail-main">
    <div class="status-info" @click="wantAccount()" @mouseenter="isHoverName=true" @mouseleave="isHoverName=false">
      <div class="status-avatar">
        <div class="account-avatar icon-image" :style="avatarStyle">
        </div>
      </div>
      <p class="display-name">
        <span :class="{ 'display-name_hover': isHoverName }">
          {{ displayName(status.account) }}
        </span>
      </p>
      <p class="display-username">{{ '@' + status.account.acct }}</p>
    </div>
    <div class="status-content-main" @click="onStatusClick">
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

    <image-gallery v-if="status.media_attachments.length !== 0" :media="status.media_attachments" :sensitive="status.sensitive"></image-gallery>
    <inline-ogp :ogps="ogps" v-if="ogps&&isVisible"></inline-ogp>

    <p class="toot-detail-main-info" style="color: gray;">
      <span>{{ localyDate }}</span>
      |
      <span>
        <a class="main-atag":href="status.application.website" target="_blank" v-if="status.application">
          {{ status.application.name }}
        </a>
        <span v-else>
          本家。
        </span>
      </span>
      |
      <span>
        <icon name="refresh"></icon>
        {{ status.reblogs_count }}
      </span>
      |
      <span>
        <icon name="star"></icon>
        {{ status.favourites_count }}
      </span>
    </p>

    <hr style="background-color: gray;margin: 3px"/>

    <action-bar :status="status" :mainClass="'main-action-bar'" :iconClass="'main-action-bar_icon'" :scale="'2'"></action-bar>
  </div>
</template>

<script>
import InlineOgp from '@/components/Timeline/inline_ogp'
import ActionBar from '@/components/Timeline/action_bar'
import ImageGallery from '@/components/Timeline/image_gallery'

export default {
  props: {
    status: {}
  },
  data () {
    return {
      isVisible: false,
      ogps: null,
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
    onStatusClick () {
      this.$eventCaller.$emit('want-toot', this.status.id)
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
    },
    localyDate: function () {
      var moment = require('moment')
      let tootDate = moment(this.status.created_at)

      return tootDate.format('YYYY年MM月DD日 HH:ss')
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

    if (!status.spoiler_text) {
      this.isVisible = true
    }
  },
  components: {
    ImageGallery,
    ActionBar,
    InlineOgp
  },
  name: 'toot-detail-main'
}
</script>

<style lang="sass">
// ここにあるクラスはほとんどOneStatusと一緒のクラスです
$main-status-back: $main-background + rgb(10, 10, 10)
.toot-detail-main
  padding: 8px 10px
  padding-left: 68px
  position: relative
  min-height: 48px
  border-bottom: 1px solid rgb(44, 71, 112)
  cursor: default
  font-size: 15px
  width: 100%

  background-color: $main-status-back

.status-content-main
  line-height: 24px
  word-wrap: break-word
  font-weight: 400
  overflow: hidden
  white-space: pre-wrap
  cursor: pointer

  font-size: 20px

=updateAtag()
  background-color: $main-status-back!important
  color: gray!important

  &:hover
    background-color: $main-status-back!important
    color: gray + rgb(15, 15, 15)!important

.main-atag
  +updateAtag

.main-action-bar
  width: 100%
  height: 32px
  display: flex
  flex-direction: row
  margin: 10px

  &_icon
    flex: 1 1 auto
    text-align: center

    +updateAtag


</style>
