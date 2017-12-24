import Mastodon from '../../node_modules/mastodon-api/lib/mastodon'
import Vue from 'vue'

export default {
  data () {
    return {
      error: '',
      clientId: '',
      clientSecret: ''
    }
  },
  methods: {
    login (baseUrl) {
      let self = this
      this.$db.find({ url: baseUrl, type: 'instance' }).exec(function (err, data) {
        if (err) {
          console.log(err)
          return
        }

        if (data.length === 0) {
          self.createApp(baseUrl)
        } else {
          console.log('exist!')

          Mastodon.getAuthorizationUrl(data[0].clientId, data[0].clientSecret, data[0].url, 'read write follow', 'urn:ietf:wg:oauth:2.0:oob')
            .then(url => {
              self.showLogin(url, data[0]['clientId'], data[0]['clientSecret'], baseUrl)
            })
        }
      })
    },
    createApp (baseUrl) {
      Mastodon.createOAuthApp(baseUrl + '/api/v1/apps', 'Janetodon', 'read write follow')
        .catch(err => {
          console.error(err)
          this.error = err.message
        })
        .then((res) => {
          this.clientId = res.client_id
          this.clientSecret = res.client_secret
          const doc = {
            url: baseUrl,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            type: 'instance'
          }
          let db = this.$db
          db.insert(doc, function (err) {
            if (err) {
              console.log(err.stack)
            }
            db.find({type: 'instance'}, (_, docs) => {
              console.dir(docs)
            })
          })

          return Mastodon.getAuthorizationUrl(this.clientId, this.clientSecret, baseUrl, 'read write follow', 'urn:ietf:wg:oauth:2.0:oob')
        })
        .then(url => {
          this.showLogin(url, this.clientId, this.clientSecret, baseUrl)
        })
    },
    showLogin (url, clientId, clientSecret, baseUrl) {
      let Electron = require('electron')
      let BrowserWindow = Electron.remote.BrowserWindow
      let loginWindow = new BrowserWindow({ width: 800, height: 600 })
      let self = this

      Electron.remote.session.defaultSession.clearStorageData(function () { // ストレージデータを削除
        loginWindow.loadURL(url)
        loginWindow.show()

        loginWindow.webContents.on('did-navigate', (event, url) => {
          let matched = url.match(/\/authorize\/(.*)/)
          if (matched) {
            loginWindow.close()
            self.getAccessToken(clientId, clientSecret, matched[1], baseUrl)
          }
        })
      })
    },
    getAccessToken (clientId, clientSecret, code, baseUrl) {
      Mastodon.getAccessToken(clientId, clientSecret, code, baseUrl)
        .catch(err => console.error(err))
        .then(accessToken => {
          console.log(accessToken)
          const MstdnClient = new Mastodon({
            access_token: accessToken,
            api_url: baseUrl + '/api/v1/'
          })

          Vue.prototype.$client = MstdnClient
          MstdnClient.get('accounts/verify_credentials', function (err, data, res) {
            if (!err) {
              self.saveUserInfo(baseUrl, data, accessToken)
            }
          })
        })
    },
    saveUserInfo (baseUrl, data, accessToken) {
      var id = data.id
      let db = this.$db

      let self = this

      db.find({ url: baseUrl, account_id: id, type: 'account' }).exec(function (err, data) {
        console.log('register')
        if (err) {
          console.log(err)
          return
        }
        if (data.length === 0) {
          const doc = {
            url: baseUrl,
            account_id: id,
            access_token: accessToken,
            type: 'account',
            is_active: true
          }

          db.insert(doc, function (err) {
            if (err) {
              console.log(err.stack)
            }
            db.find({type: 'account'}, (_, docs) => {
              console.dir(docs)
            })
          })
        }

        self.$router.push({ name: 'main-content' })
      })
    }
  }
}
