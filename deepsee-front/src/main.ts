import textInput from 'src/components/text-input-component.vue';
import { createApp } from 'vue';

import App from './App.vue';
import searchIcon from './components/icons/search-icon.vue';
import selectInput from './components/select-input-component.vue';
import skeletonCard from './components/skeleton-card-component.vue';
import router from './router';

import './css/global.scss';

const app = createApp(App);

app.use(router);

app.component('SelectInput', selectInput);
app.component('SearchIcon', searchIcon);
app.component('TextInput', textInput);
app.component('SkeletonCard', skeletonCard);

app.mount('#app');
