<template>
    <div class="inline">
        <div class="root">
            <p class="text">Inicia sesión para dar Me gusta a vídeos, añadir comentarios y suscribirte a canales.</p>

            <LoginButton class="button" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { LoginButton } from "@/components/buttons/module";

    @Component({
        components: {
            LoginButton
        }
    })
    export default class NavigationItemLogin extends Vue {}
</script>

<style scoped lang="postcss">
    .root {
        @apply px-8 pt-2;
    }

    .text {
        @apply text-sm;
        line-height: 1.35rem;
        word-spacing: 0px;
    }

    .button {
        @apply mt-3 mb-3.5;
    }
</style>
