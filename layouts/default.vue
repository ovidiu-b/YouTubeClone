<template>
    <!-- <div>
        <header>
            <Toolbar class="fixed" />
        </header>

        <div class="flex" style="padding-top: var(--toolbar-height)">
            <nav>
                <Navigation class="fixed-content" style="padding-top: calc(var(--toolbar-height) + 13px)" />
            </nav>

            <main class="flex-grow" style="padding-left: var(--navigation-width)">
                <Nuxt />
            </main>
        </div>
    </div> -->

    <div class="flex">
        <Toolbar style="z-index: 99" class="fixed" />

        <Navigation class="fixed" style="padding-top: calc(var(--toolbar-height) + 13px)" />

        <Nuxt class="flex-grow: 1;" style="margin-left: var(--navigation-width); padding-top: var(--toolbar-height)" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { Navigation, Toolbar } from "../components/app/module";

    @Component({
        components: {
            Navigation,
            Toolbar
        }
    })
    export default class App extends Vue {}
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

    .sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }

    .fixed-content {
        top: 0;
        bottom: 0;
        position: fixed;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
