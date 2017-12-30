<template>
  <div class="action-bar">
    <a :class="{ 'action-bar_boost-active': action.boost }" @click="boost">
      <b-icon icon="retweet"></b-icon>
    </a>
    <a :class="{ 'action-bar_fav-active': action.favorite }" @click="favorite">
      <b-icon icon="star"></b-icon>
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
        action: { boost: false, favorite: false }
      }
    },
    methods: {
      boost () {
        let self = this
        this.$client.post('statuses/' + this.status.id + (this.action.boost ? '/unreblog' : '/reblog'), {})
          .then(resp => {
            if (resp.data.length !== 0) {
              self.action.boost = ~self.action.boost
            }
          })
      },
      favorite () {
        let self = this
        this.$client.post('statuses/' + this.status.id + (this.action.favorite ? '/unfavourite' : '/favourite'), {})
          .then(resp => {
            if (resp.data.length !== 0) {
              self.action.favorite = ~self.action.favorite
            }
          })
      }
    },
    mounted () {
      this.action.boost = this.status.reblogged
      this.action.favorite = this.status.favourited
    },
    name: 'action_bar'
  }
</script>

<style lang="sass">
.action-bar
  display: flex
  &_boost-active
    color: rgb(60, 203, 223)!important
    &:hover
      color: rgb(60, 203, 223)!important
  &_fav-active
    color: rgb(254, 187, 58)!important
    &:hover
      color: rgb(254, 187, 58)!important
</style>
