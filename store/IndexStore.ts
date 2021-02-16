import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { VideoPreviewBO } from "@/model/module";
import YoutubeClient, { YoutubeVideoType, VideoChannelDTO, VideoDTO, ChannelDTO } from "@/google-api/youtube-api/YoutubeClient";
import { get, set } from "idb-keyval";

const CACHE_LIST = "VIDEO_PREVIEW_LIST";

@Module({
    name: "IndexStore",
    stateFactory: true,
    namespaced: true
})
export default class IndexStore extends VuexModule {
    videoPreviewList: VideoPreviewBO[] = [];

    @Mutation
    private setVideos(listBo: VideoPreviewBO[]) {
        this.videoPreviewList = listBo;
    }

    @Action
    async loadVideos() {
        const value = await get(CACHE_LIST);

        if (value == null || value == undefined) {
            try {
                const searchClient = YoutubeClient.searchClientGet();
                searchClient.setPartId().setPartSnippet().setChartMostPopular().setType(YoutubeVideoType.VIDEO).setMaxResults(50);
                const searchResponse = await searchClient.execute();

                const videosClient = YoutubeClient.videosClientGet();
                videosClient
                    .setPartId()
                    .setPartSnippet()
                    .setPartStatistics()
                    .setPartContentDetails()
                    .setVideoIds(searchResponse.videoIds);
                const videosResponse = await videosClient.execute();

                const channelsClient = YoutubeClient.channelsClientGet();
                channelsClient.setPartSnippet().setChannelIds(searchResponse.channelIds);
                const channelsResponse = await channelsClient.execute();

                const bo = dtoToBo({
                    videoChannelIds: searchResponse.videoChannelIds,
                    videos: videosResponse.videos,
                    channels: channelsResponse.channels
                });

                this.setVideos(bo);
                set(CACHE_LIST, bo);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.setVideos(value);
        }
    }
}

function dtoToBo(dto: SetVideosMutationDTO): VideoPreviewBO[] {
    const listBO: VideoPreviewBO[] = [];

    for (const videoChannelId of dto.videoChannelIds) {
        const videoId = videoChannelId.videoId;
        const channelId = videoChannelId.channelId;

        const videoDTO = dto.videos.find((video) => video.id == videoId);
        const channelDTO = dto.channels.find((channel) => channel.id == channelId);

        if (videoDTO != undefined && channelDTO != undefined) {
            listBO.push(
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

    return listBO;
}

interface SetVideosMutationDTO {
    videoChannelIds: VideoChannelDTO[];
    videos: VideoDTO[];
    channels: ChannelDTO[];
}
