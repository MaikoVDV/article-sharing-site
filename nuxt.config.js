export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'Article sharing site',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css" }, // Code highlighting stylesheet
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,700;1,400;1,700" } // Monospace code font
      ],
      // script: [
      //   { src: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"}
      // ]
    },
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        "~/assets/scss/articleview.scss",
        "~/assets/scss/generalSettings.scss",
        "~/assets/scss/variables.scss",
    ],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
  
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
    ],
  
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: '/',
    },
  
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
  }