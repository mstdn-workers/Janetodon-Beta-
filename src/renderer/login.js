import Vue from 'vue'

export default {
  methods: {
    createApp (baseUrl) {
      Mastodon.createOAuthApp (baseUrl + '/api/v1/apps', 'Janetodon'. 'read write follow')
      .catch (err => console.error(err))
      .then ((res) => {
        console.log(res)

        const clientId = res.client_id
        const clientSecret = res.client_secret
        doc = {
          url: baseUrl,
          clientId: clientId,
          clientSecret: clientSecret
        }

        this.$db.insert(doc, function(err) {
          var result = db.find({}, (err, docs) => {
            console.dir(docs);
          })
        })

        return Mastodon.getAuthorizationUrl(clientId, clientSecret, baseUrl)
      }
    }
  }
}
