<template>
    <button :style="{ borderColor: color }">
        <Icon name="account_circle" size="28px" class="mr-1" :color="color" />

        <span :style="{ color: color }" style="font-size: 14px" class="mt-0.5">INICIAR SESIÓN</span>
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
        @apply flex justify-center items-center flex-shrink-0 focus:outline-none select-none border;
        height: 40px;
        width: 157px;
    }

    span {
        @apply font-medium;
    }
</style>
