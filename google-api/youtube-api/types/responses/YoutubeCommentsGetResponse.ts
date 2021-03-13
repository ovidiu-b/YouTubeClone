import { CommentThreadDTO } from "@/google-api/youtube-api/types/dtos/module";

export default interface YoutubeCommentsGetResponse {
    comments: CommentThreadDTO[];
}
