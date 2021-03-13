import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { YoutubeChannelsGetResponse } from "./types/responses/module";
import { ChannelDTOMapper } from "@/google-api/youtube-api/mappers/module";

export default class YoutubeChannelsGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
        super.setPartSnippet().setPartStatistics();
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
                return ChannelDTOMapper.toDTO(channel);
            })
        };

        return response;
    }
}
