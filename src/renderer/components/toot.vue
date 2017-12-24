<template>
  <div>
    <div class="main">
      <b-field>
        <b-input placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive"></b-input>
      </b-field>
      <b-field>
        <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainText: '',
      spoilerText: '',
      isSpoilerActive: true,
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
  name: 'toot'
}
</script>

<style>
html, body, main {
  height: 100%;
}
</style>
