<script lang="ts" setup>
import { showAlert } from 'src/components/alert/alert-composable';
import { postSignUp } from 'src/services/auth/auth-service';
import { isRequired } from 'src/utils/input-rules-utils';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const firstNameRef = ref();
const lastNameRef = ref();
const emailRef = ref();
const passwordRef = ref();

const isFormValid = (): boolean => {
    return !!firstNameRef.value?.validate({ value: firstName.value }) &&
        !!lastNameRef.value?.validate({ value: lastName.value }) &&
        !!emailRef.value?.validate({ value: email.value }) &&
        !!passwordRef.value?.validate({ value: password.value });
};

const signUp = async () => {
    if (!isFormValid()) {
        return;
    }

    try {
        await postSignUp({
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
        });
    } catch {
        showAlert({
            duration: 5000,
            message: t('error.user-already-exists'),
            type: 'error',
        });
        return;
    }

    if (route.query.redirect) {
        router.push(route.query.redirect as string);
        return;
    }

    await router.push('/');
};
</script>

<template>
    <div class="column gap-28">
        <h1 class="mb-28 text-center">
            {{ t('signUp') }}
        </h1>

        <div class="row gap-28">
            <div class="width-100">
                <text-input
                    ref="firstNameRef"
                    v-model="firstName"
                    :rules="[isRequired]"
                    :label="t('firstName')"
                />
            </div>

            <div class="width-100">
                <text-input
                    ref="lastNameRef"
                    v-model="lastName"
                    :rules="[isRequired]"
                    :label="t('lastName')"
                />
            </div>
        </div>

        <div>
            <text-input
                ref="emailRef"
                v-model="email"
                :rules="[isRequired]"
                :label="t('email')"
            />
        </div>

        <div>
            <text-input
                ref="passwordRef"
                v-model="password"
                :rules="[isRequired]"
                :label="t('password')"
                type="password"
            />
        </div>

        <div class="row wrap gap-12">
            <button
                class="width-100 button primary"
                @click="signUp"
            >
                {{ t('signUpBtn') }}
            </button>

            <router-link
                :to="{ name: 'sign-in' }"
                class="width-100 button border primary"
            >
                {{ t('signIn') }}
            </router-link>
        </div>
    </div>
</template>
