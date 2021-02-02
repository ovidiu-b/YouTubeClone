<template>
    <button :style="{ borderColor: color }">
        <Icon name="account_circle" size="30px" class="-ml-1 mr-1" :color="color" />

        <span class="mt-0.5 font-medium" :style="{ color: color }" style="font-size: 14px">INICIAR SESIÓN</span>
    </button>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class LoginButton extends Vue {
        @Prop({ default: "#065fd4" })
        color!: string;
    }
</script>

<style scoped lang="postcss">
    button {
        @apply flex place-items-center flex-shrink-0 select-none border px-3 py-1;
    }

    button:focus {
        @apply outline-none;
    }
</style>
