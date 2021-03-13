import YoutubeSearchGet from "./YoutubeSearchGet";
import YoutubeVideosGet from "./YoutubeVideosGet";
import YoutubeChannelsGet from "./YoutubeChannelsGet";
import YoutubeCommentsGet from "./YoutubeCommentsGet";
import YoutubeRepliesGet from "./YoutubeRepliesGet";

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

    static youtubeCommentsGet(): YoutubeCommentsGet {
        return new YoutubeCommentsGet("/api/commentThreads");
    }

    static youtubeRepliesGet(): YoutubeRepliesGet {
        return new YoutubeRepliesGet("/api/comments");
    }
}
