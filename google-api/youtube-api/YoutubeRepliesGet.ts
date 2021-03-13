import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { YoutubeRepliesGetResponse } from "./types/responses/module";
import { ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";
import { ReplyDTOMapper } from "@/google-api/youtube-api/mappers/module";

export default class YoutubeRepliesGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
        super.setPartId().setPartSnippet().setMaxResults(100);
    }

    setParentId(parentId: string) {
        this.urlParams.append("parentId", parentId);
        return this;
    }

    execute(): Promise<YoutubeRepliesGetResponse> {
        return $axios.$get(this.urlParams.build()).then((repliesRemoteList) => {
            const response: YoutubeRepliesGetResponse = {
                replies: repliesRemoteList.items.map((reply: any) => {
                    const dto: ReplyThreadDTO = ReplyDTOMapper.toDto(reply);

                    return dto;
                })
            };

            return response;
        });
    }
}
