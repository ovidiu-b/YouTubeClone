<template>
    <div>
        <header>
            <Toolbar class="fixed" style="z-index: 99" @onMenuClicked="toggleNavigationDrawer" />
        </header>

        <nav class="h-full fixed flex flex-col">
            <div style="margin-top: var(--toolbar-height)"></div>

            <Navigation :navigationMode="navigationMode" class="flex-grow" style="padding-top: var(--navigation-padding-top)" />
        </nav>

        <main style="padding-top: var(--toolbar-height); padding-left: var(--navigation-width)">
            <Nuxt />
        </main>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, ProvideReactive } from "nuxt-property-decorator";
    import { Navigation, Toolbar, NavigationMode } from "@/modules/app/module";
    import { BreakpointUtil, CSSVarUtil } from "@/utils/module";
    import { debounce } from "debounce";

    @Component({
        components: {
            Navigation,
            Toolbar
        }
    })
    export default class App extends Vue {
        navigationMode: NavigationMode = NavigationMode.EXTENDED;
        navigationCollapsedByUser: boolean = false;

        readonly debouncedOnWindowResize: any = debounce(this.onWindowResize, 1);

        @ProvideReactive("navigationMode")
        navigationModeReactive = this.navigationMode;

        created() {
            window.addEventListener("resize", this.debouncedOnWindowResize);

            this.onWindowResize();
        }

        onWindowResize() {
            let screenWidth = window.innerWidth;

            if (!this.navigationCollapsedByUser) {
                if (
                    screenWidth < BreakpointUtil.fourColumnsNavigationExtended &&
                    screenWidth >= BreakpointUtil.twoColumnsNavigationCollapsed
                ) {
                    this.collapseNavigationDrawer();
                } else {
                    this.extendNavigationDrawer();
                }
            } else {
                if (screenWidth >= BreakpointUtil.twoColumnsNavigationCollapsed) {
                    this.collapseNavigationDrawer();
                }
            }

            if (screenWidth < BreakpointUtil.twoColumnsNavigationCollapsed) {
                this.hideNavigationDrawer();
            }
        }

        toggleNavigationDrawer() {
            if (this.navigationMode == NavigationMode.EXTENDED) {
                this.collapseNavigationDrawer();
                this.navigationCollapsedByUser = true;
            } else {
                this.extendNavigationDrawer();
                this.navigationCollapsedByUser = false;
            }
        }

        collapseNavigationDrawer() {
            CSSVarUtil.setNavigationWidth(CSSVarUtil.getNavigationWidthCollapsed());
            CSSVarUtil.setNavigationPaddingTop(CSSVarUtil.getNavigationPaddingTopCollapsed());

            this.navigationMode = NavigationMode.COLLAPSED;
            this.navigationModeReactive = NavigationMode.COLLAPSED;
        }

        extendNavigationDrawer() {
            CSSVarUtil.setNavigationWidth(CSSVarUtil.getNavigationWidthExtended());
            CSSVarUtil.setNavigationPaddingTop(CSSVarUtil.getNavigationPaddingTopExtended());

            this.navigationMode = NavigationMode.EXTENDED;
            this.navigationModeReactive = NavigationMode.EXTENDED;
        }

        hideNavigationDrawer() {
            CSSVarUtil.setNavigationWidth("0px");
            CSSVarUtil.setNavigationPaddingTop("0px");

            this.navigationMode = NavigationMode.HIDDEN;
            this.navigationModeReactive = NavigationMode.HIDDEN;
        }

        destroyed() {
            window.removeEventListener("resize", this.debouncedOnWindowResize);
        }
    }
</script>

<style lang="postcss">
    html {
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        background: var(--content-color);
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
    }
</style>
