import { stringify } from "postcss";

export default class VideoPreviewBO {
    constructor(
        id: string,
        title: string,
        thumbnail: string,
        timeElapsed: string,
        viewCount: string,
        duration: string,
        channelTitle: string,
        channelThumbnail: string
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.timeElapsed = timeElapsed;
        this.viewCount = viewCount;
        this.duration = duration;
        this.channelTitle = channelTitle;
        this.channelThumbnail = channelThumbnail;
    }

    readonly id: string;
    readonly title: string;
    readonly thumbnail: string;
    readonly timeElapsed: string;
    readonly viewCount: string;
    readonly duration: string;
    readonly channelTitle: string;
    readonly channelThumbnail: string;
}
