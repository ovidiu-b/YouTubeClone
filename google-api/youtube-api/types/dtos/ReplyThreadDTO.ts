import CommentDTO from "./CommentDTO";

export default interface ReplyThreadDTO extends CommentDTO {
    parentId: string;
}
