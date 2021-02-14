import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { VideoPreviewBO } from "@/model/module";
import YoutubeClient, { YoutubeVideoType, VideoChannelDTO, VideoDTO, ChannelDTO } from "@/google-api/youtube-api/YoutubeClient";

@Module({
    name: "IndexStore",
    stateFactory: true,
    namespaced: true
})
export default class IndexStore extends VuexModule {
    videoPreviewList: VideoPreviewBO[] = [];

    @Mutation
    private setVideos(dto: SetVideosMutationDTO) {
        for (const videoChannelId of dto.videoChannelIds) {
            const videoId = videoChannelId.videoId;
            const channelId = videoChannelId.channelId;

            const videoDTO = dto.videos.find((video) => video.id == videoId);
            const channelDTO = dto.channels.find((channel) => channel.id == channelId);

            if (videoDTO != undefined && channelDTO != undefined) {
                this.videoPreviewList.push(
                    new VideoPreviewBO(
                        videoDTO.id,
                        videoDTO.title,
                        videoDTO.thumbnail,
                        videoDTO.publichedAt,
                        videoDTO.viewCount,
                        videoDTO.duration,
                        channelDTO.title,
                        channelDTO.thumbnail
                    )
                );
            }
        }
    }

    @Action
    async loadVideos() {
        try {
            const searchClient = YoutubeClient.searchClientGet();
            searchClient.setPartId().setPartSnippet().setChartMostPopular().setType(YoutubeVideoType.VIDEO).setMaxResults(50);
            const searchResponse = await searchClient.execute();

            const videosClient = YoutubeClient.videosClientGet();
            videosClient.setPartId().setPartSnippet().setPartStatistics().setPartContentDetails().setVideoIds(searchResponse.videoIds);
            const videosResponse = await videosClient.execute();

            const channelsClient = YoutubeClient.channelsClientGet();
            channelsClient.setPartSnippet().setChannelIds(searchResponse.channelIds);
            const channelsResponse = await channelsClient.execute();

            this.setVideos({
                videoChannelIds: searchResponse.videoChannelIds,
                videos: videosResponse.videos,
                channels: channelsResponse.channels
            });
        } catch (error) {
            console.error(error.message);
        }
    }
}

interface SetVideosMutationDTO {
    videoChannelIds: VideoChannelDTO[];
    videos: VideoDTO[];
    channels: ChannelDTO[];
}
