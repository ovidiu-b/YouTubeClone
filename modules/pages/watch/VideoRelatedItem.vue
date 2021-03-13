<template>
    <div class="videoRelatedItem">
        <img @click="goToWatchVideo" width="167.5px" :src="video.thumbnail" class="cursor-pointer" />

        <div class="ml-2">
            <p class="text-max-lines-2 title-font-style">{{ video.title }}</p>
            <p class="subtitle-font-style mt-1 text-max-lines-1">{{ video.channel.title }}</p>

            <div style="max-width: 150px">
                <p class="subtitle-font-smal-style">
                    {{ video.viewCount | formatViewCount }} &bull; {{ video.timeElapsed | formatTimeElapsed }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Ref } from "nuxt-property-decorator";
    import { VideoBO } from "@/model/module";

    @Component
    export default class VideoRelatedItem extends Vue {
        @Prop({ default: "" })
        video!: VideoBO;

        @Ref("link")
        link!: HTMLAnchorElement;

        watchVideoUrl: string = "";

        created() {
            this.watchVideoUrl = `/watch?v=${this.video.id}`;
        }

        goToWatchVideo() {
            /* what this does is just updating the v query value
                 when this executes the onUrlChange() method in watch page is triggered
            */
            this.$router.push({ path: this.watchVideoUrl });
        }
    }
</script>

<style scoped lang="postcss">
    .videoRelatedItem {
        @apply flex;
    }

    .title-font-style {
        @apply text-sm font-medium leading-4;
    }

    .subtitle-font-style {
        @apply text-sm;
        color: var(--text-color-gray);
        word-spacing: 0;
    }

    .subtitle-font-smal-style {
        font-size: 0.79rem;
        color: var(--text-color-gray);
        word-spacing: 0;
    }
</style>
