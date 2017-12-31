<template>
  <div class="notifications">
    <a :class="{ 'notifications_button': true, 'notifications_active': isSelecting}">
      <b-icon icon="bell" size="is-large"></b-icon>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'notification'
  }
</script>

<style lang="sass">
html body
.notifications
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

</style>
