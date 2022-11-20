import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// For accessing environment variables
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

// CSS...
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia()) 

app.mount('#app')

// TODO:Add global error handling...
