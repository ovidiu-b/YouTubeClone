<template>
    <button class="subscribe-button">Suscribirme</button>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class SubscribeButton extends Vue {}
</script>

<style scoped lang="postcss">
    .subscribe-button {
        @apply uppercase text-white font-medium text-sm pt-0.5 mt-0.5 focus:outline-none;
        background-color: #cc0000;
        width: 122px;
        height: 37px;
    }
</style>
