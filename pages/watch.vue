<template>
    <div class="watch">
        <iframe
            class="iframe"
            ref="iframe"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>

        <div class="comments">Adios</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Ref } from "nuxt-property-decorator";
    import { debounce } from "debounce";
    import { defaultStore } from "@/store";

    @Component
    export default class Watch extends Vue {
        videoId: string = "";

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        @Ref("iframe") readonly iframe!: HTMLIFrameElement;

        created() {
            this.videoId = this.$route.query.v.toString();

            window.addEventListener("resize", this.debouncedOnWindowResize);
            defaultStore.setNavigationAlwaysHidden(true);
        }

        mounted() {
            this.onWindowResize();
        }

        onWindowResize() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let iframeWidth = screenWidth * 0.5 + screenHeight * 0.7;

            if (iframeWidth > 1280) {
                iframeWidth = 1280;
            }

            const iframeHeigth = iframeWidth / (16 / 9);

            this.iframe.width = `${iframeWidth}px`;
            this.iframe.height = `${iframeHeigth}px`;
        }

        destroyed() {
            window.removeEventListener("resize", this.debouncedOnWindowResize);

            defaultStore.setNavigationAlwaysHidden(false);
        }
    }
</script>

<style scoped lang="postcss">
    .watch {
        @apply flex justify-center flex-col twoColumnsWatchVideo:flex-row;
        margin-top: 25px;
        height: 1000px;
    }

    .iframe {
        @apply bg-yellow-500 flex-grow;
        max-width: 1280px;
    }

    .comments {
        width: 425px;
    }

    /* .watch {
        @apply grid grid-cols-3;
    } */
</style>
