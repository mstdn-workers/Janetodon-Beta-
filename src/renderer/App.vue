<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
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

<style>
  /* CSS */
</style>
