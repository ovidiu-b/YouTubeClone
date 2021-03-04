import { VideoDTO, ChannelDTO } from "@/google-api/youtube-api/types/dtos/module";
import { VideoBO } from "@/model/module";
import { ChannelBOMapper } from "@/model/mappers/module";

export default class VideoBOMapper {
    static createBoFromVideoAndChannel(videoDTO: VideoDTO, channelDTO: ChannelDTO): VideoBO {
        return new VideoBO(
            videoDTO.id,
            videoDTO.title,
            videoDTO.thumbnail,
            videoDTO.publichedAt,
            videoDTO.viewCount,
            videoDTO.duration,
            videoDTO.likeCount,
            videoDTO.dislikeCount,
            videoDTO.commentCount,
            videoDTO.description,
            ChannelBOMapper.dtoToBo(channelDTO)
        );
    }

    static createBoListFromVideoAndChannel(videos: VideoDTO[], channels: ChannelDTO[]): VideoBO[] {
        const listBO: VideoBO[] = [];

        for (const videoDTO of videos) {
            if (videoDTO != undefined) {
                const channelDTO = channels.find((channel) => channel.id == videoDTO.channelId);

                if (channelDTO != undefined) {
                    listBO.push(VideoBOMapper.createBoFromVideoAndChannel(videoDTO, channelDTO));
                }
            }
        }

        return listBO;
    }
}
