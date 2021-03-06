<template>
    <div class="comment-item">
        <CircularImage :src="comment.authorProfileImageUrl" width="40px" height="40px" />

        <div class="content">
            <div class="flex items-center">
                <span class="author-name">{{ comment.authorDisplayName }}</span>

                <span v-if="isCommentEdited" class="published-edited-comment-time">{{ comment.updatedAt | formatTimeElapsed }} </span>

                <span v-else class="published-edited-comment-time">{{ comment.publishedAt | formatTimeElapsed }}</span>

                <span v-if="isCommentEdited" class="published-edited-comment-time">(editado)</span>
            </div>

            <div class="comment-text" :style="{ maxHeight: commentHeight }" v-html="textHtml"></div>

            <span
                v-if="commentLines > 4"
                @click="showFullComment = !showFullComment"
                class="font-medium text-sm hover:underline cursor-pointer select-none"
                style="color: var(--text-color-gray)"
            >
                {{ showMoreOrLessButtonText }}
            </span>

            <div class="interaction-comment-actions">
                <IconButton name="thumb_up" size="16px" color="var(--text-color-gray-light)" />

                <span class="like-count">{{ comment.likeCount }}</span>

                <IconButton name="thumb_down" size="16px" color="var(--text-color-gray-light)" class="ml-2" />

                <button class="response-button">RESPONDER</button>
            </div>

            <div v-if="thereAreReplies" class="mt-2">
                <button @click="showAllReplies = !showAllReplies" class="focus:outline-none flex items-center -ml-1.5">
                    <Icon :name="iconNameSeeReplies" color="var(--text-color-blue)" size="20px" />

                    <span class="text-sm font-medium ml-1.5" style="color: var(--text-color-blue)">{{ seeAllRepliesText }}</span>
                </button>
            </div>

            <div v-if="thereAreReplies && showAllReplies">
                <template v-for="reply in comment.replies">
                    <ReplyItem :key="reply.id" :reply="reply" />
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
    import { CommentThreadBO } from "@/model/module";
    import { CircularImage, Icon } from "@/components/drawables/module";
    import { IconButton } from "@/components/buttons/module";

    /* Why ReplyItem is imported that way?
        See: 
            https://stackoverflow.com/questions/49154490/did-you-register-the-component-correctly-for-recursive-components-make-sure-to
        and  
            https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
    */

    @Component({ components: { CircularImage, IconButton, Icon, ReplyItem: () => import("./ReplyItem") } })
    export default class CommentItem extends Vue {
        @Prop()
        readonly comment!: CommentThreadBO;

        showFullComment: boolean = false;
        showMoreOrLessButtonText: string = "Leer más";
        commentHeight: string = "80px";
        commentLines: Number = (this.comment.textDisplay.match(/<br \/>/g) || []).length;

        textHtml: string = this.comment.textDisplay;

        isCommentEdited: boolean = this.comment.publishedAt != this.comment.updatedAt;

        readonly iconNameListSeeReplies: string[] = ["arrow_drop_down", "arrow_drop_up"];
        iconNameSeeReplies: string = this.iconNameListSeeReplies[0];
        readonly thereAreReplies: boolean = this.comment.totalReplyCount > 0;
        showAllReplies: boolean = false;
        seeAllRepliesText: string = "";

        @Watch("showFullComment")
        watchShowFullComment(newValue: boolean) {
            if (newValue) {
                this.showMoreOrLessButtonText = "Leer menos";
                this.commentHeight = "100%";
            } else {
                this.showMoreOrLessButtonText = "Leer más";
                this.commentHeight = "80px";
            }
        }

        @Watch("showAllReplies")
        watchShowAllReplies(newValue: boolean) {
            if (newValue) {
                this.iconNameSeeReplies = this.iconNameListSeeReplies[1];
                this.setSeeAllRepliesText();
            } else {
                this.iconNameSeeReplies = this.iconNameListSeeReplies[0];
                this.setSeeAllRepliesText();
            }
        }

        setSeeAllRepliesText() {
            if (this.thereAreReplies) {
                if (this.showAllReplies) {
                    if (this.comment.totalReplyCount > 1) {
                        this.seeAllRepliesText = `Ocultar ${this.comment.totalReplyCount} respuestas`;
                    } else {
                        this.seeAllRepliesText = `Ocultar respuesta`;
                    }
                } else {
                    if (this.comment.totalReplyCount > 1) {
                        this.seeAllRepliesText = `Ver ${this.comment.totalReplyCount} respuestas`;
                    } else {
                        this.seeAllRepliesText = `Ver respuesta`;
                    }
                }
            }
        }

        created() {
            this.setSeeAllRepliesText();
        }
    }
</script>

<style scoped lang="postcss">
    @import "./styles.css";

    .comment-item {
        /* We need to set items-start to disable the stretch because this affects circular image height */
        @apply flex items-start mb-7;
    }
</style>
