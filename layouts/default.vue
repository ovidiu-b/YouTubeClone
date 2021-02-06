<template>
    <div>
        <header>
            <Toolbar class="fixed" style="z-index: 99" />
        </header>

        <nav class="h-full fixed flex flex-col">
            <div style="margin-top: var(--toolbar-height)"></div>

            <Navigation class="flex-grow" style="padding-top: 13px" />
        </nav>

        <main style="padding-top: var(--toolbar-height); padding-left: var(--navigation-width)">
            <Nuxt />
        </main>
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
</style>
