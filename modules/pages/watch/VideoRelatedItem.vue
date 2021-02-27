<template>
    <div class="videoRelatedItem">
        <img width="167.5px" :src="video.thumbnail" />

        <div class="ml-2">
            <p class="title title-font-style">{{ video.title }}</p>
            <p class="subtitle-font-style mt-1">{{ video.channelTitle }}</p>

            <div style="max-width: 150px">
                <p class="subtitle-font-smal-style">
                    {{ video.viewCount | formatViewCount }} &bull; {{ video.timeElapsed | formatTimeElapsed }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import { VideoBO } from "@/model/module";

    @Component
    export default class VideoRelatedItem extends Vue {
        @Prop({ default: "" })
        video!: VideoBO;

        created() {}
    }
</script>

<style scoped lang="postcss">
    .videoRelatedItem {
        @apply flex;
    }

    .title {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

    .title-font-style {
        @apply text-sm font-medium leading-4;
    }

    .subtitle-font-style {
        @apply text-sm;
        color: #606060;
        word-spacing: 0;
    }

    .subtitle-font-smal-style {
        font-size: 0.79rem;
        color: #606060;
        word-spacing: 0;
    }
</style>
