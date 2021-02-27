import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { ChannelDTO } from "./types/dtos/module";
import { YoutubeChannelsGetResponse } from "./types/responses/module";

export default class YoutubeChannelsGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
        super.setPartSnippet();
    }

    setChannelId(channelId: string): YoutubeChannelsGet {
        this.setChannelIds([channelId]);
        return this;
    }

    setChannelIds(channelIds: string[]): YoutubeChannelsGet {
        channelIds.forEach((channelId) => {
            this.urlParams.append("id", channelId);
        });
        return this;
    }

    async execute(): Promise<YoutubeChannelsGetResponse> {
        const listChannels = await $axios.$get(this.urlParams.build());

        const response: YoutubeChannelsGetResponse = {
            channels: listChannels.items.map((channel: any) => {
                const dto: ChannelDTO = {
                    id: channel.id,
                    title: channel.snippet.title,
                    thumbnail: channel.snippet.thumbnails.medium.url
                };
                return dto;
            })
        };

        return response;
    }
}
