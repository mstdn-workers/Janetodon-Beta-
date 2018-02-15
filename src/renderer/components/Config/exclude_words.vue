<template>
  <div class="config-accounts">
    <div class="add-form">
      <b-field style="width: 80%">
        <b-input v-model="addedWord" @keyup.native.enter="addExcludeWord"></b-input>
      </b-field>
      <a @click="addExcludeWord">
        <b-icon icon="plus-circle" size="is-medium"></b-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addedWord: ''
    }
  },
  methods: {
    addExcludeWord () {
      if (this.addedWord === '') {
        return
      }

      let doc = {
        word: this.addedWord,
        type: 'exclude_word'
      }

      let self = this
      this.$db.insert(doc, function (err) {
        if (err) {
          console.log(err.stack)
        }
        self.$db.find({type: 'exclude_word'}, (_, docs) => {
          console.dir(docs)
        })
      })
    }
  },
  name: 'exclude-words'
}
</script>

<style lang="sass">
.config-accounts
  width: 100%
  min-height: 100px
.add-form
  display: flex
  justify-content: center
  color: white
  width: 100%
  position: relative
  top: 40px
</style>
