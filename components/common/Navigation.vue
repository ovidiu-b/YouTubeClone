<template>
    <div class="root h-full"></div>
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
  }
</style>
