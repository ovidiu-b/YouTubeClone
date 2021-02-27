import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { VideoBO } from "@/model/module";
import YoutubeClient from "@/google-api/youtube-api/YoutubeClient";
import { get, set } from "idb-keyval";
import { TimeUtils, CacheUtils } from "@/utils/module";
import { VideoMapper } from "@/model/mappers/module";

const CACHE_KEY = "WATCH_VIDEO";
const CACHE_KEY_RELATED_VIDEOS = "WATCH_RELATED_VIDEOS";
const CACHE_LAST_SAVE_KEY = "WATCH_STORE_CACHE_LAST_SAVE";
const CACHE_LIMIT_TIME = 0.5 * 3600; // 30 minutes in seconds

@Module({
    name: "WatchStore",
    stateFactory: true,
    namespaced: true
})
export default class WatchStore extends VuexModule {
    videoBO: VideoBO | null = null;
    relatedVideos: VideoBO[] = [];

    @Mutation
    setVideo(videoBO: VideoBO) {
        this.videoBO = videoBO;
    }

    @Mutation
    setRelatedVideos(videoListBO: VideoBO[]) {
        this.relatedVideos = videoListBO;
    }

    @Action
    async loadVideoById(videoId: string) {
        const value = await get(CACHE_KEY);

        if (
            !CacheUtils.isCacheEnabled ||
            value == null ||
            value == undefined ||
            CacheUtils.hasCacheTimeLimitExpired(CACHE_LAST_SAVE_KEY, CACHE_LIMIT_TIME)
        ) {
            try {
                const videosResponse = await YoutubeClient.youtubeVideosGet().setVideoId(videoId).execute();
                const video = videosResponse.videos[0];

                const channelsResponse = await YoutubeClient.youtubeChannelsGet().setChannelId(video.channelId).execute();
                const channel = channelsResponse.channels[0];

                const videoBO = VideoMapper.createBoFromVideoAndChannel(video, channel);

                this.setVideo(videoBO);
                set(CACHE_KEY, videoBO);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());

                this.loadVideosByCategoryId(video.categoryId);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.setVideo(value);

            this.loadVideosByCategoryId(value.categoryId);
        }
    }

    @Action
    async loadVideosByCategoryId(categoryId: string) {
        const value = await get(CACHE_KEY_RELATED_VIDEOS);

        if (
            !CacheUtils.isCacheEnabled ||
            value == null ||
            value == undefined ||
            CacheUtils.hasCacheTimeLimitExpired(CACHE_LAST_SAVE_KEY, CACHE_LIMIT_TIME)
        ) {
            try {
                const videosResponse = await YoutubeClient.youtubeVideosGet().setCategoryId(categoryId).execute();

                const channelIds = videosResponse.videos.map((video) => video.channelId);

                const channelsResponse = await YoutubeClient.youtubeChannelsGet().setChannelIds(channelIds).execute();

                const relatedVideosBO = VideoMapper.createBoListFromVideoAndChannel(videosResponse.videos, channelsResponse.channels);

                set(CACHE_KEY_RELATED_VIDEOS, relatedVideosBO);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setRelatedVideos(value);
        }
    }
}
