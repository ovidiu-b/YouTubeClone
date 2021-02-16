<template>
    <div class="index">
        <div
            class="grid-layout"
            :class="{
                maxWidthSmall: hasHasWidthSmall,
                maxWidthNormal: hasMaxWidthNormal,
                maxWidthLarge: hasMaxWidthLarge,
                oneColumn: enableOneColumn,
                twoColumns: enableTwoColumns,
                threeColumns: enableThreeColumns,
                fourColumns: enableFourColumns,
                fiveColumns: enableFiveColumns,
                sixColumns: enableSixColumns
            }"
        >
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
    import { debounce } from "debounce";

    @Component({
        components: {
            VideoPreviewItem
        }
    })
    export default class Index extends Vue {
        hasHasWidthSmall: boolean = false;
        hasMaxWidthNormal: boolean = false;
        hasMaxWidthLarge: boolean = false;

        enableOneColumn: boolean = false;
        enableTwoColumns: boolean = false;
        enableThreeColumns: boolean = false;
        enableFourColumns: boolean = false;
        enableFiveColumns: boolean = false;
        enableSixColumns: boolean = false;

        @InjectReactive("navigationMode")
        navigationMode!: NavigationMode;

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        @Watch("navigationMode")
        onNavigationModeChange(navigationMode: NavigationMode) {
            //let screenWidth = window.innerWidth;

            this.setColumns();

            /* if (screenWidth < BreakpointUtil.maxWidthNormalNavigationCollapsed) {
                this.hasMaxWidthNormal = navigationMode == NavigationMode.EXTENDED;
            } */
        }

        setColumns() {
            this.disableAllColumns();

            let screenWidth = window.innerWidth;

            switch (this.navigationMode) {
                case NavigationMode.EXTENDED: {
                    if (screenWidth < BreakpointUtil.twoColumnsNavigationHidden) {
                        this.enableOneColumn = true;
                    } else if (
                        screenWidth >= BreakpointUtil.twoColumnsNavigationHidden &&
                        screenWidth < BreakpointUtil.threeColumnsNavigationCollapsed
                    ) {
                        this.enableTwoColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.threeColumnsNavigationCollapsed &&
                        screenWidth < BreakpointUtil.fourColumnsNavigationCollapsed
                    ) {
                        this.enableThreeColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.fourColumnsNavigationCollapsed &&
                        screenWidth < BreakpointUtil.fiveColumnsNavigationExtended
                    ) {
                        this.enableFourColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.fiveColumnsNavigationExtended &&
                        screenWidth < BreakpointUtil.sixColumnsNavigationExtended
                    ) {
                        this.enableFiveColumns = true;
                    } else {
                        this.enableSixColumns = true;
                    }
                    break;
                }
                case NavigationMode.COLLAPSED: {
                    if (screenWidth < BreakpointUtil.twoColumnsNavigationHidden) {
                        this.enableOneColumn = true;
                    } else if (
                        screenWidth >= BreakpointUtil.twoColumnsNavigationHidden &&
                        screenWidth < BreakpointUtil.threeColumnsNavigationCollapsed
                    ) {
                        this.enableTwoColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.threeColumnsNavigationCollapsed &&
                        screenWidth < BreakpointUtil.fourColumnsNavigationCollapsed
                    ) {
                        this.enableThreeColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.fourColumnsNavigationCollapsed &&
                        screenWidth < BreakpointUtil.fiveColumnsNavigationCollapsed
                    ) {
                        this.enableFourColumns = true;
                    } else if (
                        screenWidth >= BreakpointUtil.fiveColumnsNavigationCollapsed &&
                        screenWidth < BreakpointUtil.sixColumnsNavigationCollapsed
                    ) {
                        this.enableFiveColumns = true;
                    } else {
                        this.enableSixColumns = true;
                    }
                    break;
                }
                default: {
                    // HIDDEN
                    break;
                }
            }
        }

        onWindowResize() {
            this.setColumns();
        }

        mounted() {
            indexStore.loadVideos();
        }

        get getVideos() {
            return indexStore.videoPreviewList;
        }

        disableAllColumns() {
            this.enableOneColumn = false;
            this.enableTwoColumns = false;
            this.enableThreeColumns = false;
            this.enableFourColumns = false;
            this.enableFiveColumns = false;
            this.enableSixColumns = false;
        }

        created() {
            /* let screenWidth = window.innerWidth;

            if (screenWidth < BreakpointUtil.maxWidthNavigationCollapsed) {
                this.hasMaxWidthNormal = this.navigationMode == NavigationMode.EXTENDED;
            } */

            window.addEventListener("resize", this.debouncedOnWindowResize);

            this.setColumns();
        }

        destroyed() {
            window.removeEventListener("resize", this.debouncedOnWindowResize);
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
        /* twoColumnsNavigationHidden:grid-cols-2
        twoColumnsNavigationCollapsed:grid-cols-2
        threeColumnsNavigationCollapsed:grid-cols-3
        fourColumnsNavigationCollapsed:grid-cols-4
        fiveColumnsNavigationExtended:grid-cols-5
        sixColumnsNavigationExtended:grid-cols-6; */;
    }

    .oneColumn {
        @apply grid-cols-1;
    }

    .twoColumns {
        @apply grid-cols-2;
    }

    .threeColumns {
        @apply grid-cols-3;
    }

    .fourColumns {
        @apply grid-cols-4;
    }

    .fiveColumns {
        @apply grid-cols-5;
    }

    .sixColumns {
        @apply grid-cols-6;
    }

    .max-width-small {
        max-width: 656px;
    }

    .max-width-normal {
        max-width: 1490px;
    }

    .max-width-large {
        max-width: 2240px;
    }

    /* @media only screen and (max-width: 888px) {
        .grid-layout {
            @apply max-width-small;
        }
    }

    @media only screen and (min-width: 889px) {
        .grid-layout {
            @apply max-width-normal;
        }
    }

    @media only screen and (min-width: 2290px) {
        .grid-layout {
            @apply max-width-large;
        }
    } */
</style>
