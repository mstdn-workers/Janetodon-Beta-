<template>
  <div>
    <div class="main">
      <h1>ログインしたいインスタンスを入力してください</h1>
      <input id="instance" type="text" placeholder="https://mstdn-workers.com" v-model="baseUrl"> </input>
      <button @click="loginAndNext">次へ</button>
    </div>
  </div>
</template>

<script>
import login from '@/login'

export default {
  mixins: [login],
  data () {
    return {
      baseUrl: ''
    }
  },
  methods: {
    loginAndNext () {
      this.login(this.baseUrl)
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
