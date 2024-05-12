export default function CommentReply({
  setCheckReadBlog,
  checkReadBlog,
  comment,
  commentInput,
  setCommentInput,
  handleReplys,
  comment_post_key,
}) {
  return (
    <div>
      {!checkReadBlog.replyInput &&
       ( comment.idReply ? comment.idReply : comment.idComment) === checkReadBlog.keyReply && (
          <div className="comments-reply">
            <div className="comments-reply-title">Write a comment</div>
            <div className="comments-form">
              <label>Comment</label>
              <div>
                <button
                  className="cancel"
                  onClick={() => {
                    setCommentInput({...commentInput, description: ''})
                    setCheckReadBlog({
                      ...checkReadBlog,
                      keyReply: "",
                      replyInput: true,
                    });
                  }}
                >
                  Click here to cancel reply.
                </button>
              </div>
              <textarea
                value={commentInput.description}
                onChange={(e) => {
                setCommentInput({...commentInput, description: e.target.value})
                }}
              ></textarea>
              <button
                onClick={() => {
                  commentInput.description && handleReplys(comment_post_key);
                }}
              >
                Send comment
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
