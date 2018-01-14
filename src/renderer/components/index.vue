<template>
  <div class="main">
    <router-link to="login">ログイン</router-link>
  </div>
</template>

<script>
import Mastodon from '../../../node_modules/mastodon-api/lib/mastodon'
import Vue from 'vue'

export default {
  data () {
    return {
      name: 'sa2taka'
    }
  },
  beforeCreate () {
    let self = this
    this.$db.find({ type: 'account', is_active: true }).exec(function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      if (data.length !== 0) {
        Vue.prototype.$client = new Mastodon({
          access_token: data[0].access_token,
          api_url: data[0].url + '/api/v1/'
        })
        console.log(self.$client)
        self.$router.push({ name: 'main-content' })
      } else {
        self.$router.push({ name: 'login' })
      }
    })
  },
  name: 'index'
}
</script>

<style lang="sass">

</style>
