<template>
    <span :style="{ fontSize: size, color: color }" class="material-icons"> {{ name }} </span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class Icon extends Vue {
        @Prop({ default: "" })
        name!: string;

        @Prop({ default: "" })
        size!: string;

        @Prop({ default: "#606060" })
        color!: string;
    }
</script>

<style scoped></style>
