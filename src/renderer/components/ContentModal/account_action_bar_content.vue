<template>
  <div class="account-action-bar_content" @click="onClick">
    <p>
      {{ display }}
    </p>
    <strong style="font-size: 22px">{{ count }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    display: {},
    choice: {},
    count: {}
  },
  data () {
    return {
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this.choice)
    }
  },
  name: 'account-action-bar-content'
}
</script>

<style lang="sass">
$border-color: rgb(44, 48, 57)
.account-action-bar_content
  padding: 0px 36px
  cursor: pointer
  border-left: solid 1px $border-color
  border-right: solid 1px $border-color
</style>
