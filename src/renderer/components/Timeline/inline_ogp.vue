<template>
  <div class="inline-ogp">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="ogps.image" />
        </p>
      </figure>
      <p class="media-content ogp-content">
        <small>{{ ogps.site_name }}</small>
        <strong>{{ ogps.title }}</strong>
        <small> {{ ogps.title }}</small>
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
  name: 'inline-ogp'
}
</script>

<style lang="sass">
.ogp-content
  display: flex
  flex-flow: column
</style>
