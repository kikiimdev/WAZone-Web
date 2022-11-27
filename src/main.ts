import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import App from './App.vue'
import pinia from './plugins/pinia'
import router from './plugins/vue-router'

loadFonts()

const app = createApp(App)
app.use(pinia).use(router).use(vuetify)
app.mount('#app')
