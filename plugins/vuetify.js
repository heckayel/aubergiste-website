import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
import colors from "vuetify/es5/util/colors"

Vue.use(Vuetify)

export default ctx => {
    const vuetify = new Vuetify({
        theme: {
            themes: {
                light: {
                    // primary: '#6a6e6b',
                    // secondary: '#fff',
                    //         accent: colors.deepPurple.accent3,
                    //         secondary: colors.amber.darken3,
                    //         info: colors.teal.lighten1,
                    //         warning: colors.amber.base,
                    //         error: colors.deepOrange.accent4,
                    //         success: colors.green.accent4
                },
            },
        },
    })

    ctx.app.vuetify = vuetify
    ctx.$vuetify = vuetify.framework
}
