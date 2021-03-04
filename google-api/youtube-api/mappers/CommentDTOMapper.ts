import { CommentThreadDTO, ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default class CommentDTOMapper {
    private constructor() {}

    static toCommentThreadDTO(comment: any, replies: ReplyThreadDTO[]): CommentThreadDTO {
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
            totalReplyCount: comment.snippet.totalReplyCount,
            replies: replies
        };
    }

    static toReplyThreadDTO(reply: any): ReplyThreadDTO {
        return {
            id: reply.id,
            textDisplay: reply.snippet.textDisplay,
            parentId: reply.snippet.parentId,
            authorDisplayName: reply.snippet.authorDisplayName,
            authorProfileImageUrl: reply.snippet.authorProfileImageUrl,
            authorChannelUrl: reply.snippet.authorChannelUrl,
            authorChannelId: reply.snippet.authorChannelId.value,
            likeCount: reply.snippet.likeCount,
            publishedAt: reply.snippet.publishedAt,
            updatedAt: reply.snippet.updatedAt
        };
    }
}
