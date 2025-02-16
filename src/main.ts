import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import { useSocket } from './socket';

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.provide('socket', useSocket());

app.mount('#app')
