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

    <b-table
      :data="excludeWords"
      :columns="columns"
      :checked-rows.sync="checkedRows"
      checkable
      class="words-list">
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      excludeWords: [],
      addedWord: '',
      columns: [
        {
          field: 'word',
          label: 'Exclude Word'
        }
      ],
      checkedRows: []
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

      this.excludeWords.push({ 'word': this.addedWord })

      this.$eventCaller.$emit('change-exclude', this.excludeWords)

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
  mounted () {
    let self = this
    this.$db.find({ type: 'exclude_word' }).exec(function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      self.excludeWords = data
    })
  },
  name: 'exclude-words'
}
</script>

<style lang="sass">
.config-accounts
  width: 100%
  min-height: 120px
  height: 600px

.add-form
  display: flex
  justify-content: center
  color: white
  width: 100%
  position: relative
  top: 40px
.words-list
  position: relative
  top: 40px
  height: 80%
  overflow-y: auto

  &::-webkit-scrollbar
    display: none
</style>
