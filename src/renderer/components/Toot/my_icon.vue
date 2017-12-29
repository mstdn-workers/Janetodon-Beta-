<template>
  <!-- <div class="my-icon">
  </div> -->
  <article class="media my-icon">
    <figure class="media-left">
      <p class="image is-48x48">
        <img :src="iconPath" />
      </p>
    </figure>
    <div class="media-content icon-name">
      <strong>{{ display }}</strong><small>@{{ username }}</small>
      <div>

      </div>
    </div>
  </article>
</template>

<script>
export default {
  data () {
    return {
      iconPath: '',
      username: '',
      display: ''
    }
  },
  mounted () {
    let self = this
    this.$client.get('accounts/verify_credentials', function (err, data, res) {
      if (!err) {
        self.iconPath = data.avatar
        self.username = data.acct
        self.display = data.display_name
      }
    })
  },
  name: 'my_icon'
}
</script>

<style lang="sass">
.my-icon
  padding: 4px
.icon-name
  height: 48px
  color: rgb(217, 217, 217)
  font-size: 18px

  display: flex
  align-items: center

strong
  color: rgb(217, 217, 217)
</style>
