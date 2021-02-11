<template>
    <NuxtLink :to="to" class="root">
        <div class="flex h-18">
            <Icon class="icon-color-selected m-auto" :name="icon" :size="iconSize" />
        </div>

        <span class="title">{{ title }}</span>
    </NuxtLink>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class NavigationItemCollapsed extends Vue {
        @Prop({ default: "" })
        icon!: string;

        @Prop({ default: "" })
        iconSize!: string;

        @Prop({ default: "" })
        title!: string;

        @Prop({ default: undefined })
        to!: string;
    }
</script>

<style scoped lang="postcss">
    .root {
        @apply flex flex-col justify-center items-center;
        height: var(--navigation-item-height-collapsed);
    }

    .root:hover {
        background: var(--navigation-item-color-selected-collapsed-hover);
    }

    span:nth-child(1) {
        color: var(--navigation-icon-color-unselected);
    }

    span:nth-child(2) {
        color: var(--navigation-text-color-unselected);
    }

    .title {
        margin-top: 0.39rem;
        word-spacing: 0px;
        font-size: 0.62rem;
    }

    .nuxt-link-exact-active .title {
        color: var(--navigation-text-color-collapsed-selected);
    }

    .nuxt-link-exact-active .icon-color-selected {
        color: var(--navigation-icon-color-selected);
    }
</style>
