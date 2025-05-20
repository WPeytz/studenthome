const { defineConfig } = require('@vue/cli-service')
// vue.config.js
module.exports = {
  devServer: {
    client: {
      webSocketTransport: 'ws', // instead of 'sockjs'
    },
  },
}
