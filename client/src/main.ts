
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useAuth from './composables/useAuth'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

// initialize auth (restore user from token if present)
const auth = useAuth()
auth.init()

createApp(App).use(router).use(vuetify).mount('#app')
