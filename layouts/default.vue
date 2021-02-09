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
    import { Component, Vue } from "nuxt-property-decorator";
    import { Navigation, Toolbar, NavigationMode } from "../components/app/module";
    import { BreakpointUtil } from "@/utils/module";
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

        created() {
            if (process.browser) {
                window.addEventListener("resize", this.debouncedOnWindowResize);

                this.onWindowResize();
            }
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
            let root = document.documentElement;
            let computedRootStyle = getComputedStyle(root);
            let collapsedWidth = computedRootStyle.getPropertyValue("--navigation-width-collapsed");
            let collapsedPaddingTop = computedRootStyle.getPropertyValue("--navigation-padding-top-collapsed");

            root.style.setProperty("--navigation-width", collapsedWidth);
            root.style.setProperty("--navigation-padding-top", collapsedPaddingTop);

            this.navigationMode = NavigationMode.COLLAPSED;
        }

        extendNavigationDrawer() {
            let root = document.documentElement;
            let computedRootStyle = getComputedStyle(root);
            let extendedWidth = computedRootStyle.getPropertyValue("--navigation-width-extended");
            let extendedPaddingTop = computedRootStyle.getPropertyValue("--navigation-padding-top-extended");

            root.style.setProperty("--navigation-width", extendedWidth);
            root.style.setProperty("--navigation-padding-top", extendedPaddingTop);

            this.navigationMode = NavigationMode.EXTENDED;
        }

        hideNavigationDrawer() {
            let root = document.documentElement;

            root.style.setProperty("--navigation-width", "0px");
            root.style.setProperty("--navigation-padding-top", "0xp");

            this.navigationMode = NavigationMode.HIDDEN;
        }

        destroyed() {
            if (process.browser) {
                window.removeEventListener("resize", this.debouncedOnWindowResize);
            }
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
