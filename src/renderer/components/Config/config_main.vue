<template>
  <div class="config-main">
    <b-tabs size="is-medium" v-model="activeTab">
      <b-tab-item label="accounts" icon="user-circle">
        <account-config></account-config>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import AccountConfig from '@/components/Config/accounts'
export default {
  data () {
    return {
      activeTab: 0
    }
  },
  components: {
    AccountConfig
  },
  name: 'config-main'
}
</script>

<style lang="sass">
.config-main
  position: absolute
  transition: all 200ms 0s ease
  display: flex
  flex-flow: column
  border: solid 5px white
  border-radius: 40px
  background-color: $main-background
  width: 80vw
  height: 80vw
  top: 128px
  left: 64px
  transform-origin: -25px 90px
  padding: 10px
</style>
