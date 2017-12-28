<template>
  <div>
    <div class="main">
      <h1>ログインしたいインスタンスを入力してください</h1>
      <div class="error" v-if="error !== ''"> URLが間違っています </div>
      <form>
        <input id="instance" type="text" placeholder="mstdn-workers.com" v-model="baseUrl"> </input>
        <button @click="loginAndNext">次へ</button>
      </form>
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
  computed: {
    formatedUrl: function () {
      let replaced = this.baseUrl
      if (replaced === '') {
        replaced = 'https://mstdn-workers.com'
      }
      replaced.replace(/\/+$/, '')
      replaced.replace(/^http:\/\//, 'https://')
      if (!replaced.match(/^https:\/\//)) {
        replaced = 'https://' + replaced
      }
      return replaced
    }
  },
  methods: {
    loginAndNext () {
      this.login(this.formatedUrl)
    }
  },
  name: 'login'
}
</script>

<style lang="sass">

main
  +flex-center
  display: flex

</style>
