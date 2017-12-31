<template>
  <div class="notifications">
    <a :class="{ 'notifications_button': true, 'notifications_active': isSelecting}">
      <b-icon icon="bell" size="is-large"></b-icon>
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

      this.$db.find({ type: 'account' }).exec(function (err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log(data)
        self.accounts = data
      })

      window.addEventListener('click', function (event) {
        if (event.target.parentNode.parentNode.className === 'notifications_button') {
          self.isSelecting = !self.isSelecting
        } else {
          self.isSelecting = false
        }
      })
    },
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
    color: rgb(232, 213, 45)!important
    &:hover
      color: rgb(232, 213, 45)!important
  &_button
    background-color: $side-bar-back!important
    &:hover
      background-color: $side-bar-back!important

</style>
