<template>
  <div class="config-accounts">
    <div class="accounts-content" v-for="account in accounts" @click="setAccount(account)">
      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img class="icon-image" :src="account.avatar" />
          </p>
        </figure>
        <p class="media-content selectable-content">
          <strong>{{ account.display }}</strong>
          <small>@{{ account.username }}@{{ getInstanceName(account.url) }}</small>
        </p>
      </article>
    </div>
    <div class="account-add" @click="openLogin()">
      <b-icon icon="plus-circle" size="is-large"></b-icon>
    </div>
  </div>
</template>

<script>
import login from '@/login'

export default {
  mixins: [login],
  data () {
    return {
      accounts: []
    }
  },
  mounted () {
    let self = this

    this.$db.find({ type: 'account' }).exec(function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      self.accounts = data
    })
  },
  methods: {
    getInstanceName (url) {
      return url.match(/https:\/\/(.*)/)[1]
    },
    openLogin () {
      this.$router.push({ name: 'login' })
    },
    setAccount (account) {
      this.updateClient(account)
    }
  },
  name: 'config-accounts'
}
</script>

<style lang="sass">
.config-accounts
  display: flex
  width: 80%
  overflow: auto
  flex-flow: column

.accounts-content
  z-index: 5000
  height: auto
  cursor: pointer

.account-add
  +flex-center
  cursor: pointer
</style>
