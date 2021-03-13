import { $axios } from "@/utils/api";
import YoutubeClientBase from "./YoutubeClientBase";
import { YoutubeCommentsGetResponse } from "./types/responses/module";
import { CommentDTOMapper } from "@/google-api/youtube-api/mappers/module";
import { CommentThreadOrder } from "@/google-api/youtube-api/types/enums/module";
import { CommentThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default class YoutubeCommentsGet extends YoutubeClientBase {
    constructor(url: string) {
        super(url);
        super.setPartId().setPartSnippet().setMaxResults(50);
    }

    setOrder(order: CommentThreadOrder) {
        this.urlParams.append("order", order);
        return this;
    }

    setVideoId(videoId: string) {
        this.urlParams.append("videoId", videoId);
        return this;
    }

    async execute(): Promise<YoutubeCommentsGetResponse> {
        const commentsThreadRemoteList = await $axios.$get(this.urlParams.build());

        const response: YoutubeCommentsGetResponse = {
            comments: commentsThreadRemoteList.items.map((comment: any) => {
                const dto: CommentThreadDTO = CommentDTOMapper.toDto(comment);

                return dto;
            })
        };

        return response;
    }
}
