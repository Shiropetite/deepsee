import { createApp } from 'vue';

import App from './App.vue';
import searchIcon from './components/icons/search-icon.vue';
import selectInput from './components/select-input.vue';
import router from './router';

import './css/global.scss';

const app = createApp(App);

app.use(router);

app.component('SelectInput', selectInput);
app.component('SearchIcon', searchIcon);

app.mount('#app');
