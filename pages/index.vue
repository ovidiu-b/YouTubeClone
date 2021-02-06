<template>
    <div class="root">Index</div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class Index extends Vue {}
</script>

<style scoped lang="postcss">
    .root {
        height: 1200px;
    }
</style>
