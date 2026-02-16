import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './presentation/assets/main.css'
import './presentation/assets/tailwind.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
