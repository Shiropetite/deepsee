<template>
    <div class="page">
        <h1 class="mb-28">
            {{ $t('contact') }}
        </h1>

        <div class="column gap-18">
            <div>
                {{ $t('contactPage.introduction') }}
            </div>

            <div>
                {{ $t('contactPage.email', { email: $t('contactInfo.email') }) }}
            </div>

            <div>
                {{ $t('contactPage.confidentiality') }}
            </div>
        </div>
    </div>
</template>
