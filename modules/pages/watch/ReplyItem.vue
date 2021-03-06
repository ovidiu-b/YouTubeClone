<template>
    <div class="reply-item">
        <CircularImage :src="reply.authorProfileImageUrl" width="23px" height="23x" />

        <div class="content">
            <div class="flex items-center">
                <span class="author-name">{{ reply.authorDisplayName }}</span>

                <span v-if="isReplyEdited" class="published-edited-comment-time">{{ reply.updatedAt | formatTimeElapsed }} </span>

                <span v-else class="published-edited-comment-time">{{ reply.publishedAt | formatTimeElapsed }}</span>

                <span v-if="isReplyEdited" class="published-edited-comment-time">(editado)</span>
            </div>

            <div class="comment-text" style="max-width: 100%" v-html="textHtml"></div>

            <div class="interaction-comment-actions">
                <IconButton name="thumb_up" size="16px" color="var(--text-color-gray-light)" />

                <span class="like-count">{{ reply.likeCount }}</span>

                <IconButton name="thumb_down" size="16px" color="var(--text-color-gray-light)" class="ml-2" />

                <button class="response-button">RESPONDER</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "nuxt-property-decorator";
    import { ReplyThreadBO } from "@/model/module";

    @Component
    export default class ReplyItem extends Vue {
        @Prop()
        reply!: ReplyThreadBO;

        isReplyEdited: boolean = this.reply.publishedAt != this.reply.updatedAt;

        textHtml: string = this.reply.textDisplay;
    }
</script>

<style scoped lang="postcss">
    @import "./styles.css";

    .reply-item {
        @apply flex items-start mt-4;
    }
</style>
