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

    <div class="button is-danger word-delete-button" @click="deleteCheckedWords">
      <b-icon icon="times"></b-icon>
      <span>
        Delete Checked Words
      </span>
    </div>
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

      let self = this
      this.$db.insert(doc, function (err) {
        if (err) {
          console.log(err.stack)
        }
        self.updateWords()
      })

      this.addedWord = ''
    },
    deleteCheckedWords () {
      let self = this

      this.checkedRows.forEach(function (val, index, excludeWords) {
        self.$db.remove({ _id: val['_id'] }, { }, function (_) {
          self.updateWords()
        })
      })
    },
    updateWords () {
      let self = this
      this.$db.find({type: 'exclude_word'}).sort({ word: 1 }).exec(function (_, docs) {
        self.excludeWords = docs
        self.$eventCaller.$emit('change-exclude', self.excludeWords)
        console.log(self.excludeWords)
      })
    }
  },
  mounted () {
    this.updateWords()
  },
  name: 'exclude-words'
}
</script>

<style lang="sass">
.config-accounts
  width: 100%
  min-height: 120px
  height: 650px

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
  height: 60%
  overflow-y: auto

  &::-webkit-scrollbar
    display: none

.word-delete-button
  position: relative
  top: 40px
</style>
