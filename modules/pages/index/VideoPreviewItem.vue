<template>
    <div :style="{ maxWidth: width }">
        <img class="img" :src="videoPreviewBO.thumbnail" :style="{ width: width }" />

        <div class="flex mt-3">
            <div style="min-width: 35px">
                <CircularImage :src="videoPreviewBO.channelThumbnail" width="35" height="35" />
            </div>

            <div class="ml-3 mr-5">
                <p class="title-font-style">{{ videoPreviewBO.title }}</p>

                <p class="subtitle-font-style mt-1.5">{{ videoPreviewBO.channelTitle }}</p>

                <p class="subtitle-font-style -mt-0.5">
                    {{ videoPreviewBO.viewCount | formatViewCount }} &bull; {{ videoPreviewBO.timeElapsed | formatTimeElapsed }}
                </p>
            </div>
        </div>
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
        max-height: 100%;
    }

    .title-font-style {
        @apply font-medium leading-5;
    }

    .subtitle-font-style {
        @apply text-sm;
        color: #606060;
        word-spacing: 0;
    }
</style>
