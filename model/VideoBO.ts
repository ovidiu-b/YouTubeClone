import { ChannelBO } from "@/model/module";

export default class VideoBO {
    constructor(
        id: string,
        title: string,
        thumbnail: string,
        timeElapsed: string,
        viewCount: string,
        duration: string,
        likeCount: string,
        dislikeCount: string,
        commentCount: string,
        description: string,
        channel: ChannelBO
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.timeElapsed = timeElapsed;
        this.viewCount = viewCount;
        this.duration = duration;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.commentCount = commentCount;
        this.description = description;
        this.channel = channel;
    }

    readonly id: string;
    readonly title: string;
    readonly thumbnail: string;
    readonly timeElapsed: string;
    readonly viewCount: string;
    readonly duration: string;
    readonly likeCount: string;
    readonly dislikeCount: string;
    readonly commentCount: string;
    readonly description: string;
    readonly channel: ChannelBO;
}
