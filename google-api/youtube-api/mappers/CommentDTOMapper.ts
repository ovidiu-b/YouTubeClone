import { CommentThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default class CommentDTOMapper {
    private constructor() {}

    static toDto(comment: any): CommentThreadDTO {
        return {
            id: comment.id,
            textDisplay: comment.snippet.topLevelComment.snippet.textDisplay,
            authorProfileImageUrl: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
            authorDisplayName: comment.snippet.topLevelComment.snippet.authorDisplayName,
            authorChannelUrl: comment.snippet.topLevelComment.snippet.authorChannelUrl,
            authorChannelId: comment.snippet.topLevelComment.snippet.authorChannelId.value,
            likeCount: comment.snippet.topLevelComment.snippet.likeCount,
            publishedAt: comment.snippet.topLevelComment.snippet.publishedAt,
            updatedAt: comment.snippet.topLevelComment.snippet.updatedAt,
            totalReplyCount: comment.snippet.totalReplyCount
        };
    }
}
