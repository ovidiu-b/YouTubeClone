<template>
    <img :src="src" :width="width" :height="height" class="rounded-full" />
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";

    @Component
    export default class CircularImage extends Vue {
        @Prop({ default: "" })
        src!: string;

        @Prop({ default: "" })
        width!: string;

        @Prop({ default: "" })
        height!: string;
    }
</script>
