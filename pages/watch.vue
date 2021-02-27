<template>
    <div class="watch">
        <div class="iframeContainer" ref="iframeContainer">
            <div class="watchVideoEnableMarginLeft:hidden" style="width: 24px"></div>
            <iframe
                width="100%"
                height="100%"
                :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            <div class="twoColumnsWatchVideo:hidden" style="width: 24px"></div>
        </div>

        <div class="comments">
            <template v-for="relatedVideo in relatedVideos">
                <VideoRelatedItem class="ml-6 mb-2" :key="relatedVideo.id" :video="relatedVideo" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Ref } from "nuxt-property-decorator";
    import { debounce } from "debounce";
    import { defaultStore, watchStore } from "@/store";
    import { VideoRelatedItem } from "@/modules/pages/watch/module";
    import { BreakpointUtil } from "@/utils/module";

    @Component({
        components: { VideoRelatedItem }
    })
    export default class Watch extends Vue {
        videoId: string = "";

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        @Ref("iframeContainer") readonly iframeContainer!: HTMLDivElement;

        get video() {
            return watchStore.videoBO;
        }

        get relatedVideos() {
            return watchStore.relatedVideos;
        }

        created() {
            this.videoId = this.$route.query.v.toString();

            window.addEventListener("resize", this.debouncedOnWindowResize);

            // Cuando entramos en esta pantalla, desactivamos el menu lateral
            defaultStore.setNavigationAlwaysHidden(true);
        }

        mounted() {
            this.onWindowResize();
            watchStore.loadVideoById(this.videoId);
        }

        /* Cada vez que se cambie de tamaño la pantalla, tenemos que calcular las dimensiones del video, para que 
            quede en una escla 16 / 9 
        */
        onWindowResize() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let iframeWidth = 0;

            if (screenWidth < BreakpointUtil.twoColumnsWatchVideo) {
                iframeWidth = screenWidth - 20;
            } else {
                iframeWidth = screenWidth * 0.6 + screenHeight * 0.3;
            }

            if (iframeWidth > 1280) {
                iframeWidth = 1280;
            }

            const iframeHeigth = iframeWidth / (16 / 9);

            this.iframeContainer.style.width = `${iframeWidth}px`;
            this.iframeContainer.style.height = `${iframeHeigth}px`;
        }

        destroyed() {
            window.removeEventListener("resize", this.debouncedOnWindowResize);

            // Cuando salimos de esta pantalla tenemos que volver a activar el menu
            defaultStore.setNavigationAlwaysHidden(false);
        }
    }
</script>

<style scoped lang="postcss">
    .watch {
        @apply flex justify-start flex-col twoColumnsWatchVideo:justify-center twoColumnsWatchVideo:flex-row;
        margin-top: 25px;
    }

    .iframeContainer {
        @apply flex mx-auto twoColumnsWatchVideo:mx-0;
    }

    .comments {
        @apply flex flex-col;
        width: 425px;
    }
</style>
