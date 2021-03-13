import { ReplyThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default interface YoutubeRepliesGetResponse {
    replies: ReplyThreadDTO[];
}
