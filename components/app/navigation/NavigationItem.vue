<template>
    <NuxtLink :to="to" class="nuxt-link">
        <div v-if="iconImage != undefined" class="flex w-18">
            <CircularImage :src="iconImage" width="24" height="24" class="m-auto" />
        </div>

        <div v-else class="flex w-18">
            <Icon class="icon-color-selected m-auto" :name="icon" :size="iconSize" />
        </div>

        <span class="mt-0.5 text-sm text-selected">{{ title }}</span>
    </NuxtLink>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import { Icon, CircularImage } from "../../drawables/module";

    @Component({
        components: {
            Icon,
            CircularImage
        }
    })
    export default class NavigationItem extends Vue {
        @Prop({ default: "" })
        icon!: string;

        @Prop({ default: "" })
        iconSize!: string;

        @Prop({ default: undefined })
        iconImage!: string;

        @Prop({ default: "" })
        title!: string;

        @Prop({ default: "/" })
        to!: string;
    }
</script>

<style scoped lang="postcss">
    .nuxt-link {
        @apply flex place-items-center py-1.5;
        height: var(--navigation-item-height);
    }

    .nuxt-link:hover {
        background: var(--navigation-item-color-unselected-hover);
    }

    .nuxt-link-exact-active:hover {
        background: var(--navigation-item-color-selected-hover);
    }

    span:nth-child(1) {
        color: var(--navigation-icon-color-unselected);
    }

    span:nth-child(2) {
        color: var(--navigation-text-color-unselected);
    }

    .nuxt-link-exact-active {
        background: #e5e5e5;
    }

    .nuxt-link-exact-active .text-selected {
        color: var(--navigation-text-color-selected);
        @apply mt-0 font-medium;
    }

    .nuxt-link-exact-active .icon-color-selected {
        color: var(--navigation-icon-color-selected);
    }
</style>
