import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { YoutubeVideoType } from "./types/enums/module";
import { YoutubeSearchGetResponse } from "./types/responses/module";

export default class YoutubeSearchGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
        super.setPartId().setPartSnippet().setChartMostPopular().setType(YoutubeVideoType.VIDEO).setMaxResults(50);
    }

    setType(type: YoutubeVideoType) {
        this.urlParams.append("type", type);
        return this;
    }

    async execute(): Promise<YoutubeSearchGetResponse> {
        const searchList = await $axios.$get(this.urlParams.build());

        const videoIdsList: string[] = [];
        const channelIdsList: string[] = [];

        searchList.items.forEach((item: any) => {
            if (item.id.videoId) {
                videoIdsList.push(item.id.videoId);
                channelIdsList.push(item.snippet.channelId);
            }
        });

        const response: YoutubeSearchGetResponse = {
            videoIds: videoIdsList,
            channelIds: channelIdsList
        };

        return response;
    }
}
