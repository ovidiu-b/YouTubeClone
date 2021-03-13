export default class ChannelBO {
    constructor(id: string, title: string, thumbnail: string, subscriberCount: string) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.subscriberCount = subscriberCount;
    }

    readonly id: string;
    readonly title: string;
    readonly thumbnail: string;
    readonly subscriberCount: string;
}
