import { ref } from 'vue';

const alert = ref({
    message: '',
    nb: 0,
    type: 'info',
});
const isOpen = ref(false);
let initTime = null;
let time = null;

export const isOpened = () => isOpen.value;
export const getAlert = () => alert.value;

const initAlert = () => {
    isOpen.value = false;
    initTime = setTimeout(() => {
        alert.value.message = '';
        alert.value.type = 'info';
        alert.value.nb = 0;
    }, 1000);
};

export const showAlert = ({ duration, message, type }) => {
    clearTimeout(time);
    clearTimeout(initTime);
    isOpen.value = true;
    alert.value.message = message;
    alert.value.type = type;
    alert.value.nb += 1;

    time = setTimeout(() => {
        initAlert();
    }, duration);
};
