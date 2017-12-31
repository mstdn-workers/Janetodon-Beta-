<template>
  <div class="user-select">
    <a :class="{ 'user-select_button': true, 'user-select_active': isSelecting}">
      <b-icon icon="user-circle" size="is-large"></b-icon>
    </a>
    <div class="user-menu" v-if="isSelecting">
      <div class="user-menu_content" v-for="account in accounts" @click="setAccount(account)">
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
    </div>
  </div>
</template>

<script>
import login from '@/login'

export default {
  mixins: [login],
  data () {
    return {
      accounts: [],
      isSelecting: true
    }
  },
  methods: {
    getInstanceName (url) {
      return url.match(/https:\/\/([^.]*)/)[1]
    },
    setAccount (account) {
      console.log(this.$client)
      this.updateClient(account)
    }
  },
  mounted () {
    let self = this

    this.$db.find({ type: 'account' }).exec(function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      console.log(data)
      self.accounts = data
    })

    window.addEventListener('click', function (event) {
      // TODO: closest的なものを実装する
      if (event.target.parentNode.parentNode.className === 'user-select_button') {
        self.isSelecting = !self.isSelecting
      } else {
        self.isSelecting = false
      }
    })
  },
  name: 'user_select'
}
</script>

<style lang="sass">
.user-select
  +flex-center
  width: 64px
  height: 64px
  &_active
    color: rgb(41, 208, 183)!important
    &:hover
      color: rgb(41, 208, 183)!important
  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important


.user-menu
  position: absolute

  background-color: rgb(65, 62, 82)

  left: 60px
  top: 0px

  width: 60vw
  max-width: 400px
  min-width: 300px

  border-radius: 8px

  &_content
    z-index: 5000
    height: auto

  &:after
    content: ""
    display: block
    position: absolute
    width: 0
    height: 0
    border-style: solid
    border-width: 0 6px 10px
    border-color: transparent transparent rgb(65, 62, 82)
    top: 24px
    left: -10px
    transform: rotate(-90deg)
</style>
