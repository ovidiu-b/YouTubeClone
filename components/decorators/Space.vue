<template>
    <div :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class Space extends Vue {
        @Prop({ default: "" })
        height!: string;

        @Prop({ default: "" })
        width!: string;
    }
</script>

<style scoped></style>
