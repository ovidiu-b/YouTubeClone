import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { YoutubeVideosGetResponse } from "./types/responses/module";
import { VideoDTOMapper } from "./mappers/module";

export default class YoutubeVideosGet extends YoutubeClientBase {
    private readonly videoIds: string[] = [];

    constructor(url: string) {
        super(url);
        super.setPartId().setPartSnippet().setPartStatistics().setPartContentDetails();
    }

    setVideoId(videoId: string): YoutubeVideosGet {
        this.setVideoIds([videoId]);
        return this;
    }

    setVideoIds(videoIds: string[]): YoutubeVideosGet {
        this.videoIds.push(...videoIds);

        videoIds.forEach((videoId) => {
            this.urlParams.append("id", videoId);
        });

        return this;
    }

    setCategoryId(categoryId: string): YoutubeVideosGet {
        this.urlParams.append("videoCategoryId", categoryId);
        this.setChartMostPopular().setMaxResults(15);
        return this;
    }

    async executeRaw(): Promise<any> {
        return await $axios.$get(this.urlParams.build());
    }

    async execute(): Promise<YoutubeVideosGetResponse> {
        const listVideos = await this.executeRaw();

        const response: YoutubeVideosGetResponse = {
            videos: listVideos.items.map((video: any) => {
                return VideoDTOMapper.toDTO(video);
            })
        };

        return response;
    }
}
