<template>
  <div>
    <div class="main">
      <b-field>
        <b-switch v-model="isSpoilerActive">
          警告文を表示する
        </b-switch>
      </b-field>
      <b-field>
        <b-input placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
      </b-field>
      <b-field>
        <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
      </b-field>
      <div class="right">
        <div class="red" v-if="tootLength > 500">
          {{ 500 - tootLength }} / 500
        </div>
        <div v-else>
          {{ 500 - tootLength }} / 500
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      mainText: '',
      spoilerText: '',
      isSpoilerActive: false,
      visibility: 'public'
    }
  },
  methods: {
    toot () {
      let element = {
        status: this.mainText,
        spoilerText: this.spoilerText,
        visibility: this.visibility
      }
      this.mainText = ''
      this.spoilerText = ''
      this.$client.post('statuses', element, function (err, data, res) {
        if (err) {
          console.log(err)
        }
        console.log(data)
        console.log(res)
      })
    }
  },
  computed: {
    tootLength: function () {
      return this.mainText.length + this.spoilerText.length
    }
  },
  name: 'toot'
}
</script>

<style>
html, body, main {
  height: 100%;
}
.right {
  text-align: right;
}
.red {
  color: red;
}
</style>
