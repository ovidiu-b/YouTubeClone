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

    @Component({
        components: {
            Navigation,
            Toolbar
        }
    })
    export default class App extends Vue {
        navigationMode: NavigationMode = NavigationMode.EXTENDED;

        toggleNavigationDrawer() {
            if (this.navigationMode == NavigationMode.EXTENDED) {
                this.closeNavigationDrawer();
                this.navigationMode = NavigationMode.COLLAPSED;
            } else {
                this.openNavigationDrawer();
                this.navigationMode = NavigationMode.EXTENDED;
            }
        }

        closeNavigationDrawer() {
            let root = document.documentElement;
            let computedRootStyle = getComputedStyle(root);
            let collapsedWidth = computedRootStyle.getPropertyValue("--navigation-width-collapsed");
            let collapsedPaddingTop = computedRootStyle.getPropertyValue("--navigation-padding-top-collapsed");

            root.style.setProperty("--navigation-width", collapsedWidth);
            root.style.setProperty("--navigation-padding-top", collapsedPaddingTop);
        }

        openNavigationDrawer() {
            let root = document.documentElement;
            let computedRootStyle = getComputedStyle(root);
            let extendedWidth = computedRootStyle.getPropertyValue("--navigation-width-extended");
            let extendedPaddingTop = computedRootStyle.getPropertyValue("--navigation-padding-top-extended");

            root.style.setProperty("--navigation-width", extendedWidth);
            root.style.setProperty("--navigation-padding-top", extendedPaddingTop);
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
