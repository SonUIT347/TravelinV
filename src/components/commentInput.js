import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function CommentInput({
  checkReadBlog,
  focustInput,
  commentInput, 
  setCommentInput,
  handleComments
}) { const {user} = useContext(UserContext)
const navigate = useNavigate()
  return (
    <div>
      {checkReadBlog.replyInput && (
        <div>
          <div className="comments-reply-title">Write a comment</div>
          <div className="comments-form">
            <label>Comment</label>
            <textarea
              ref={focustInput}
              value={commentInput.description}
              onChange={(e) => {
                setCommentInput({...commentInput, description: e.target.value})
              }}
            ></textarea>
            <button
              onClick={() => {
               user.loggedIn ? commentInput.description && handleComments() : navigate('/Login')
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
