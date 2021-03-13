<template>
    <div class="circular-loading">
        <div class="loading">
            <div></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";

    @Component
    export default class CircularLoading extends Vue {}
</script>

<style scoped lang="postcss">
    .circular-loading {
        @apply inline-block overflow-hidden;
        width: 35px;
        height: 35px;
        background: none;
    }
    .loading {
        @apply w-full h-full relative;
        transform: translateZ(0) scale(0.35);
        backface-visibility: hidden;
        transform-origin: 0 0;
    }
    .loading div {
        @apply absolute box-content;
        width: 60px;
        height: 60px;
        border: 9px solid #9b9a9a;
        border-top-color: transparent;
        border-radius: 50%;
        animation: loading 0.58s linear infinite;
        top: 50px;
        left: 50px;
    }

    @keyframes loading {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
</style>
