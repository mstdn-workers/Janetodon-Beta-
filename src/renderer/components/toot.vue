<template>
  <div class="toot">
    <b-field>
    </b-field>
    <b-field>
      <b-input placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
    </b-field>
    <b-field>
      <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
    </b-field>
    <b-field>
      <b-upload v-if="dropMedia.length <= 4" v-model="dropMedia" multiple drag-drop>
        <b-icon icon="upload"></b-icon>
      </b-upload>
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
      <a v-if="isSpoilerActive" class="button spoiler-active" @click="isSpoilerActive=false">
        <div class="spoiler-button-text">
          CW
        </div>
      </a>
      <a v-else class="button" @click="isSpoilerActive=true">
        <div class="spoiler-button-text">
          CW
        </div>
      </a>
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
</template>

<script>
export default {
  data () {
    return {
      mainText: '',
      spoilerText: '',
      isSpoilerActive: false,
      visibility: 'public',
      dropMedia: []
    }
  },
  methods: {
    toot () {
      let element = {
        status: this.mainText,
        spoiler_text: this.spoilerText,
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
.spoiler-button-text{
  font-weight: bold;
  font-size: 0.8em;
  letter-spacing: -0.1em;
}
.spoiler-active {
  color: rgb(41, 208, 183);
}
.spoiler-active:hover {
  color: rgb(41, 208, 183);
}
</style>
