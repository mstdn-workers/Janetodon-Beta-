<template>
  <div>
    <div class="main">
      <h1>ログインしたいインスタンスを入力してください</h1>
      <input id="instance" type="text" placeholder="https://mstdn-workers.com"> </input>
    </div>
  </div>
</template>

<script>
import login from '@/login'

export default {
  data () {
    return {
      name: 'login'
    }
  },
  name: 'login'
}
</script>

<style>
html, body, main {
  height: 100%;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
