import { CommentBO } from "./module";

export default class ReplyThreadBO extends CommentBO {
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
        parentId: string
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
        this.parentId = parentId;
    }

    readonly parentId: string;
}
