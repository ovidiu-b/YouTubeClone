<template>
    <div class="index">
        <div class="grid-layout" :class="{ maxWidthNormal: hasMaxWidthNormal, maxWidthLarge: hasMaxWidthLarge }">
            <template v-for="video in getVideos">
                <VideoPreviewItem :key="video.id" :videoPreviewBO="video" />
            </template>
        </div>
    </div>
</template>

<script scoped lang="ts">
    import { Component, Vue, InjectReactive, Watch } from "nuxt-property-decorator";
    import { VideoPreviewItem } from "@/modules/pages/index/module";
    import { NavigationMode } from "@/modules/app/module";
    import { BreakpointUtil } from "@/utils/module";
    import { indexStore } from "@/store";

    @Component({
        components: {
            VideoPreviewItem
        }
    })
    export default class Index extends Vue {
        hasMaxWidthNormal: boolean = true;
        hasMaxWidthLarge: boolean = false;

        @InjectReactive("navigationMode")
        navigationMode!: NavigationMode;

        @Watch("navigationMode")
        onNavigationModeChange(navigationMode: NavigationMode) {
            let screenWidth = window.innerWidth;

            if (screenWidth < BreakpointUtil.maxWidthNavigationCollapsed) {
                this.hasMaxWidthNormal = navigationMode == NavigationMode.EXTENDED;
            }
        }

        mounted() {
            indexStore.loadVideos();
        }

        get getVideos() {
            return indexStore.videoPreviewList;
        }

        created() {
            let screenWidth = window.innerWidth;

            if (screenWidth < BreakpointUtil.maxWidthNavigationCollapsed) {
                this.hasMaxWidthNormal = this.navigationMode == NavigationMode.EXTENDED;
            }
        }
    }
</script>

<style scoped lang="postcss">
    .index {
        @apply flex justify-center;
        margin-top: 25px;
        margin-left: 24px;
        margin-right: 24px;
    }

    .grid-layout {
        @apply grid grid-cols-1 gap-4
        twoColumnsNavigationHidden:grid-cols-2
        twoColumnsNavigationCollapsed:grid-cols-2
        threeColumnsNavigationCollapsed:grid-cols-3
        fourColumnsNavigationCollapsed:grid-cols-4
        fiveColumnsNavigationExtended:grid-cols-5
        sixColumnsNavigationExtended:grid-cols-6;
    }

    .max-width-normal {
        max-width: 1490px;
    }

    .max-width-large {
        max-width: 2240px;
    }

    @media only screen and (min-width: 2290px) {
        .grid-layout {
            @apply max-width-large;
        }
    }
</style>
