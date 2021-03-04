import { CommentThreadDTO, ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";
import { CommentThreadBO, ReplyThreadBO } from "@/model/module";

export default class CommentBOMapper {
    static dtoToBo(dto: CommentThreadDTO): CommentThreadBO {
        const replies = dto.replies.map((reply) => CommentBOMapper.replyDtoToBo(reply));

        return new CommentThreadBO(
            dto.id,
            dto.textDisplay,
            dto.authorProfileImageUrl,
            dto.authorDisplayName,
            dto.authorChannelUrl,
            dto.authorChannelId,
            dto.likeCount,
            dto.publishedAt,
            dto.updatedAt,
            dto.totalReplyCount,
            replies
        );
    }

    private static replyDtoToBo(dto: ReplyThreadDTO): ReplyThreadBO {
        return new ReplyThreadBO(
            dto.id,
            dto.textDisplay,
            dto.authorProfileImageUrl,
            dto.authorDisplayName,
            dto.authorChannelUrl,
            dto.authorChannelId,
            dto.likeCount,
            dto.publishedAt,
            dto.updatedAt,
            dto.parentId
        );
    }
}
