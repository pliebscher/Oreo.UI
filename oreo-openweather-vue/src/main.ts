import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import './assets/toaster.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia()) 
app.mount('#app')

// TODO: https://github.com/zafaralam/vue-3-toast