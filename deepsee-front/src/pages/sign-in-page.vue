<script lang="ts" setup>
import { postSignIn } from 'src/services/auth/auth-service';
import { isRequired } from 'src/utils/input-rules-utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const emailRef = ref();
const passwordRef = ref();

const signIn = async () => {
    if (!emailRef.value?.validate(email.value) || !passwordRef.value?.validate(password.value)) {
        return;
    }

    await postSignIn({
        email: email.value,
        password: password.value,
    });

    router.push('/');
};
</script>

<template>
    <div class="column gap-28">
        <h1 class="mb-28 text-center">
            {{ $t('signIn') }}
        </h1>

        <div>
            <text-input
                ref="emailRef"
                v-model="email"
                :rules="[isRequired]"
                :label="$t('email')"
            />
        </div>

        <div>
            <text-input
                ref="passwordRef"
                v-model="password"
                :rules="[isRequired]"
                :label="$t('password')"
                type="password"
            />

            <div class="mt-4 row justify-end">
                <router-link to="/">
                    {{ $t('forgottenPassword') }}
                </router-link>
            </div>
        </div>

        <div class="row wrap gap-12">
            <button
                class="width-100 button primary"
                @click="signIn"
            >
                {{ $t('signInBtn') }}
            </button>

            <router-link
                :to="{ name: 'sign-up' }"
                class="width-100 button border primary"
            >
                {{ $t('signUp') }}
            </router-link>
        </div>
    </div>
</template>
