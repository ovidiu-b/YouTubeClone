import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { CommentThreadBO, VideoBO } from "@/model/module";
import YoutubeClient from "@/google-api/youtube-api/YoutubeClient";
import { get, set } from "idb-keyval";
import { TimeUtils, CacheUtils } from "@/utils/module";
import { CommentBOMapper, VideoBOMapper } from "@/model/mappers/module";
import { CommentThreadOrder } from "~/google-api/youtube-api/types/enums/module";

const CACHE_KEY = "WATCH_VIDEO";
const CACHE_KEY_RELATED_VIDEOS = "WATCH_RELATED_VIDEOS";
const CACHE_LAST_SAVE_KEY = "WATCH_STORE_CACHE_LAST_SAVE";
const CACHE_KEY_COMMENTS = "CACHE_KEY_COMMENTS";
const CACHE_LIMIT_TIME = 0.5 * 3600; // 30 minutes in seconds

@Module({
    name: "WatchStore",
    stateFactory: true,
    namespaced: true
})
export default class WatchStore extends VuexModule {
    videoBO: VideoBO | null = null;
    relatedVideos: VideoBO[] = [];
    commentsBO: CommentThreadBO[] = [];

    @Mutation
    setVideo(videoBO: VideoBO) {
        this.videoBO = videoBO;
    }

    @Mutation
    setRelatedVideos(videoListBO: VideoBO[]) {
        this.relatedVideos.push(...videoListBO);
    }

    @Mutation
    setComments(commentsBO: CommentThreadBO[]) {
        this.commentsBO.push(...commentsBO);
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

                this.loadRelatedVideosByCategoryId(video.categoryId);

                const channelsResponse = await YoutubeClient.youtubeChannelsGet().setChannelId(video.channelId).execute();
                const channel = channelsResponse.channels[0];

                const videoBO = VideoBOMapper.createBoFromVideoAndChannel(video, channel);

                this.setVideo(videoBO);
                set(CACHE_KEY, videoBO);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setVideo(value);

            this.loadRelatedVideosByCategoryId(value.categoryId);
        }
    }

    @Action
    async loadRelatedVideosByCategoryId(categoryId: string) {
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

                const relatedVideosBO = VideoBOMapper.createBoListFromVideoAndChannel(
                    videosResponse.videos,
                    channelsResponse.channels
                );

                set(CACHE_KEY_RELATED_VIDEOS, relatedVideosBO);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());

                this.setRelatedVideos(relatedVideosBO);
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setRelatedVideos(value);
        }
    }

    @Action
    async loadCommentsByVideoId(payload: { videoId: string; order: CommentThreadOrder }) {
        const value = await get(CACHE_KEY_COMMENTS);

        if (
            !CacheUtils.isCacheEnabled ||
            value == null ||
            value == undefined ||
            CacheUtils.hasCacheTimeLimitExpired(CACHE_KEY_COMMENTS, CACHE_LIMIT_TIME)
        ) {
            try {
                const commentsResponse = await YoutubeClient.youtubeCommentsGet()
                    .setOrder(payload.order)
                    .setVideoId(payload.videoId)
                    .execute();

                const commentsBOList = commentsResponse.comments.map((comment) => CommentBOMapper.dtoToBo(comment));

                set(CACHE_KEY_COMMENTS, commentsBOList);
                localStorage.setItem(CACHE_LAST_SAVE_KEY, TimeUtils.getCurrentTimeInSeconds().toString());

                this.setComments(commentsBOList);
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setComments(value);
        }
    }
}
