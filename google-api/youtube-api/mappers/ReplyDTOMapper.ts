import { ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default class ReplyDTOMapper {
    private constructor() {}

    static toDto(reply: any): ReplyThreadDTO {
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
