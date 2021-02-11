<template>
    <div class="root">
        <div v-if="navigationMode == navigationModeExtended">
            <NavigationItem
                v-for="navigationModel in mainNavigation"
                :key="navigationModel.title"
                :title="navigationModel.title"
                :to="navigationModel.destination"
                :icon="navigationModel.icon"
                :iconSize="navigationModel.iconSize"
            />
            <Space height="4px" />
            <HorizontalLineSeparator />
            <NavigationItem
                v-for="navigationModel in historyNavigation"
                :key="navigationModel.title"
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
                v-for="navigationModel in categoriesNavigation"
                :key="navigationModel.title"
                :title="navigationModel.title"
                :to="navigationModel.destination"
                :iconImage="navigationModel.imageSrc"
            />
            <HorizontalLineSeparator />
            <NavigationItem title="Explorar canales" to="/feed/guide_builder" icon="add_circle" iconSize="24px" />
            <HorizontalLineSeparator />
            <NavigationItemTitle title="MÁS DE YOUTUBE" />
            <NavigationItem title="YouTube Premium" to="/premium">
                <template #icon>
                    <YoutubeIcon size="24px" color="var(--navigation-icon-color-unselected)" class="m-auto" />
                </template>
            </NavigationItem>
            <NavigationItem title="Directo" to="/channel/streaming" icon="sensors" iconSize="28px" />
            <HorizontalLineSeparator />
            <NavigationItem
                v-for="navigationModel in supportNavigation"
                :key="navigationModel.title"
                :title="navigationModel.title"
                :to="navigationModel.destination"
                :icon="navigationModel.icon"
                :iconSize="navigationModel.iconSize"
            />
            <NavigationItem
                v-for="navigationButtonModel in supportNavigationButtons"
                :key="navigationButtonModel.title"
                :title="navigationButtonModel.title"
                :icon="navigationButtonModel.icon"
                :iconSize="navigationButtonModel.iconSize"
                @onItemClicked="navigationButtonModel.clickMethod"
            />
            <HorizontalLineSeparator />
            <NavigationItemFooter />
        </div>

        <div v-else>
            <NavigationItemCollapsed
                v-for="navigationModel in mainNavigation"
                :key="navigationModel.title"
                :title="navigationModel.title"
                :to="navigationModel.destination"
                :icon="navigationModel.icon"
                :iconSize="navigationModel.iconSize"
            />
            <NavigationItemCollapsed
                v-for="navigationModel in historyNavigation"
                :key="navigationModel.title"
                :title="navigationModel.title"
                :to="navigationModel.destination"
                :icon="navigationModel.icon"
                :iconSize="navigationModel.iconSize"
            />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import NavigationItem from "./NavigationItem.vue";
    import NavigationItemCollapsed from "./NavigationItemCollapsed.vue";
    import NavigationItemLogin from "./NavigationItemLogin.vue";
    import NavigationItemTitle from "./NavigationItemTitle.vue";
    import NavigationItemFooter from "./NavigationItemFooter.vue";
    import { HorizontalLineSeparator, Space } from "@/components/decorators/module";
    import { NavigationItemModel, NavigationMode } from "./data/module";
    import { YoutubeIcon } from "@/components/drawables/module";

    @Component({
        components: {
            NavigationItem,
            NavigationItemCollapsed,
            NavigationItemLogin,
            NavigationItemTitle,
            NavigationItemFooter,
            HorizontalLineSeparator,
            Space,
            YoutubeIcon
        }
    })
    export default class Navigation extends Vue {
        readonly navigationModeExtended: NavigationMode = NavigationMode.EXTENDED;

        @Prop({ default: NavigationMode.EXTENDED })
        navigationMode!: NavigationMode;

        isUserLogged: boolean = true;

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

        supportNavigation: Array<NavigationItemModel> = [
            NavigationItemModel.withIcon("Configuración", "/settings", "settings", "24px"),
            NavigationItemModel.withIcon("Historial de denuncias", "/reporthistory", "flag", "24px")
        ];

        supportNavigationButtons: Array<NavigationItemModel> = [
            NavigationItemModel.withIconAndCallback("Ayuda", "help", "24px", this.onHelpClicked),
            NavigationItemModel.withIconAndCallback("Enviar sugerencias", "feedback", "24px", this.onSuggestionsClicked)
        ];

        onHelpClicked() {
            console.log("Show Help Dialog");
        }

        onSuggestionsClicked() {
            console.log("Show Suggestions Dialog");
        }
    }
</script>

<style lang="postcss" scoped>
    .root {
        width: var(--navigation-width);
        background: var(--navigation-color);
        @apply overflow-hidden;
    }

    .root:hover {
        @apply overflow-auto overflow-x-hidden;
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
