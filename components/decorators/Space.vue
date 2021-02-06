<template>
    <div :style="{ height: height }"></div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class Space extends Vue {
        @Prop({ default: "" })
        height!: string;
    }
</script>

<style scoped></style>
