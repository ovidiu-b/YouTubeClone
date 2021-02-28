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
    }
</style>
