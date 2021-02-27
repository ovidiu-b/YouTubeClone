<template>
    <div class="watch">
        <iframe
            width="100%"
            height="100%"
            class="iframe"
            ref="iframe"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>

        <div class="comments"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Ref } from "nuxt-property-decorator";
    import { debounce } from "debounce";
    import { defaultStore, watchStore } from "@/store";

    @Component
    export default class Watch extends Vue {
        videoId: string = "";

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        @Ref("iframe") readonly iframe!: HTMLIFrameElement;

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

            let iframeWidth = screenWidth * 0.6 + screenHeight * 0.3;

            if (iframeWidth > 1280) {
                iframeWidth = 1280;
            }

            const iframeHeigth = iframeWidth / (16 / 9);

            this.iframe.style.maxWidth = `${iframeWidth}px`;
            this.iframe.style.maxHeight = `${iframeHeigth}px`;
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
        @apply flex justify-center flex-col twoColumnsWatchVideo:flex-row;
        margin-top: 25px;
        height: 1000px;
    }

    .iframe {
        @apply flex-grow;
        margin: 0 auto;
        max-width: 1280px;
    }

    .comments {
        width: 425px;
        height: 1000px;
    }

    /* .watch {
        @apply grid grid-cols-3;
    } */
</style>
