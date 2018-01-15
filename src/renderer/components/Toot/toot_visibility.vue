<template>
  <div class="toot-visibility">
    <b-dropdown v-model="visibility"  @change="changeVisibility()">
      <button class="button toot-setting-button" type="button" slot="trigger">
        <template v-if="visibility === 'public'">
          <icon name="globe"></icon>
        </template>
        <template v-if="visibility === 'unlisted'">
          <icon name="unlock"></icon>
        </template>
        <template v-if="visibility === 'private'">
          <icon name="lock"></icon>
        </template>
        <template v-if="visibility === 'direct'">
          <icon name="envelope"></icon>
        </template>
      </button>

      <b-dropdown-item :value="'public'">
        <div class="media"  >
          <icon name="globe"></icon>
          <span>公開</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'unlisted'">
        <div class="media"  >
          <icon name="unlock"></icon>
          <span>未収載</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'private'">
        <div class="media"  >
          <icon name="lock"></icon>
          <span>非公開</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'direct'">
        <div class="media"  >
          <icon name="envelope"></icon>
          <span>ダイレクト</span>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visibility: 'public'
    }
  },
  methods: {
    changeVisibility () {
      this.$emit('change', this.visibility)
    }
  },
  name: 'toot_visibility'
}
</script>

<style lang="sass">
.toot-visibility
  background: $main-background!important
.dropdown-content
  background-color: $main-background
  border-radius: 3px
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
  padding-bottom: 0.5rem
  padding-top: 0.5rem
</style>
