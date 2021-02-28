<template>
    <button @click="$emit('onButtonClicked')" :style="{ fontSize: size, color: color }" class="material-icons">{{ name }}</button>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class IconButton extends Vue {
        @Prop({ default: "" })
        name!: string;

        @Prop({ default: "" })
        size!: string;

        @Prop({ default: "#606060" })
        color!: string;
    }
</script>

<style scoped lang="postcss">
    button {
        @apply rounded-full focus:outline-none;
    }
</style>
