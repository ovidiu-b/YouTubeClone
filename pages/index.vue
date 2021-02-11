<template>
    <div class="root">
        <!-- <VideoPreviewItem /> -->

        <div class="grid-layout" :class="{ maxWidthNormal: hasMaxWidthNormal, maxWidthLarge: hasMaxWidthLarge }">
            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, InjectReactive, Watch } from "nuxt-property-decorator";
    import { VideoPreviewItem } from "@/modules/pages/index/module";
    import { NavigationMode } from "@/modules/app/module";
    import { BreakpointUtil } from "@/utils/module";

    @Component({
        components: {
            VideoPreviewItem
        }
    })
    export default class Index extends Vue {
        dataSampleListIndex: Number[] = [1, 2, 3, 4, 5, 6, 7];
        hasMaxWidthNormal: boolean = true;
        hasMaxWidthLarge: boolean = false;

        @InjectReactive("navigationMode")
        navigationMode!: NavigationMode;

        @Watch("navigationMode")
        onNavigationModeChange(navigationMode: NavigationMode) {
            if (process.browser) {
                let screenWidth = window.innerWidth;

                if (screenWidth < BreakpointUtil.maxWidthNavigationCollapsed) {
                    this.hasMaxWidthNormal = navigationMode == NavigationMode.EXTENDED;
                }
            }
        }

        created() {
            if (process.browser) {
                let screenWidth = window.innerWidth;

                if (screenWidth < BreakpointUtil.maxWidthNavigationCollapsed) {
                    this.hasMaxWidthNormal = this.navigationMode == NavigationMode.EXTENDED;
                }
            }
        }
    }
</script>

<style scoped lang="postcss">
    .root {
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

    .maxWidthNormal {
        max-width: 1490px;
    }

    .maxWidthLarge {
        max-width: 2240px;
    }

    @media only screen and (min-width: 2290px) {
        .grid-layout {
            @apply maxWidthLarge;
        }
    }
</style>
