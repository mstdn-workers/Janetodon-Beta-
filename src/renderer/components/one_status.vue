<template>
    <div class="status">
    <figure class="image is-1by1 status_avatar">
      <img src="https://mstdn-workers.s3-ap-northeast-1.amazonaws.com/accounts/avatars/000/000/424/original/64e8750285871421301a27f070462c45.gif" />
    </figure>
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
.status_avatar {
  width: 48px;
  height: 48px;
  left: 10px;
  position: absolute;
  top: 10px;
}
</style>
