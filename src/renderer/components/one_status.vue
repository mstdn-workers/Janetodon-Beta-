<template>
  <div class="status">
    <div class="status-info">
      <div class="status-avatar">
        <div class="account-avatar" :style="avatarStyle">
        </div>
      </div>
      <span class="display-name">
        {{ status.account.display_name }}
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
    <image-gallery v-if="status.media_attachments.length !== 0" :media="status.media_attachments" :sensitive="status.sensitive"></image-gallery>
  </div>
</template>

<script>
import ImageGallery from '@/components/image_gallery'

export default {
  props: {
    status: {}
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    avatarStyle: function () {
      return "width): 48px; height: 48px;background-size: 48px 48px; background-image: url('" + this.status.account.avatar + "');"
    },
    spoilerText: function () {
      return this.status.spoiler_text.replace(/<(?!br)(.|\s).*?>/g, '')
    },
    content: function () {
      return this.status.content.replace(/<(?!br)(.|\s).*?>/g, '')
    }
  },
  components: {
    ImageGallery
  },
  name: 'one-status'
}
</script>

<style>
html, body, main {
  height: 100%;
}
.status {
  padding: 8px 10px;
  padding-left: 68px;
  position: relative;
  min-height: 48px;
  border-bottom: 1px solid #99b0d2;
  cursor: default;
  opacity: 1;
  -webkit-animation: fade .15s linear;
  animation: fade .15s linear;
  font-size: 15px;
}
.status-avatar {
  width: 48px;
  height: 48px;
  left: 10px;
  position: absolute;
  top: 10px;
}
.account-avatar {
  border-radius: 4px;
  background: transparent no-repeat;
  background-position: 50%;
  background-clip: padding-box;
  position: relative;
  cursor: pointer;
}
.display-name {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.display-username {
  font-size: 14px;
  color: gray;
}
.status-content {
    font-size: 15px;
    line-height: 20px;
    word-wrap: break-word;
    font-weight: 400;
    overflow: hidden;
    white-space: pre-wrap;
}
</style>
