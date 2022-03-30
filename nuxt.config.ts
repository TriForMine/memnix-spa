export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    titleTemplate: '%s - Memnix',
    title: 'Memnix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Memnix Web App' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-snip'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'memnix_i18n',
      redirectOn: 'root', // recommended
    },
    seo: true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.json',
      },
      {
        code: 'ro',
        iso: 'ro',
        file: 'ro.json',
      },
    ],
    vueI18n: {
      fallbackLocale: 'en',
    },
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    baseUrl: 'https://memnix.app/',
  },

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://memnix.app/sitemap.xml',
  },

  sitemap: {
    hostname: 'https://memnix.app',
    gzip: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'Memnix Web',
      author: 'CorentinGS',
    },
    manifest: {
      name: 'Memnix Web',
      short_name: 'Memnix',
      lang: 'en',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/safari-pinned-tab.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'monochrome',
        },
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes:
        {
          light: {
            primary: '#88C0D0', // Nord 8
            primarycontainer: '#81A1C1',
            accent: '#8FBCBB', // Nord 7
            secondary: '#81A1C1', // Nord 9
            info: '#5E81AC', // Nord 10
            warning: '#EBCB8B', // Nord 13
            error: '#BF616A', // Nord 11
            success: '#A3BE8C', // Nord 14
            background: '#ECEFF4', // Nord 6
            surface: '#E5E9F0', // Nord 5
            surfacevariant: '#D8DEE9', // Nord 4
            outline: '#5E81AC', // Nord 10
            oncolor: '#4C566A',
            onbackground: '#2E3440', // Nord 0
            onsuccess: '#4C566A',

          },
          dark: {
            primary: '#F8BD96', // Peach
            primarycontainer: '#1A1826', // Flamingo
            accent: '#F5C2E7', // Pink
            secondary: '#DDB6F2', // Mauve
            info: '#B5E8E0', // Teal
            warning: '#FAE3B0', // Warning
            error: '#F28FAD', // Red
            success: '#ABE9B3', // Green
            background: '#1E1E2E', // Black 2
            surface: '#1A1826', // Black 1
            surfacevariant: '#1E1E2E', // Black 0
            outline: '#89DCEB', // Sky
            oncolor: '#4C566A',
            onbackground: '#D9E0EE', // White
            onsuccess: '#4C566A',

          },
        },

          /* Nord
                    light: {
            primary: '#88C0D0', // Nord 8
            primarycontainer: '#81A1C1',
            accent: '#8FBCBB', // Nord 7
            secondary: '#81A1C1', // Nord 9
            info: '#5E81AC', // Nord 10
            warning: '#EBCB8B', // Nord 13
            error: '#BF616A', // Nord 11
            success: '#A3BE8C', // Nord 14
            background: '#ECEFF4', // Nord 6
            surface: '#E5E9F0', // Nord 5
            surfacevariant: '#D8DEE9', // Nord 4
            outline: '#5E81AC', // Nord 10
            oncolor: '#4C566A',
            onbackground: '#2E3440', // Nord 0
            onsuccess: '#4C566A',

          },
          dark: {
            primary: '#88C0D0', // Nord 8
            primarycontainer: '#81A1C1',
            accent: '#8FBCBB', // Nord 7
            secondary: '#81A1C1', // Nord 9
            info: '#5E81AC', // Nord 10
            warning: '#EBCB8B', // Nord 13
            error: '#BF616A', // Nord 11
            success: '#A3BE8C', // Nord 14
            background: '#2E3440', // Nord0
            surface: '#3B4252', // Nord 1
            surfacevariant: '#434C5E', // Nord 2
            outline: '#5E81AC', // Nord 10
            oncolor: '#4C566A',
            onbackground: '#ECEFF4', // Nord 6
            onsuccess: '#4C566A',

          },




           Old
          light: {
            primary: '#00658e',
            accent: '#9b432d',
            primarycontainer: '#c4e7ff',
            secondary: '#00668b',
            info: '#c1e8ff',
            warning: '#9b432d',
            error: '#B3261E',
            success: '#1eb325',
            background: '#fbfdfd', // Not automatically applied
            surface: '#fbfdfd',
            surfacevariant: '#E7E0EC',
            outline: '#79747E',
            oncolor: '#ffffff',
            onbackground: '#191c1d',
            onsuccess: '#ffffff'

          },
          dark: {
            primary: '#7fcfff',
            primarycontainer: '#004c6c',
            accent: '#ffb4a0',
            secondary: '#75d1ff',
            info: '#004c69',
            warning: '#ffb4a0',
            error: '#F2B8B5',
            success: '#b5f2b8',
            background: '#191c1d', // Not automatically applied
            surface: '#191c1d',
            surfacevariant: '#49454F',
            outline: '#938F99',
            oncolor: '#00344c',
            onbackground: '#e0e3e3',
            onsuccess: '#191c1d',

          },
        },
        */

        /*
        {
          name: "default",
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        }, */

    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
    port: '1814',
  },
}
