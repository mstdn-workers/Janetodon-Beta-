import Mastodon from '../../node_modules/mastodon-api/lib/mastodon'

export default {
  methods: {
    login (baseUrl) {
      if (this.$db.find({ baseUrl: baseUrl })) {
        console.log('exist!')
        return Mastodon.getAuthorizationUrl(this.$db['clientId'], this.$db['clientSecret'], this.$db['baseUrl'])
      } else {
        console.log(baseUrl)
        Mastodon.createOAuthApp(baseUrl + '/api/v1/apps', 'Janetodon', 'read write follow')
          .catch(err => console.error(err))
          .then((res) => {
            console.log(res)

            const clientId = res.client_id
            const clientSecret = res.client_secret
            const doc = {
              url: baseUrl,
              clientId: clientId,
              clientSecret: clientSecret
            }
            let db = this.$db
            db.insert(doc, function (err) {
              if (err) {
                console.log(err.stack)
              }
              db.find({}, (_, docs) => {
                console.dir(docs)
              })
            })

            return Mastodon.getAuthorizationUrl(clientId, clientSecret, baseUrl)
          })
      }
    }
  }
}
