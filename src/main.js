import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './routes/routes'
import './index.css'
import axios from 'axios'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(axios.defaults)

app.component('Datepicker', Datepicker);
app.mount('#app')