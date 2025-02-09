import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import searchIcon from './components/icons/search-icon.vue';
import popupComponent from './components/popup-component.vue';
import selectInput from './components/select-input-component.vue';
import skeletonCard from './components/skeleton-card-component.vue';
import textInput from './components/text-input-component.vue';
import i18n from './config/i18n';
import router from './router';

import './css/global.scss';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(createPinia());

app.component('SelectInput', selectInput);
app.component('SearchIcon', searchIcon);
app.component('TextInput', textInput);
app.component('SkeletonCard', skeletonCard);
app.component('PopupComponent', popupComponent);

app.mount('#app');
