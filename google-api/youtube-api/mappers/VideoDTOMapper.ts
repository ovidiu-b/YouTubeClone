import { VideoDTO } from "../types/dtos/module";

export default class VideoDTOMapper {
    static toDTO(video: any): VideoDTO {
        return {
            id: video.id,
            duration: video.contentDetails.duration,
            channelId: video.snippet.channelId,
            publichedAt: video.snippet.publishedAt,
            thumbnail: video.snippet.thumbnails.medium.url,
            title: video.snippet.title,
            viewCount: video.statistics.viewCount,
            categoryId: video.snippet.categoryId
        };
    }
}
