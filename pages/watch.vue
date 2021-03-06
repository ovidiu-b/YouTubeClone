<template>
    <div class="watch">
        <div class="flex flex-col">
            <div class="iframeContainer" ref="iframeContainer">
                <Space class="watchVideoEnableMarginLeft:hidden" width="24px" />
                <iframe
                    width="100%"
                    height="100%"
                    :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                <Space class="twoColumnsWatchVideo:hidden" width="24px" />
            </div>

            <div v-if="video" class="flex">
                <Space class="watchVideoEnableMarginLeft:hidden" width="24px" />

                <!-- w-0 is set so that the comments doesn't overlap this div width -->
                <div class="flex flex-grow flex-col w-0">
                    <div class="flex">
                        <div class="flex flex-grow flex-col">
                            <p class="mt-4 text-lg">{{ video.title }}</p>

                            <div class="flex">
                                <div class="mt-2.5 overflow-hidden" style="max-height: 30px">
                                    <span class="subtitle-font-style word-wrap: break-word">
                                        {{ video.viewCount | formatCount(true) }} visualizaciones
                                    </span>

                                    <span class="inline-block subtitle-font-style pr-3">
                                        &bull; {{ video.timeElapsed | formatTimeElapsed(true) }}
                                    </span>
                                </div>

                                <div class="flex flex-grow justify-end items-end">
                                    <div class="flex items-center mt-2">
                                        <IconButton class="mr-1.5" name="thumb_up" color="var(--text-color-gray-light)" />

                                        <p class="control-actions-font-style mr-5 mt-0.5">{{ video.likeCount | formatCount }}</p>

                                        <IconButton class="mr-1.5" name="thumb_down" color="var(--text-color-gray-light)" />

                                        <p class="control-actions-font-style mr-5 mt-0.5">{{ video.dislikeCount | formatCount }}</p>

                                        <IconButton class="mr-1.5" name="reply" size="28px" color="var(--text-color-gray-light)" />

                                        <p class="control-actions-font-style mr-5 mt-0.5">COMPARTIR</p>

                                        <IconButton class="mr-1.5" name="playlist_add" color="var(--text-color-gray-light)" />

                                        <p class="control-actions-font-style mr-5 mt-0.5">GUARDAR</p>

                                        <IconButton
                                            class="mr-1.5 self-end"
                                            name="more_horiz"
                                            size="26px"
                                            color="var(--text-color-gray-light)"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-1">
                                <HorizontalLineSeparator />
                            </div>
                        </div>

                        <Space class="twoColumnsWatchVideo:hidden" width="24px" />
                    </div>

                    <div class="flex mt-2">
                        <div>
                            <CircularImage :src="video.channel.thumbnail" width="48px" height="48px" />
                        </div>

                        <div class="flex flex-col flex-grow mt-1.5 ml-4 w-0">
                            <div class="flex">
                                <div class="flex flex-grow">
                                    <div class="flex flex-col justify-center">
                                        <p class="font-medium text-sm -mb-1">{{ video.channel.title }}</p>

                                        <p style="font-size: 0.8rem; color: var(--text-color-gray)">
                                            {{ video.channel.subscriberCount | formatSubscribeCount }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-center">
                                    <SubscribeButton />
                                </div>
                            </div>

                            <div
                                ref="descriptionContainer"
                                class="mt-5 leading-5 overflow-hidden"
                                style="max-width: 630px; font-size: 0.885rem; word-spacing: 0"
                                v-html="videoDescriptionHtml"
                                :style="{ maxHeight: descriptionHeight }"
                            ></div>

                            <button
                                @click="showFullDescription = !showFullDescription"
                                class="self-start font-medium uppercase focus:outline-none py-2 mt-0.5"
                                style="font-size: 0.82rem; color: var(--text-color-gray)"
                            >
                                {{ showMoreOrLessButtonText }}
                            </button>
                        </div>

                        <Space class="twoColumnsWatchVideo:hidden" width="24px" />
                    </div>

                    <div class="mb-4">
                        <HorizontalLineSeparator />
                    </div>

                    <div class="flex mb-4 twoColumnsWatchVideoMax:hidden">
                        <p>{{ commentCount }} comentarios</p>

                        <button class="flex items-center focus:outline-none ml-8">
                            <Icon name="sort" color="var(--text-color-gray-light)" />
                            <span class="control-actions-font-style ml-3">Ordenar por</span>
                        </button>
                    </div>

                    <template v-for="comment in commentsGetter">
                        <CommentItem :comment="comment" :key="comment.id" />
                    </template>
                </div>
            </div>
        </div>

        <div v-if="relatedVideos" class="relatedVideos">
            <template v-for="relatedVideo in relatedVideos">
                <VideoRelatedItem class="ml-6 mb-2" :key="relatedVideo.id" :video="relatedVideo" />
            </template>
        </div>

        <div class="flex my-4 twoColumnsWatchVideo:hidden">
            <Space class="watchVideoEnableMarginLeft:hidden" width="24px" />

            <p>{{ commentCount }} comentarios</p>

            <button class="flex items-center focus:outline-none ml-8">
                <Icon name="sort" color="var(--text-color-gray-light)" />
                <span class="control-actions-font-style ml-3">Ordenar por</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Ref, Watch } from "nuxt-property-decorator";
    import { debounce } from "debounce";
    import { defaultStore, watchStore } from "@/store";
    import { VideoRelatedItem, CommentItem } from "@/modules/pages/watch/module";
    import { BreakpointUtil } from "@/utils/module";
    import { Space } from "@/components/decorators/module";
    import { VideoBO } from "@/model/module";
    import { Icon } from "@/components/drawables/module";
    import { IconButton, SubscribeButton } from "@/components/buttons/module";
    import { HorizontalLineSeparator } from "@/components/decorators/module";
    import { CircularImage } from "@/components/drawables/module";
    import { CommentThreadOrder } from "~/google-api/youtube-api/types/enums/module";

    @Component({
        components: {
            VideoRelatedItem,
            CommentItem,
            Space,
            Icon,
            IconButton,
            SubscribeButton,
            HorizontalLineSeparator,
            CircularImage
        }
    })
    export default class WatchPage extends Vue {
        videoId: string = "";
        video: VideoBO | null = null;
        relatedVideos: VideoBO[] | null = null;
        videoDescriptionHtml: string | null = null;
        showFullDescription: boolean = false;
        showMoreOrLessButtonText: string = "Mostrar más";
        commentCount: string | null = null;
        descriptionHeight: string = "60px";

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        isMounted: boolean = false;

        @Ref("iframeContainer") readonly iframeContainer!: HTMLDivElement;
        @Ref("descriptionContainer") readonly descriptionContainer!: HTMLDivElement;

        get videoGetter() {
            return watchStore.videoBO;
        }

        get relatedVideosGetter() {
            return watchStore.relatedVideosBO;
        }

        get commentsGetter() {
            return watchStore.commentsBO;
        }

        @Watch("videoGetter")
        watchVideoGetter(newValue: VideoBO) {
            this.video = newValue;

            this.videoDescriptionHtml = this.video.description.replaceAll("\n", "<br/>");
            this.commentCount = this.video.commentCount;
        }

        @Watch("relatedVideosGetter")
        watchRelatedVideosGetter(newValue: VideoBO[]) {
            this.relatedVideos = newValue;
        }

        @Watch("showFullDescription")
        watchShowFullDescription(newValue: boolean) {
            if (newValue) {
                this.showMoreOrLessButtonText = "Mostrar menos";
                this.descriptionHeight = "100%";
            } else {
                this.showMoreOrLessButtonText = "Mostrar más";
                this.descriptionHeight = "60px";
            }
        }

        @Watch("$route", { immediate: true, deep: true })
        onUrlChange() {
            if (this.isMounted) {
                this.onCreated();
                this.onMounted();
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }
        }

        created() {
            this.onCreated();
        }

        mounted() {
            this.onMounted();
            this.isMounted = true;
        }

        onCreated() {
            this.videoId = this.$route.query.v.toString();

            window.addEventListener("resize", this.debouncedOnWindowResize);

            // Cuando entramos en esta pantalla, desactivamos el menu lateral
            defaultStore.setNavigationAlwaysHidden(true);
        }

        onMounted() {
            this.onWindowResize();
            watchStore.loadVideoById(this.videoId);
            watchStore.loadCommentsByVideoId({ videoId: this.videoId, order: CommentThreadOrder.MOST_RELEVANT });
        }

        /* Cada vez que se cambie de tamaño la pantalla, tenemos que calcular las dimensiones del video, para que
            quede en una escla 16 / 9
        */
        onWindowResize() {
            const screenWidth = window.innerWidth;

            let iframeWidth = 0;

            if (screenWidth < BreakpointUtil.twoColumnsWatchVideo) {
                iframeWidth = screenWidth - 20;
            } else {
                /* + 24 because of the scrollbar width */
                iframeWidth = screenWidth - 470 + 24;
            }

            if (iframeWidth > 1280) {
                iframeWidth = 1280;
            }

            let iframeHeigth = iframeWidth / (16 / 9);

            /* This is for erasing the black top and bottom that appears when the screen width is less than 1721 */
            if (screenWidth < 1721) {
                iframeHeigth = iframeHeigth - 15;
            }

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

    .relatedVideos {
        @apply flex flex-col;
        max-width: 425px;
    }

    .subtitle-font-style {
        @apply text-sm;
        color: var(--text-color-gray);
        word-spacing: 0;
    }

    .control-actions-font-style {
        @apply text-sm font-medium uppercase;
        color: var(--text-color-gray);
        word-spacing: 0;
    }
</style>
