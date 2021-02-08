<template>
    <div class="root">
        <div class="column">1</div>
        <div class="column">2</div>
        <div class="column">3</div>
        <div class="column">4</div>
        <div class="column">5</div>
        <div class="column">6</div>
        <div class="column">7</div>
        <div class="column">8</div>
        <div class="column">9</div>
        <div class="column">10</div>
        <div class="column">11</div>
        <div class="column">12</div>
        <div class="column">13</div>
        <div class="column">14</div>
        <div class="column">15</div>
        <div class="column">16</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class Index extends Vue {}
</script>

<style scoped lang="postcss">
    .root {
        @apply grid gap-4 grid-cols-2 
        threeColumnsNavigationCollapsed:grid-cols-3 
        fourColumnsNavigationCollapsed:grid-cols-4 
        fiveColumnsNavigationExtended:grid-cols-5;
    }

    .column {
        @apply h-64 bg-blue-700;
    }
</style>
