<template>
    <div>
        <div class="root button" @click.stop="onItemClicked" v-if="to == undefined">
            <div v-if="hasIconSlot" class="flex w-18">
                <slot name="icon"></slot>
            </div>

            <div v-else class="flex w-18">
                <CircularImage v-if="iconImage != undefined" :src="iconImage" width="24" height="24" class="m-auto" />

                <Icon v-else class="icon-color-selected m-auto select-none" :name="icon" :size="iconSize" />
            </div>

            <span class="mt-0.5 text-sm text-selected select-none" style="word-spacing: 0px">{{ title }}</span>
        </div>

        <NuxtLink v-else :to="to" class="root">
            <div v-if="hasIconSlot" class="flex w-18">
                <slot name="icon"></slot>
            </div>

            <div v-else class="flex w-18">
                <CircularImage v-if="iconImage != undefined" :src="iconImage" width="24" height="24" class="m-auto" />

                <Icon v-else class="icon-color-selected m-auto" :name="icon" :size="iconSize" />
            </div>

            <span class="mt-0.5 text-sm text-selected" style="word-spacing: 0px">{{ title }}</span>
        </NuxtLink>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
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

        @Prop({ default: undefined })
        to!: string;

        get hasIconSlot(): boolean {
            return !!this.$slots.icon;
        }

        @Emit("onItemClicked")
        onItemClicked() {}
    }
</script>

<style scoped lang="postcss">
    .root {
        @apply flex place-items-center py-1.5;
        height: var(--navigation-item-height);
    }

    .root:hover {
        background: var(--navigation-item-color-unselected-hover);
    }

    .button {
        cursor: pointer;
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
