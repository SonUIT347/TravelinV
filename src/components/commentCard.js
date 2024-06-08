import { IconContext } from "react-icons";
import { BsFillCircleFill } from "react-icons/bs";
import { FiCornerUpLeft } from "react-icons/fi";
import { AiOutlineMore, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function CommentCard({
  setCheckReadBlog,
  checkReadBlog,
  comment,
  commentInput,
  setCommentInput,
  className,
  handleDeleteComment,
  handleEditComment,
  ...Children
}) { console.log(comment.idComment === checkReadBlog.checkReply,comment.idComment, checkReadBlog.checkReply)
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formattedDates, setFormattedDates] = useState([]);
  axios.post("https://travelinv.azurewebsites.net/api/formatddmmyy", { date: comment.dateTime }).then((response) => {
    setFormattedDates(response.data);
  });
  return (
    <div>
      <div
        className="comment"
        style={{
          ...Children,
        }}
      >
        {(user.userName === comment.userName ||
          user.accountType === "admin") && (
          <div className="comment-more">
            <IconContext.Provider value={{ className: "icon_OulineMore" }}>
              <AiOutlineMore />
            </IconContext.Provider>
            <div className="comment-edit-delete">
              {user.userName === comment.userName && (
                <button
                  onClick={() => {
                    setCheckReadBlog({
                      ...checkReadBlog,
                      checkEdit: true,
                      checkReply: comment.idReply ? comment.idReply : comment.idComment,
                      replyInput: false,
                    });
                    setCommentInput({
                      ...commentInput,
                      description: comment.description,
                      idReply: comment.idReply,
                    });
                  }}
                >
                  <AiFillEdit /> Edit
                </button>
              )}
              <button
                onClick={() => {
                  handleDeleteComment(className, comment.idComment);
                }}
              >
                <AiFillDelete /> Delete
              </button>
            </div>
          </div>
        )}
        <div className="comment-data">
          <Link to={`/Personal/${comment.userName}`}>{comment.userName}</Link>
          <IconContext.Provider value={{ className: "icon_FillCircleFill" }}>
            <BsFillCircleFill />
          </IconContext.Provider>
          <div>{formattedDates}</div>
        </div>
        <p>{comment.description}</p>
        <div className="reply">
          <button
            className={className}
            onClick={() => {
              setCommentInput({
                ...commentInput,
                description:
                  user.userName !== comment.userName
                    ? `@${comment.userName} `
                    : "",
              });
              user.loggedIn
                ? setCheckReadBlog({
                    ...checkReadBlog,
                    keyReply: comment.idReply ? comment.idReply : comment.idComment,
                    replyInput: false,
                  })
                : navigate("/Login");
            }}
          >
            <FiCornerUpLeft /> Reply
          </button>
        </div>
      </div>
      {checkReadBlog.checkEdit &&
       (comment.idReply ? comment.idReply : comment.idComment) === checkReadBlog.checkReply && (
          <div className="comments-reply">
            <div className="comments-reply-title">Write a comment</div>
            <div className="comments-form">
              <label>Edit comment</label>
              <div>
                <button
                  className="cancel"
                  onClick={() => {
                    setCommentInput({ ...commentInput, description: "" });
                    setCheckReadBlog({
                      ...checkReadBlog,
                      checkEdit: false,
                      checkReply: "",
                      replyInput: true,
                    });
                  }}
                >
                  Click here to cancel edit.
                </button>
              </div>
              <textarea
                value={commentInput.description}
                onChange={(e) => {
                  setCommentInput({
                    ...commentInput,
                    description: e.target.value,
                  });
                }}
              ></textarea>
              <button
                onClick={() => {
                  commentInput.description &&
                    comment.description !== commentInput.description &&
                    handleEditComment(
                      className,
                      comment.idComment,
                      commentInput.idReply
                    );
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
