require('dotenv').config();

// ajouter seulement `router.base = '/<nom-du-depot>/'` si `DEPLOY_ENV` est `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
    base: '/spatiabot-website/'
} : {};

export default {
    mode: 'spa',
    target: 'static', // default: 'server',
    server: {
        port: process.env.PORT || 3000, // par défaut: 3000
        host: '0.0.0.0' // par défaut: localhost
    },
    router: {
        ...routerBase,
        routes : [
        ]

    },
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/main.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@plugins/vuetify'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        '@nuxtjs/auth',
        ['nuxt-matomo', { matomoUrl: 'http://matomo.heckayel.fr/', siteId: 1 }],
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    auth: {
        redirect: {
            login: '/user/connection'
            // logout: '/',
            // callback: '/login',
            // home: '/'
        },
        strategies: {
            local: {
                endpoints: {
                    login: {url: '/users/login', method: 'post', propertyName: 'token'},
                    user: {url: '/users/profile', method: 'get', propertyName: 'user'},
                    logout: false
                }
            },
            facebook: {
                client_id: '189722078743829',
                userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
                scope: ['public_profile', 'email', 'user_birthday']
            },
            google: {
                client_id: '275296264528-ap1rc83j08rffruvsfmreqg8n8h10p1t.apps.googleusercontent.com',
                redirect_uri: 'http://localhost:3003/user/connection',
                access_token_endpoint: '/auth/google-redirect'
            },
            discord:{
                client_id:'776101467152318464',
                redirect_uri: 'https://discord.com/api/oauth2/authorize?client_id=776101467152318464&redirect_uri=http%3A%2F%2Flocalhost%3A3041&response_type=code&scope=guilds%20identify%20email'
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        babel: {
            presets({isServer}) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: {version: 3}
                        }
                    ]
                ]
            }
        },
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },
    },
    // env: {
    //   WS_URL: process.env.WS_URL || 'http://localhost:3000'
    // }
}
