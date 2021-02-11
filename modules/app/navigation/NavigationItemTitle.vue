<template>
    <span class="title">{{ title }}</span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class NavigationItemTitle extends Vue {
        @Prop({ default: "" })
        title!: string;
    }
</script>

<style scoped lang="postcss">
    .title {
        @apply inline-block uppercase font-medium text-sm ml-6 mt-2 mb-1.5;
        color: var(--text-color-gray);
        word-spacing: 0px;
    }
</style>
