<template>
  <div id="app">
    <div class="main-nav">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="navbar-end">
            <router-link class="navbar-item" :to="{ name: 'login'}">
              <b-icon icon="sign-in" size="is-small"></b-icon> ログイン
            </router-link>
          </div>
        </div>
      </nav>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'janetodon'
  }
</script>

<style lang="sass">
.main-nav
  width: 100%
  height: 60px
  position: fixed
  background-color: white
  z-index: 300
</style>
