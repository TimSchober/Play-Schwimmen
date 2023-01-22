const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
   },

  pwa: {
      name: "Schwimmen",
      themeColor: '#efa032',
      mobileWebAppCapable: 'yes',
      mobileWebAppCache:'yes',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppCache: 'yes',
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        navigateFallback: '/index.html',
        skipWaiting: true,
        clientsClaim: true
      },
      manifestOptions: {
        name: "Schwimmen",
        short_name: "Schwimmen",
        start_url: 'index.html',
        display: 'standalone',
        theme_color: '#CB4335'
      }
    }
})
