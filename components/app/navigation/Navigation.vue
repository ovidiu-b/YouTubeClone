<template>
    <div class="root">
        <NavigationItem
            v-for="(navigationModel, index) in mainNavigation"
            :key="index"
            :title="navigationModel.title"
            :to="navigationModel.destination"
            :icon="navigationModel.icon"
            :iconSize="navigationModel.iconSize"
        />

        <Space height="4px" />

        <HorizontalLineSeparator />

        <NavigationItem
            v-for="(navigationModel, index) in historyNavigation"
            :key="index"
            :title="navigationModel.title"
            :to="navigationModel.destination"
            :icon="navigationModel.icon"
            :iconSize="navigationModel.iconSize"
        />

        <HorizontalLineSeparator />

        <NavigationItemLogin v-if="isUserLogged" />

        <HorizontalLineSeparator />

        <NavigationItemTitle title="LO MEJOR DE YOUTUBE" />

        <NavigationItem
            v-for="(navigationModel, index) in categoriesNavigation"
            :key="index"
            :title="navigationModel.title"
            :to="navigationModel.destination"
            :iconImage="navigationModel.imageSrc"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import NavigationItem from "./NavigationItem.vue";
    import NavigationItemLogin from "./NavigationItemLogin.vue";
    import NavigationItemTitle from "./NavigationItemTitle.vue";
    import { HorizontalLineSeparator, Space } from "../../decorators/module";
    import NavigationItemModel from "./model/NavigationItemModel";

    @Component({
        components: {
            NavigationItem,
            NavigationItemLogin,
            NavigationItemTitle,
            HorizontalLineSeparator,
            Space
        }
    })
    export default class Navigation extends Vue {
        @Prop({ default: true })
        isUserLogged!: boolean;

        mainNavigation: Array<NavigationItemModel> = [
            NavigationItemModel.withIcon("Inicio", "/", "home", "24px"),
            NavigationItemModel.withIcon("Tendencias", "/feed/trending", "local_fire_department", "21px"),
            NavigationItemModel.withIcon("Suscripciones", "/feed/subscriptions", "subscriptions", "20px")
        ];

        historyNavigation: Array<NavigationItemModel> = [
            NavigationItemModel.withIcon("Biblioteca", "/feed/library", "video_library", "24px"),
            NavigationItemModel.withIcon("Historial", "/feed/history", "history", "22px")
        ];

        categoriesNavigation: Array<NavigationItemModel> = [
            NavigationItemModel.withImage("Música", "/channel/music", "/icons/ic_category_music.jpg"),
            NavigationItemModel.withImage("Deportes", "/channel/sports", "/icons/ic_category_sports.jpg"),
            NavigationItemModel.withImage("Videojuegos", "/channel/games", "/icons/ic_category_games.jpg"),
            NavigationItemModel.withImage("Películas", "/channel/films", "/icons/ic_category_films.jpg"),
            NavigationItemModel.withImage("Noticias", "/channel/news", "/icons/ic_category_news.jpg"),
            NavigationItemModel.withImage("Directo", "/channel/streaming", "/icons/ic_category_streaming.jpg"),
            NavigationItemModel.withImage("Aprendizaje", "/channel/learning", "/icons/ic_category_learning.jpg"),
            NavigationItemModel.withImage("Video 360º", "/channel/video360", "/icons/ic_category_video_360.jpg")
        ];
    }
</script>

<style scoped lang="postcss">
    .root {
        width: var(--navigation-width);
        @apply h-full overflow-hidden;
        background: var(--navigation-color);
    }

    .root:hover {
        @apply overflow-auto;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: var(--navigation-color);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--navigation-scrollbar-color);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: var(--navigation-scrollbar-color);
    }
</style>
