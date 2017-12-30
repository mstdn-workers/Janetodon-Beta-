<template>
  <div class="login">
    <div class="instance-select">
      <article class="media">
        <figure class="media-left">
          <p class="image is-128x128">
            <img src="https://mstdn-workers.com/packs/fluffy-elephant-friend-4d356db8570b891c88588b61a407f3a1.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content explain-content">
            <h1 style="color:white">インスタンス検索</h1>
            <p class="explain-content_detal"> ログインしたいインスタンスを入力してください </p>
          </div>
        </div>
      </article>
      <div class="error" v-if="error !== ''"> URLが間違っています </div>
      <form class="instance-form">
        <input class="instance-input" id="instance" type="text" placeholder="mstdn-workers.com" v-model="baseUrl"> </input>
        <button class="instance-decide-button" @click="loginAndNext">次へ</button>
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
.login
  height: 100vh
.explain-content
  color: white
  height: 128px
  flex-flow: column
  font-size: 24px
  font-weight: 600
  &_detail
    justify-content: left

.instance-select
  +flex-center
  display: flex
  position: absolute
  flex-flow: column
  top: 120px

  width: 100%

.instance-form
  +flex-center
  width: 80%

.instance-input
  font-size: 24px
  font-weight: 500
  padding: 12px
  border-radius: 8px
  border: 1px solid
  width: 50%

.instance-decide-button
  font-size: 24px
  font-weight: 700
  padding: 12px 48px
  border-radius: 8px
  border: 1px solid

  background-color: rgb(21, 51, 111)
  color: white
</style>
