export default class CommentBO {
    protected constructor(
        id: string,
        textDisplay: string,
        authorProfileImageUrl: string,
        authorDisplayName: string,
        authorChannelUrl: string,
        authorChannelId: string,
        likeCount: string,
        publishedAt: string,
        updatedAt: string
    ) {
        this.id = id;
        this.textDisplay = textDisplay;
        this.authorProfileImageUrl = authorProfileImageUrl;
        this.authorDisplayName = authorDisplayName;
        this.authorChannelUrl = authorChannelUrl;
        this.authorChannelId = authorChannelId;
        this.likeCount = likeCount;
        this.publishedAt = publishedAt;
        this.updatedAt = updatedAt;
    }

    readonly id: string;
    readonly textDisplay: string;
    readonly authorProfileImageUrl: string;
    readonly authorDisplayName: string;
    readonly authorChannelUrl: string;
    readonly authorChannelId: string;
    readonly likeCount: string;
    readonly publishedAt: string;
    readonly updatedAt: string;
}
