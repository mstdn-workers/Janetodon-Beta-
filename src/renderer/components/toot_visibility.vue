<template>
  <div class="toot_visibility">
    <b-dropdown v-model="visibility">
      <button class="button" type="button" slot="trigger">
        <template v-if="visibility === 'public'">
          <b-icon icon="globe"></b-icon>
        </template>
        <template v-if="visibility === 'unlisted'">
          <b-icon icon="unlock"></b-icon>
        </template>
        <template v-if="visibility === 'private'">
          <b-icon icon="lock"></b-icon>
        </template>
        <template v-if="visibility === 'direct'">
          <b-icon icon="envelope"></b-icon>
        </template>
      </button>

      <b-dropdown-item :value="'public'">
        <div class="media"  >
          <b-icon icon="globe"></b-icon>
          <span>公開</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'unlisted'">
        <div class="media"  >
          <b-icon icon="unlock"></b-icon>
          <span>未収載</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'private'">
        <div class="media"  >
          <b-icon icon="lock"></b-icon>
          <span>非公開</span>
        </div>
      </b-dropdown-item>
      <b-dropdown-item :value="'direct'">
        <div class="media"  >
          <b-icon icon="envelope"></b-icon>
          <span>ダイレクト</span>
        </div>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    visibility: {require: true}
  },
  data () {
    return {
    }
  },
  name: 'toot_visibility'
}
</script>

<style>
html, body, main {
  height: 100%;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
