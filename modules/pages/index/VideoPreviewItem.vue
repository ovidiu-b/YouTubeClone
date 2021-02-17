<template>
    <div :style="{ maxWidth: width }">
        <img class="img" :src="videoPreviewBO.thumbnail" :style="{ width: width }" />

        <CircularImage :src="videoPreviewBO.channelThumbnail" width="35" height="35" />

        <span>{{ videoPreviewBO.title }}</span>

        <span>{{ videoPreviewBO.channelTitle }}</span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import { CircularImage } from "@/components/drawables/module";
    import { VideoPreviewBO } from "@/model/module";

    @Component({
        components: {
            CircularImage
        }
    })
    export default class VideoPreviewItem extends Vue {
        @Prop({ default: "" })
        videoPreviewBO!: VideoPreviewBO;

        @Prop({ default: "" })
        width!: string;
    }
</script>

<style scoped lang="postcss">
    /* .video-preview-item {
        max-width: var(--index-column-max-width);
    } */

    .img {
        object-fit: cover;
        max-height: 100%;
    }
</style>
