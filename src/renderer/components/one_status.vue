<template>
  <div class="status">
    <div class="status_avatar">
      <div class="account_avatar" style="width: 48px; height: 48px;background-size: 48px 48px; background-image: url('https://mstdn-workers.s3-ap-northeast-1.amazonaws.com/accounts/avatars/000/000/424/original/64e8750285871421301a27f070462c45.gif');">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
  border-bottom: 1px solid #393f4f;
  cursor: default;
  opacity: 1;
  -webkit-animation: fade .15s linear;
  animation: fade .15s linear;
}
.status_avatar {
  width: 48px;
  height: 48px;
  left: 10px;
  position: absolute;
  top: 10px;
}
.account_avatar {
  border-radius: 4px;
  background: transparent no-repeat;
  background-position: 50%;
  background-clip: padding-box;
  position: relative;
  cursor: pointer;
}
</style>
