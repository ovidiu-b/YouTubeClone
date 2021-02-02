<template>
    <button :style="{ color: color }" class="material-icons">{{ name }}</button>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class IconButton extends Vue {
        @Prop({ default: "" })
        name!: string;

        @Prop({ default: "#606060" })
        color!: string;
    }
</script>

<style scoped lang="postcss">
    button {
        @apply rounded-full;
    }

    button:focus {
        @apply outline-none;
    }
</style>
