import { CommentBO } from "./module";

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
        totalReplyCount: Number
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
    }

    readonly totalReplyCount: Number;
}
