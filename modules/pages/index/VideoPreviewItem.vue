<template>
    <div class="video-preview-item">
        <img class="img" :src="videoPreviewBO.thumbnail" />

        <!-- <CircularImage :src="videoPreviewBO.channelThumbnail" width="35" height="35" />

        <span>{{ videoPreviewBO.title }}</span>

        <span>{{ videoPreviewBO.channelTitle }}</span>  -->
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
    }
</script>

<style scoped lang="postcss">
    .video-preview-item {
        max-width: 100%;
    }

    .img {
        width: 360px;
        /* max-height: 100%;
        min-width: 100%;
        object-fit: cover; */
    }
</style>
