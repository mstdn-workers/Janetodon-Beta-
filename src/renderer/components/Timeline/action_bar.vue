<template>
  <div class="action-bar">
    <a @click="boost">
      <b-icon icon="refresh" :custom-class="boostClass()"></b-icon>
    </a>
    <a @click="favorite">
      <b-icon icon="star" :custom-class="favClass()"></b-icon>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      status: {}
    },
    data () {
      return {
        action: { boost: false, favorite: false },
        isStart: true
      }
    },
    methods: {
      boost () {
        let self = this
        // this.$client.post('statuses/' + this.status.id + (this.action.boost ? '/unreblog' : '/reblog'), {})
        //   .then(resp => {
        //     if (resp.data.length !== 0) {
        //       self.action.boost = ~self.action.boost
        //     }
        //   })
        self.action.boost = ~self.action.boost
      },
      favorite () {
        let self = this
        // this.$client.post('statuses/' + this.status.id + (this.action.favorite ? '/unfavourite' : '/favourite'), {})
        //   .then(resp => {
        //     if (resp.data.length !== 0) {
        //       self.action.favorite = ~self.action.favorite
        //     }
        //   })
        self.action.favorite = ~self.action.favorite
      },
      boostClass () {
        if (this.isStart) {
          return this.action.boost ? 'action-bar_boost-active' : ''
        }
        return this.action.boost ? 'action-bar_boost-active' : 'action-bar_boost-delete'
      },
      favClass () {
        if (this.isStart) {
          return this.action.favorite ? 'action-bar_fav-active' : ''
        }
        return this.action.favorite ? 'action-bar_fav-active' : 'action-bar_fav-delete'
      }
    },
    mounted () {
      this.action.boost = this.status.reblogged
      this.action.favorite = this.status.favourited
      this.isStart = false
    },
    name: 'action_bar'
  }
</script>

<style lang="sass">
.action-bar
  display: flex
  &_boost-active
    animation-name: spinIn
    animation-duration: 500ms
    animation-timing-function: ease
    color: rgb(60, 203, 223)!important
    transform: rotate(180deg)

    &:hover
      color: rgb(60, 203, 223)!important

  &_boost-delete
    animation-name: spinOut
    animation-duration: 500ms
    animation-timing-function: ease

  &_fav-active
    animation-name: favorite
    animation-duration: 600ms
    animation-timing-function: linear
    color: rgb(254, 187, 58)!important

    &:hover
      color: rgb(254, 187, 58)!important

  &_fav-delete
    animation-name: unfavorite
    animation-duration: 300ms
    animation-timing-function: ease

@keyframes spinIn
  0%
    color: $a-color
    transform: rotate(0deg)

@keyframes spinOut
  0%
    color: rgb(60, 203, 223)
    transform: rotate(180deg)

@keyframes favorite
  10%
    transform: scale(0.3)
    color: $a-color
  20%
    transform: scale(0)
  30%
    transform: scale(0.4)
    color: rgb(254, 187, 58)
  40%
    transform: scale(1.2)
  50%
    transform: salce(1.4)
  60%
    transform: scale(0.8)
  70%
    transform: scale(1.1)
  80%
    transform: scale(0.9)
  90%
    transform: scale(1.05)

@keyframes unfavorite
  0%
    color: rgb(254, 187, 58)

</style>
