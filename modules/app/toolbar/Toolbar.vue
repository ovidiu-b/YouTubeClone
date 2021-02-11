<template>
    <div class="root">
        <div class="logo">
            <IconButton @onButtonClicked="onMenuClicked" name="menu" class="mx-6 toolbarHideSearch:ml-4 toolbarHideSearch:mr-3" />
            <YoutubeLogo />
            <span class="country-tag">ES</span>
        </div>

        <div class="search-layout">
            <div class="search-container">
                <div class="search-input-container">
                    <input class="search-input" type="text" placeholder="Buscar" />

                    <button class="search-button">
                        <Icon name="search" size="20px" color="#999a9b" />
                    </button>
                </div>

                <IconButton class="ml-3" name="mic" />
            </div>

            <div class="hidden toolbarHideSearch:flex flex-grow justify-end">
                <IconButton name="mic" class="mr-4" />
                <IconButton name="search" />
            </div>
        </div>

        <div class="end-options">
            <IconButton name="apps" class="mr-6 toolbarHideSearch:mr-4" />
            <IconButton name="more_vert" class="mr-4 toolbarHideSearch:mr-2" />
            <LoginButton class="mr-4 toolbarHideSearch:mr-2" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Emit } from "nuxt-property-decorator";
    import { YoutubeLogo, Icon } from "@/components/drawables/module";
    import { IconButton, LoginButton } from "@/components/buttons/module";

    @Component({
        components: {
            YoutubeLogo,
            IconButton,
            Icon,
            LoginButton
        }
    })
    export default class Toolbar extends Vue {
        @Emit("onMenuClicked")
        onMenuClicked() {}
    }
</script>

<style scoped lang="postcss">
    .root {
        height: var(--toolbar-height);

        @apply w-full flex items-center;

        background: var(--toolbar-color);
    }

    .logo {
        @apply flex;
    }

    .search-layout {
        @apply flex flex-grow ml-20 mr-4;
    }

    .search-container {
        @apply flex m-auto toolbarHideSearch:hidden;
    }

    .search-input-container {
        @apply flex w-full h-8;
    }

    .search-input {
        @apply w-full h-full shadow-inner border border-gray-300 focus:outline-none focus:border-blue-800 pl-3 -mr-1;
        z-index: 10;
    }

    .search-button {
        @apply flex flex-none justify-center items-center border border-gray-300 focus:outline-none;
        background: #f8f8f8;
        width: 68px;
    }

    .search-button:hover {
        background: #f0f0f0;
    }

    .end-options {
        @apply flex flex-none;
    }

    .country-tag {
        @apply ml-px mb-3 font-normal;
        color: #606060;
        font-size: 10px;
    }

    @media only screen and (max-width: 875px) {
        .search-layout {
            @apply ml-11 toolbarHideSearch:ml-10;
        }
    }

    @media only screen and (min-width: 1200px) {
        .search-container {
            min-width: 677px;
        }
    }

    @media only screen and (max-width: 1200px) {
        .search-container {
            width: 100%;
        }
    }
</style>
