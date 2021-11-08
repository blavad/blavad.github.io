import { createApp } from 'vue'
import ErnestApp from './AppErnest.vue'
import store from '../../store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(ErnestApp)
app.use(store)
app.mount('#app')