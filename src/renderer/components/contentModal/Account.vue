<template>
    <div class="account">

    </div>
</template>

<script>
export default {
  props: {
    accountId: {}
  },
  data () {
    return {
      accuontInfo: {}
    }
  },
  methods () {
    getTimeline (maxId) {
      let self = this
      this.$client.get('account/' + this.accountId), {}, function (err, data, res) {
        if (err) {
          console.log(err)
          return
        }
        self.accountInfo = data
        console.log(data)
      })
    },
  }
  name: 'account'
}
</script>

<style lang="sass">
</style>
