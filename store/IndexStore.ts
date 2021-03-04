import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { VideoBO } from "@/model/module";
import YoutubeClient from "@/google-api/youtube-api/YoutubeClient";
import { get, set } from "idb-keyval";
import { TimeUtils, CacheUtils } from "@/utils/module";
import { VideoBOMapper } from "@/model/mappers/module";

const CACHE_KEY = "VIDEO_PREVIEW_LIST";
const CACHE_LAST_SAVE_KEY = "INDEX_STORE_CACHE_LAST_SAVE";
const CACHE_LIMIT_TIME = 2 * 3600; // 2 hours in seconds

@Module({
    name: "IndexStore",
    stateFactory: true,
    namespaced: true
})
export default class IndexStore extends VuexModule {
    videoPreviewList: VideoBO[] = [];

    @Mutation
    private setVideos(listBo: VideoBO[]) {
        this.videoPreviewList = listBo;
    }

    @Action
    async loadVideos() {
        const value = await get(CACHE_KEY);

        if (
            !CacheUtils.isCacheEnabled ||
            value == null ||
            value == undefined ||
            CacheUtils.hasCacheTimeLimitExpired(CACHE_LAST_SAVE_KEY, CACHE_LIMIT_TIME)
        ) {
            try {
                const searchResponse = await YoutubeClient.youtubeSearchGet().execute();
                const videosResponse = await YoutubeClient.youtubeVideosGet().setVideoIds(searchResponse.videoIds).execute();
                const channelsResponse = await YoutubeClient.youtubeChannelsGet().setChannelIds(searchResponse.channelIds).execute();

                const videoBoList: VideoBO[] = VideoBOMapper.createBoListFromVideoAndChannel(
                    videosResponse.videos,
                    channelsResponse.channels
                );

                this.setVideos(videoBoList);
                set(CACHE_KEY, videoBoList);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.setVideos(value);
        }
    }
}
