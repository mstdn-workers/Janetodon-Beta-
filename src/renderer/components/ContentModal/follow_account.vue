<template>
  <article class="media follow-account" @click="wantAccount">
    <figure class="media-left">
      <p class="image is-48x48">
        <img class="icon-image" :src="account.avatar" />
      </p>
    </figure>
    <div class="media-content account-name">
      <strong>{{ displayName }}</strong>
      <small>@{{ account.acct }}</small>
    </div>
  </article>
</template>

<script>

export default {
  props: {
    account: {}
  },
  data () {
    return {
    }
  },
  computed: {
    displayName: function () {
      let display = this.account.display_name
      if (display === '') {
        display = this.account.username
      }
      return display
    }
  },
  methods: {
    wantAccount () {
      this.$eventCaller.$emit('want-account', this.account.id)
    }
  },
  name: 'follow-account'
}
</script>

<style lang="sass">
.follow-account
  padding: 10px 10%
  border-bottom: solid 1px rgb(71, 74, 92)

  cursor: pointer

.account-name
  display: flex
  flex-flow: column
</style>
