import { URLWithParams } from "@/utils/module";
import { $axios } from "@/utils/api";

export default class YoutubeClient {
    static searchClientGet(): YoutubeSearchGet {
        return new YoutubeSearchGet("/api/search");
    }

    static videosClientGet(): YoutubeVideosGet {
        return new YoutubeVideosGet("/api/videos");
    }

    static channelsClientGet(): YoutubeChannelsGet {
        return new YoutubeChannelsGet("/api/channels");
    }
}

abstract class YoutubeClientBase {
    protected readonly urlParams: URLWithParams;

    constructor(url: string) {
        this.urlParams = new URLWithParams(url);
    }

    setPartId() {
        this.urlParams.append("part", "id");
        return this;
    }

    setPartSnippet() {
        this.urlParams.append("part", "snippet");
        return this;
    }

    setPartStatistics() {
        this.urlParams.append("part", "statistics");
        return this;
    }

    setPartContentDetails() {
        this.urlParams.append("part", "contentDetails");
        return this;
    }

    setChartMostPopular() {
        this.urlParams.append("chart", "mostPopular");
        return this;
    }

    setMaxResults(maxResults: number) {
        this.urlParams.append("maxResults", maxResults.toString());
        return this;
    }

    abstract execute(): Promise<any>;
}

class YoutubeSearchGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
    }

    setType(type: YoutubeVideoType) {
        this.urlParams.append("type", type);
        return this;
    }

    async execute(): Promise<YoutubeSearchGetResponse> {
        const searchList = await $axios.$get(this.urlParams.build());
        const videoChannelList: VideoChannelDTO[] = [];

        searchList.items.forEach((item: any) => {
            if (item.id.videoId) {
                let videoChannel: VideoChannelDTO = {
                    videoId: item.id.videoId,
                    channelId: item.snippet.channelId
                };

                videoChannelList.push(videoChannel);
            }
        });

        const videoIds = videoChannelList.map((videoChannelId) => videoChannelId.videoId);
        const channelIds = videoChannelList.map((videoChannelId) => videoChannelId.channelId);

        const response: YoutubeSearchGetResponse = {
            videoChannelIds: videoChannelList,
            videoIds: videoIds,
            channelIds: channelIds
        };

        return response;
    }
}

class YoutubeVideosGet extends YoutubeClientBase {
    private readonly videoIds: string[] = [];

    constructor(url: string) {
        super(url);
    }

    setVideoIds(videoIds: string[]): YoutubeVideosGet {
        this.videoIds.push(...videoIds);

        videoIds.forEach((videoId) => {
            this.urlParams.append("id", videoId);
        });

        return this;
    }

    async execute(): Promise<YoutubeVideosGetResponse> {
        const listVideos = await $axios.$get(this.urlParams.build());

        const response: YoutubeVideosGetResponse = {
            videos: listVideos.items.map((video: any) => {
                const dto: VideoDTO = {
                    id: video.id,
                    duration: video.contentDetails.duration,
                    channelId: video.snippet.channelId,
                    publichedAt: video.snippet.publishedAt,
                    thumbnail: video.snippet.thumbnails.medium.url,
                    title: video.snippet.title,
                    viewCount: video.statistics.viewCount
                };
                return dto;
            })
        };

        return response;
    }
}

class YoutubeChannelsGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
    }

    setChannelIds(channelIds: string[]): YoutubeChannelsGet {
        channelIds.forEach((channelId) => {
            this.urlParams.append("id", channelId);
        });

        return this;
    }

    async execute(): Promise<YoutubeChannelsGetResponse> {
        const listChannels = await $axios.$get(this.urlParams.build());

        const response: YoutubeChannelsGetResponse = {
            channels: listChannels.items.map((channel: any) => {
                const dto: ChannelDTO = {
                    id: channel.id,
                    title: channel.snippet.title,
                    thumbnail: channel.snippet.thumbnails.medium.url
                };
                return dto;
            })
        };

        return response;
    }
}

interface VideoChannelDTO {
    videoId: string;
    channelId: string;
}

interface YoutubeSearchGetResponse {
    videoChannelIds: VideoChannelDTO[];
    videoIds: string[];
    channelIds: string[];
}

interface VideoDTO {
    id: string;
    duration: string;
    channelId: string;
    publichedAt: string;
    thumbnail: string;
    title: string;
    viewCount: string;
}

interface YoutubeVideosGetResponse {
    videos: VideoDTO[];
}

interface ChannelDTO {
    id: string;
    title: string;
    thumbnail: string;
}

interface YoutubeChannelsGetResponse {
    channels: ChannelDTO[];
}

enum YoutubeVideoType {
    CHANNEL = "channel",
    PLAYLIST = "playlist",
    VIDEO = "video"
}

export { YoutubeVideoType, VideoChannelDTO, VideoDTO, ChannelDTO };
