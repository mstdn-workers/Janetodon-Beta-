<template>
  <div class="config-menu">
    <a :class="{ 'config-menu_button': true, 'config-menu_active': isSelecting}">
      <icon name="cog" scale="3"></icon>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSelecting: false
    }
  },
  mounted () {
    let self = this
    window.addEventListener('click', function (event) {
      if (event.target.closest('.config-menu_button')) {
        self.isSelecting = !self.isSelecting
      } else {
        self.isSelecting = false
      }
    })
  },
  name: 'config'
}
</script>

<style lang="sass">
.config-menu
  +flex-center
  width: 64px
  height: 64px

  &_active
    color: rgb(41, 205, 205)!important
    &:hover
      color: rgb(41, 205, 205)!important

  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important
</style>
