<template>
    <div class="root">
        <template v-for="(lines, index) in linesTags">
            <Space v-if="lines[0] == ''" :key="index" height="10px" />

            <p v-else class="line" :key="index">
                <span class="tag" v-for="(tag, index) in lines" :key="index">
                    {{ tag }}
                </span>
            </p>
        </template>

        <Space height="15px" />

        <p class="copyright">
            <span>&copy;</span> <span>{{ getCurrentYear() }}</span>
            <span>Google LLC YouTube, una empresa de Google</span>
        </p>

        <Space height="15px" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Emit } from "nuxt-property-decorator";
    import { Space } from "@/components/decorators/module";

    @Component({
        components: {
            Space
        }
    })
    export default class NavigationItemFooter extends Vue {
        linesTags: string[][] = [
            ["Información", "Prensa"],
            ["Derechos de autor", "Contactar"],
            ["Creadores", "Publicidad"],
            ["Desarrolladores"],
            [""],
            ["Términos", "Privacidad"],
            ["Política y seguridad"],
            ["Cómo funciona YouTube"],
            ["Probar funciones nuevas"]
        ];

        getCurrentYear(): number {
            return new Date().getFullYear();
        }

        @Emit()
        onItemClicked() {}
    }
</script>

<style scoped lang="postcss">
    .root {
        @apply w-full ml-6 mt-4 pr-16;
    }

    .line {
        @apply leading-4;
        word-spacing: 3px;
    }

    .tag {
        @apply font-medium;
        font-size: 0.8rem;
        color: var(--text-color-gray);
    }

    .tag:hover {
        cursor: pointer;
    }

    .copyright {
        font-size: 0.79rem;
        color: var(--text-color-gray-light);
    }
</style>
