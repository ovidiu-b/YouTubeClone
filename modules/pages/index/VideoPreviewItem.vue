<template>
    <div :style="{ maxWidth: width }">
        <div class="relative">
            <NuxtLink :to="watchVideoUrl">
                <img class="img cursor-pointer" :src="videoPreviewBO.thumbnail" :style="{ width: width }" />
            </NuxtLink>

            <div class="absolute bottom-0 right-0 bg-black mr-1 mb-1 px-1 py-0.5 font-medium text-white text-xs">
                {{ videoPreviewBO.duration | formatDuration }}
            </div>
        </div>

        <div class="flex mt-3">
            <div style="min-width: 35px">
                <CircularImage :src="videoPreviewBO.channelThumbnail" width="35" height="35" />
            </div>

            <div class="ml-3 mr-5">
                <p class="title title-font-style">{{ videoPreviewBO.title }}</p>

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

        watchVideoUrl: string = "";

        created() {
            this.watchVideoUrl = `/watch?v=${this.videoPreviewBO.id}`;
        }
    }
</script>

<style scoped lang="postcss">
    .img {
        max-height: 100%;
    }

    .title {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

    .title-font-style {
        @apply text-sm textLarge:text-base font-medium leading-5;
    }

    .subtitle-font-style {
        @apply text-sm;
        color: #606060;
        word-spacing: 0;
    }
</style>
