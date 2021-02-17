<template>
    <div class="index">
        <div
            class="grid-layout"
            :class="{
                oneColumn: enableOneColumn,
                twoColumns: enableTwoColumns,
                threeColumns: enableThreeColumns,
                fourColumns: enableFourColumns,
                fiveColumns: enableFiveColumns,
                sixColumns: enableSixColumns
            }"
        >
            <template v-for="video in getVideos">
                <VideoPreviewItem :width="columnWidth" :key="video.id" :videoPreviewBO="video" />
            </template>
        </div>
    </div>
</template>

<script scoped lang="ts">
    import { Component, Vue, InjectReactive, Watch } from "nuxt-property-decorator";
    import { VideoPreviewItem } from "@/modules/pages/index/module";
    import { NavigationMode } from "@/modules/app/module";
    import { BreakpointUtil, CSSVarUtil } from "@/utils/module";
    import { indexStore } from "@/store";
    import { debounce } from "debounce";

    @Component({
        components: {
            VideoPreviewItem
        }
    })
    export default class Index extends Vue {
        columnWidth: string = "400px";

        enableOneColumn: boolean = false;
        enableTwoColumns: boolean = false;
        enableThreeColumns: boolean = false;
        enableFourColumns: boolean = false;
        enableFiveColumns: boolean = false;
        enableSixColumns: boolean = false;

        @InjectReactive("navigationMode")
        navigationMode!: NavigationMode;

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        created() {
            window.addEventListener("resize", this.debouncedOnWindowResize);

            this.setColumns();
        }

        @Watch("navigationMode")
        onNavigationModeChange() {
            this.setColumns();
        }

        onWindowResize() {
            this.setColumns();
        }

        setColumns() {
            this.disableAllColumns();

            let screenWidth = window.innerWidth;

            if (screenWidth < BreakpointUtil.twoColumnsNavigationHidden) {
                this.enableOneColumn = true;
            } else if (
                screenWidth >= BreakpointUtil.twoColumnsNavigationHidden &&
                screenWidth < BreakpointUtil.threeColumnsNavigationCollapsed
            ) {
                this.enableTwoColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth2Columns();
            } else if (
                screenWidth >= BreakpointUtil.threeColumnsNavigationCollapsed &&
                screenWidth < BreakpointUtil.fourColumnsNavigationCollapsed
            ) {
                this.enableThreeColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth3Columns();
            } else if (
                screenWidth >= BreakpointUtil.fourColumnsNavigationCollapsed &&
                screenWidth < BreakpointUtil.fiveColumnsNavigationExtended &&
                this.navigationMode == NavigationMode.EXTENDED
            ) {
                this.enableFourColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth456Columns();
            } else if (
                screenWidth >= BreakpointUtil.fourColumnsNavigationCollapsed &&
                screenWidth < BreakpointUtil.fiveColumnsNavigationCollapsed &&
                this.navigationMode == NavigationMode.COLLAPSED
            ) {
                this.enableFourColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth456Columns();
            } else if (
                screenWidth >= BreakpointUtil.fiveColumnsNavigationExtended &&
                screenWidth < BreakpointUtil.sixColumnsNavigationExtended &&
                this.navigationMode == NavigationMode.EXTENDED
            ) {
                this.enableFiveColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth456Columns();
            } else if (
                screenWidth >= BreakpointUtil.fiveColumnsNavigationCollapsed &&
                screenWidth < BreakpointUtil.sixColumnsNavigationCollapsed &&
                this.navigationMode == NavigationMode.COLLAPSED
            ) {
                this.enableFiveColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth456Columns();
            } else {
                this.enableSixColumns = true;
                this.columnWidth = CSSVarUtil.getIndexColumnMaxWidth456Columns();
            }
        }

        disableAllColumns() {
            this.enableOneColumn = false;
            this.enableTwoColumns = false;
            this.enableThreeColumns = false;
            this.enableFourColumns = false;
            this.enableFiveColumns = false;
            this.enableSixColumns = false;
        }

        mounted() {
            indexStore.loadVideos();
        }

        get getVideos() {
            return indexStore.videoPreviewList;
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
        @apply grid gap-4;
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
</style>
