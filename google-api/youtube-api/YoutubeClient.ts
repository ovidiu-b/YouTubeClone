import YoutubeSearchGet from "./YoutubeSearchGet";
import YoutubeVideosGet from "./YoutubeVideosGet";
import YoutubeChannelsGet from "./YoutubeChannelsGet";

export default class YoutubeClient {
    static youtubeSearchGet(): YoutubeSearchGet {
        return new YoutubeSearchGet("/api/search");
    }

    static youtubeVideosGet(): YoutubeVideosGet {
        return new YoutubeVideosGet("/api/videos");
    }

    static youtubeChannelsGet(): YoutubeChannelsGet {
        return new YoutubeChannelsGet("/api/channels");
    }
}
