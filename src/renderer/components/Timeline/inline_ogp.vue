<template>
  <div class="inline-ogp" @click="goToUrl">
    <div class="inline-ogp_left-bar"></div>

    <article class="media ogp-info">
      <div class="ogp-icon">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="ogps.image" />
          </p>
        </figure>
      </div>
      <p class="media-content ogp-content">
        <span class="ogp-site">{{ ogps.site_name }}</span>
        <strong class="ogp-title">{{ ogps.title }}</strong>
        <small> {{ ogps.description }}</small>
      </p>
    </article>
  </div>
</template>

<script>

export default {
  props: {
    ogps: {}
  },
  data () {
    return {

    }
  },
  methods: {
    goToUrl () {
      open(this.ogps.url, '_blank')
    }
  },
  name: 'inline-ogp'
}
</script>

<style lang="sass">
.inline-ogp
  position: relative
  display: inline
  cursor: pointer

  &_left-bar
    background-color: rgb(129, 139, 161)
    border-radius: 8px
    position: absolute
    width: 4px
    height: 80px
    top: 10px
    left: 20px
    z-index: 1
    margin-right: 20px

.ogp-info
  position: relative
  left: 20px

.ogp-content
  display: flex
  flex-flow: column
  top: 10px
  position: relative

  width: 60%

.ogp-site
  font-size: 18px
  font-weight: 800

.ogp-title
  color: rgb(125, 212, 201)

.ogp-icon
  +flex-center
  width: 80px
  height: 80px
  overflow: hidden
  margin: 10px
</style>
