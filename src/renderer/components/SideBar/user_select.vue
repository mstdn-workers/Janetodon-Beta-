<template>
  <div class="user-select">
    <a class="user-select_button">
      <b-icon icon="user-circle" size="is-large"></b-icon>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accounts: []
    }
  },
  name: 'user_select'
}
</script>

<style lang="sass">
.user-select
  +flex-center
  width: 64px
  height: 64px
  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important
</style>
