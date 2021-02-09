<template>
    <div class="root">
        <div class="grid-layout">
            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>

            <template v-for="image in dataSampleListIndex">
                <div :key="image">
                    <img :src="`/sample/video_images/${image}.webp`" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class Index extends Vue {
        dataSampleListIndex: Number[] = [1, 2, 3, 4, 5, 6, 7];
    }
</script>

<style scoped lang="postcss">
    .root {
        @apply flex justify-center;
        margin-top: 25px;
        margin-left: 24px;
        margin-right: 24px;
    }

    .grid-layout {
        @apply grid grid-cols-1 gap-4 maxWidth
        twoColumnsNavigationHidden:grid-cols-2
        twoColumnsNavigationCollapsed:grid-cols-2
        threeColumnsNavigationCollapsed:grid-cols-3
        fourColumnsNavigationCollapsed:grid-cols-4
        fiveColumnsNavigationExtended:grid-cols-5
        sixColumnsNavigationExtended:grid-cols-6;
    }

    .maxWidth {
        max-width: 1490px;
    }

    @media only screen and (min-width: 2290px) {
        .maxWidth {
            max-width: 2240px;
        }
    }
</style>
