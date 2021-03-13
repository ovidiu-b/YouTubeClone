import CommentDTO from "./CommentDTO";

export default interface CommentThreadDTO extends CommentDTO {
    totalReplyCount: string;
}
