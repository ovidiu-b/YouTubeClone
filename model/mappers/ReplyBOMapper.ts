import { ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";
import { ReplyThreadBO } from "@/model/module";

export default class ReplyBOMapper {
    static dtoToBo(dto: ReplyThreadDTO): ReplyThreadBO {
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
