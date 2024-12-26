<script lang="ts" setup>
import { postSignUp } from 'src/services/auth/auth-service';
import { isRequired } from 'src/utils/input-rules-utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const firstNameRef = ref();
const lastNameRef = ref();
const emailRef = ref();
const passwordRef = ref();

const signUp = async () => {
    if (
        !firstNameRef.value.validate(firstName.value) ||
        !lastNameRef.value.validate(lastName.value) ||
        !emailRef.value.validate(email.value) ||
        !passwordRef.value.validate(password.value)
    ) {
        return;
    }

    await postSignUp({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
    });

    await router.push('/');
};
</script>

<template>
    <div class="column gap-28">
        <h1 class="mb-28 text-center">
            {{ $t('signUp') }}
        </h1>

        <div class="row gap-28">
            <div class="width-100">
                <text-input
                    ref="firstNameRef"
                    v-model="firstName"
                    :rules="[isRequired]"
                    :label="$t('firstName')"
                />
            </div>

            <div class="width-100">
                <text-input
                    ref="lastNameRef"
                    v-model="lastName"
                    :rules="[isRequired]"
                    :label="$t('lastName')"
                />
            </div>
        </div>

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
        </div>

        <div class="row wrap gap-12">
            <button
                class="width-100 button primary"
                @click="signUp"
            >
                {{ $t('signUpBtn') }}
            </button>

            <router-link
                :to="{ name: 'sign-in' }"
                class="width-100 button border primary"
            >
                {{ $t('signIn') }}
            </router-link>
        </div>
    </div>
</template>
