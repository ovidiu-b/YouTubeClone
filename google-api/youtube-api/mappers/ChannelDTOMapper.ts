import { ChannelDTO } from "@/google-api/youtube-api/types/dtos/module";

export default class ChannelDTOMapper {
    static toDTO(channel: any): ChannelDTO {
        return {
            id: channel.id,
            title: channel.snippet.title,
            thumbnail: channel.snippet.thumbnails.medium.url,
            subscriberCount: channel.statistics.subscriberCount
        };
    }
}
