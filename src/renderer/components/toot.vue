<template>
  <div class="toot">
    <b-field>
      <b-input class="spoiler-text" placeholder="警告文" v-model="spoilerText" v-if="isSpoilerActive" @keyup.native.ctrl.enter="toot"></b-input>
      <b-input class="spoiler-text-deleted" placeholder="警告文" v-model="spoilerText" v-else></b-input>
    </b-field>


    <div v-if="isFileEnter && dropMedia.length <= 4" class="view-box-active">
      <b-upload v-model="dropMedia" multiple drag-drop>
        <div class="view-box"></div>
      </b-upload>
      <div class="upload-area">
        <div class="upload-area-content">
          <div class="center">
            ドラッグ&amp;ドロップでアップロード
          </div>
        </div>
      </div>
    </div>

    <div v-else class="view-box-deleted">

    </div>

    <b-field>
      <b-input type="textarea" placeholder="本文(Ctrl-enterで送信)" v-model="mainText" @keyup.native.ctrl.enter="toot"></b-input>
    </b-field>
    <b-field>
      <b-upload v-if="dropMedia.length <= 4" v-model="dropMedia" drag-drop>
        <b-icon icon="upload"></b-icon>
      </b-upload>

      <toot-visibility :visibility="visibility"></toot-visibility>

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
      <div class="right">
        <div class="red" v-if="tootLength > 500">
          {{ 500 - tootLength }} / 500
        </div>
        <div v-else>
          {{ 500 - tootLength }} / 500
        </div>
      </div>
    </b-field>
  </div>
</template>

<script>
import TootVisibility from '@/components/toot_visibility'

export default {
  props: {
    isFileEnter: {}
  },
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
    },
    dragLeave () {
      console.log('leave')
    }
  },
  computed: {
    tootLength: function () {
      return this.mainText.length + this.spoilerText.length
    }
  },
  components: {
    TootVisibility
  },
  name: 'toot'
}
</script>

<style>
html, body, main {
  height: 100%;
}

.right {
   margin-left: auto;
 }

.red {
  color: red;
}

.spoiler-text {
  animation-name: verticalFadeIn;
  animation-duration: 300ms;
  animation-timing-function: ease;
  height: 4ex;
  opacity: 1;
}

.spoiler-text-deleted {
  animation-name: verticalFadeOut;
  animation-duration: 300ms;
  animation-timing-function: ease;
  height: 0ex;
  opacity: 0;
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

.view-box {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.0);
  display: flex;
  z-index: 500;
  /* visibility: hidden; */
  position: fixed;
  top: 0px;
  left: 0px;

  display: flex;
}

.view-box-active {
  animation-name: fadeIn;
  animation-duration: 300ms;
  animation-timing-function: ease;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.67);

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 500;

  /* 左右中央 */
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  /* 上下中央 */
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  display: flex;
}

.view-box-deleted {
  animation-name: fadeOut;
  animation-duration: 200ms;
  animation-timing-function: ease;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.67);
  opacity: 0;

  z-index: 500;
  position: fixed;
  top: 0px;
  left: 0px;


  pointer-events: none;
}


.upload-area {
  border-radius: 8px;

  width: 320px;
  height: 160px;

  display: flex;

  box-sizing: border-box;
  position: relative;

  background-color: rgb(72, 68, 87);

  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  /* 上下中央 */
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.upload-area-content {
  /* 左右中央 */
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  /* 上下中央 */
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  flex: 1;
  color: rgb(215, 215, 215);
  font-size: 20px;
  font-weight: 600;

  border: 2px dotted;

  height: 90%;
  border-radius: 8px;
}

.center {
  height: 100%;
  display: flex;
  /* 左右中央 */
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

  /* 上下中央 */
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
@@keyframes fadeIn {
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

@@keyframes fadeOut {
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0%
  }
}


@keyframes verticalFadeIn {
  0% {
    height: 0ex;
    opacity: 0;
  }
  100% {
    height: 4ex;
    opacity: 1;
  }
}

@keyframes verticalFadeOut {
  0% {
    height: 4ex;
    opacity: 1;
  }
  100% {
    height: 0ex;
    opacity: 0;
  }
}
</style>
