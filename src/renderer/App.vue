<template>
  <div id="app">
    <nav class="navbar main-nav" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" :to="{ name: 'login'}">
            <b-icon icon="sign-in" size="is-small"></b-icon> ログイン
          </router-link>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'janetodon'
}
</script>

<style lang="sass">
html body
  background-color: $main-background!important
  color: white
  height: 100vh

  &::-webkit-scrollbar
    display: none

a
  color: $a-color!important
  background-color: $main-background!important
  &:hover
    background-color: rgb(26, 29, 36)!important
    color: $a-color!important
.main-nav
  width: 100%
  height: 60px
  position: fixed
  z-index: 1000
  background-color: $main-background
  color: white
</style>
