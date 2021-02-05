<template>
    <div class="root"></div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class Navigation extends Vue {}
</script>

<style scoped>
    .root {
        background: yellow;
        width: 230px;
        @apply h-full;
    }
</style>
