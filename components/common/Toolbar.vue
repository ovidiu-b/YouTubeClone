<template>
    <div class="root">
        <div class="logo">
            <IconButton name="menu" class="mx-6" />
            <YoutubeLogo />
            <span class="country-tag">ES</span>
        </div>

        <div class="search">
            <div class="search-input-container">
                <input class="search-input" type="text" placeholder="Search" />

                <button class="search-button">
                    <Icon name="search" size="21px" color="#999a9b" class="place-self-center" />
                </button>
            </div>

            <IconButton class="ml-3" name="mic" />
        </div>

        <div class="end-options">
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
        @apply flex place-items-center ml-14;
        width: 35%;
    }

    .search-input-container {
        @apply flex w-full h-8;
    }

    .search-input {
        @apply w-full h-full shadow-inner border border-gray-300 focus:outline-none focus:border-blue-800 pl-3 -mr-1;
        z-index: 10;
    }

    .search-button {
        @apply flex bg-gray-100 px-6 border border-gray-300 focus:outline-none;
    }

    .end-options {
        @apply flex place-items-center;
    }

    .country-tag {
        @apply ml-px mb-3 font-normal;
        color: #606060;
        font-size: 10px;
    }
</style>
