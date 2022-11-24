import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// CSS...
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia()) 

app.mount('#app')

// TODO:Add global error handling...
