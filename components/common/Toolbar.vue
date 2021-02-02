<template>
    <div class="root">
        <div class="logo">
            <IconButton name="menu" class="mx-6" />
            <YoutubeLogo />
            <span style="color: #606060; font-size: 10px" class="ml-px mb-3 font-normal">ES</span>
        </div>

        <div class="search">
            <div class="search-input">Search</div>
            <IconButton name="mic" />
        </div>

        <div class="end_options">
            <IconButton name="apps" class="mr-6" />
            <IconButton name="more_vert" class="mr-4" />
            <LoginButton class="mr-4" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { YoutubeLogo, Icon } from "../drawables/module";
    import { IconButton, LoginButton } from "../buttons/module";

    @Component({
        components: {
            YoutubeLogo,
            IconButton,
            Icon,
            LoginButton
        }
    })
    export default class Toolbar extends Vue {}
</script>

<style scoped lang="postcss">
    .root {
        height: 55px;

        @apply w-full flex place-content-between;
    }

    .logo {
        @apply flex place-items-center;
    }

    .search {
        @apply flex place-items-center w-4/12;
    }

    .search-input {
        @apply bg-gray-300 w-full;
    }

    .end_options {
        @apply flex place-items-center;
    }
</style>
