import CommentDTO from "./CommentDTO";
import ReplyThreadDTO from "./ReplyThreadDTO";

export default interface CommentThreadDTO extends CommentDTO {
    totalReplyCount: string;
    replies: ReplyThreadDTO[];
}
