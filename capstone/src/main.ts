import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);

// Use router
app.use(router);

// Use Pinia for state management
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
