import { CommentBO, ReplyThreadBO } from "./module";

export default class CommentThreadBO extends CommentBO {
    constructor(
        id: string,
        textDisplay: string,
        authorProfileImageUrl: string,
        authorDisplayName: string,
        authorChannelUrl: string,
        authorChannelId: string,
        likeCount: string,
        publishedAt: string,
        updatedAt: string,
        totalReplyCount: Number,
        replies: ReplyThreadBO[]
    ) {
        super(
            id,
            textDisplay,
            authorProfileImageUrl,
            authorDisplayName,
            authorChannelUrl,
            authorChannelId,
            likeCount,
            publishedAt,
            updatedAt
        );
        this.totalReplyCount = totalReplyCount;
        this.replies = replies;
    }

    readonly totalReplyCount: Number;
    readonly replies: ReplyThreadBO[];
}
