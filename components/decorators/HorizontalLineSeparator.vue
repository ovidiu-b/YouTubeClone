<template>
    <hr />
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class HorizontalLineSeparator extends Vue {}
</script>

<style scoped lang="postcss">
    hr {
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>
