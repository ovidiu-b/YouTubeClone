import { CommentThreadDTO } from "@/google-api/youtube-api/types/dtos/module";
import { CommentThreadBO } from "@/model/module";

export default class CommentBOMapper {
    static dtoToBo(dto: CommentThreadDTO): CommentThreadBO {
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
            Number(dto.totalReplyCount)
        );
    }
}
