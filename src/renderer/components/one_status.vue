<template>
  <div class="status">
    <div class="status-info">
      <div class="status-avatar">
        <div class="account-avatar" style="width: 48px; height: 48px;background-size: 48px 48px; background-image: url('https://mstdn-workers.s3-ap-northeast-1.amazonaws.com/accounts/avatars/000/000/424/original/64e8750285871421301a27f070462c45.gif');">
        </div>
      </div>
      <span class="display-name">
        {{ displayName }}
        <span class="display-username">{{ '@' + username }}</span>
      </span>
    </div>
    <div class="status-content">
      <div v-if="!spoilerText">
        <span> {{ status }}</span>
      </div>
      <div v-else>
        <span> {{ spoilerText }}</span>
        <b-collapse :open="false">
          <button class="button is-small" slot="trigger" @click="isVisible = ~isVisible">
            {{ isVisible ? "隠す" : " 続きを見る"}}
          </button>
          <div>
            <span> {{ status }}</span>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    username: {required: true},
    displayName: {required: true},
    status: {required: true},
    spoilerText: {type: String}
  },
  data () {
    return {
      isVisible: false
    }
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
