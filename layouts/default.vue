<template>
    <div>
        <header>
            <Toolbar class="fixed bg-white" />
        </header>

        <div class="flex" style="padding-top: 55px">
            <nav>
                <Navigation class="fixed" />
            </nav>

            <main class="flex-grow" style="padding-left: 230px; background: blue; height: 2000px">
                <Nuxt />
            </main>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { Navigation, Toolbar } from "../components/common/module";

    @Component({
        components: {
            Navigation,
            Toolbar
        }
    })
    export default class App extends Vue {}
</script>

<style>
  html {
    font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
</style>
