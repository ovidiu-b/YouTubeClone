import { VideoDTO, ChannelDTO } from "@/google-api/youtube-api/types/dtos/module";
import { VideoBO } from "@/model/module";
import { ChannelMapper } from "@/model/mappers/module";

export default class VideoMapper {
    static createBoFromVideoAndChannel(videoDTO: VideoDTO, channelDTO: ChannelDTO): VideoBO {
        return new VideoBO(
            videoDTO.id,
            videoDTO.title,
            videoDTO.thumbnail,
            videoDTO.publichedAt,
            videoDTO.viewCount,
            videoDTO.duration,
            ChannelMapper.dtoToBo(channelDTO)
        );
    }

    static createBoListFromVideoAndChannel(videos: VideoDTO[], channels: ChannelDTO[]): VideoBO[] {
        const listBO: VideoBO[] = [];

        for (const videoDTO of videos) {
            if (videoDTO != undefined) {
                const channelDTO = channels.find((channel) => channel.id == videoDTO.channelId);

                if (channelDTO != undefined) {
                    listBO.push(VideoMapper.createBoFromVideoAndChannel(videoDTO, channelDTO));
                }
            }
        }

        return listBO;
    }
}
