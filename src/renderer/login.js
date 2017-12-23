import Mastodon from '../../node_modules/mastodon-api/lib/mastodon'

export default {
  data () {
    return {
      clientId: '',
      clientSecret: ''
    }
  },
  methods: {
    login (baseUrl) {
      let self = this
      this.$db.find({ url: baseUrl, type: 'instance' }).exec(function (err, data) {
        console.log(data)
        if (err) {
          console.log(err)
          return
        }

        if (data.length === 0) {
          self.createApp(baseUrl)
        } else {
          console.log('exist!')
          console.log(data[0].clientId)
          console.log(data[0].clientSecret)
          console.log(data[0].url)
          Mastodon.getAuthorizationUrl(data[0].clientId, data[0].clientSecret, data[0].url, 'read write follow', 'urn:ietf:wg:oauth:2.0:oob')
            .then(url => {
              self.showLogin(url, data[0]['clientId'], data[0]['clientSecret'], baseUrl)
            })
        }
      })
    },
    createApp (baseUrl) {
      console.log(baseUrl)
      Mastodon.createOAuthApp(baseUrl + '/api/v1/apps', 'Janetodon', 'read write follow')
        .catch(err => console.error(err))
        .then((res) => {
          console.log(res)

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

          return Mastodon.getAuthorizationUrl(this.clientId, this.clientSecret, baseUrl, 'read write follow', 'https://google.com/')
        })
        .then(url => {
          this.showLogin(url, this.clientId, this.clientSecret, baseUrl)
        })
    },
    showLogin (url, clientId, clientSecret, baseUrl) {
      console.log(url)
      let electron = require('electron')
      let BrowserWindow = electron.remote.BrowserWindow
      let loginWindow = new BrowserWindow({ width: 800, height: 600 })

      loginWindow.loadURL(url)
      loginWindow.show()

      loginWindow.webContents.on('will-navigate', (event, url) => {
        loginWindow.close()
        console.log(url)
        let matched = url.match(/\/authorize\/(.*)/)
        console.log(matched)
        if (matched) {
          let self = this
          Mastodon.getAccessToken(clientId, clientSecret, matched[1], baseUrl)
            .catch(err => console.error(err))
            .then(accessToken => {
              console.log(accessToken)
              const MstdnClient = new Mastodon({
                access_token: accessToken,
                api_url: baseUrl + '/api/v1/'
              })
              MstdnClient.get('accounts/verify_credentials', function (err, data, res) {
                if (!err) {
                  console.log(data)
                  console.log(res)
                  var id = data.id
                  const doc = {
                    url: baseUrl,
                    account_id: id,
                    type: 'account'
                  }
                  let db = self.$db
                  db.insert(doc, function (err) {
                    if (err) {
                      console.log(err.stack)
                    }
                    db.find({type: 'account'}, (_, docs) => {
                      console.dir(docs)
                    })
                  })
                }
              })
            })
        }
      })
    }
  }
}
