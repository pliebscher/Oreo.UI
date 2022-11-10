import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
 
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
//app.use(axios, {baseUrl: ""})
app.mount('#app')

function handleError() {

}
