/* eslint-disable jsx-a11y/img-redundant-alt */
import "../readBlogs.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useMemo } from "react";
import { HiChevronRight } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import { IconContext } from "react-icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import CommentInput from "../components/commentInput";
import CommentReply from "../components/commentReply";
import { CommentCard } from "../components/commentCard";
import useReadBlog from "../components/useReadBlog";
import removeVietnameseTones from "../components/removeVietnameseTones";
//Chứa thông tin cơ bản của tác giả và tiêu đề bài post

function ReadBlogs() {
  const navigate = useNavigate()
  let PageSize = 3;
  const {
    user,
    province,
    authorPost,
    desPost,
    checkReadBlog,
    related,
    comment,
    commentInput,
    setCommentInput,
    handleLike,
    setCheckReadBlog,
    reply,
    handleComments,
    focustInput,
    handleReplys,
    handleDeleteComment,
    handleEditComment,
  } = useReadBlog();
  const [comments, setComments] = useState(comment);
  const [content, setContent] = useState("");
  const [checkReply, setCheckReply] = useState(-1);
  const [checkEdit, setCheckEdit] = useState();
  const [checkReadMore, setCheckReadMore] = useState(
    comments.length >= PageSize ? true : false
  );
  const [currentPage, setCurrentPage] = useState(0);
  const currentTableData = useMemo(() => {
    const fistIndex = comment.length - PageSize * (currentPage + 1);
    const fistPageIndex = fistIndex < 0 ? 0 : fistIndex;
    fistIndex < 0 ? setCheckReadMore() : setCheckReadMore(true);
    return comment.slice(fistPageIndex, comment.length).reverse();
  }, [currentPage, comment]);

  return (
    <div>
      {/* Ảnh chính của bài post */}
      <div id="img_post">
        <img className="img_title" src={authorPost.image} alt="img-main"></img>
      </div>

      {/* Phần header cho bài post */}
      <div className="post-cover_content">
        <div className="post-cover_content-container">
          {/* Thanh địa chỉ */}
          <ul className="post-breadcrums_list">
            <li>
              <Link to="/">Home</Link>
              <IconContext.Provider value={{ className: "icon_chevRight" }}>
                <HiChevronRight />
              </IconContext.Provider>
            </li>
            <li>
              <Link to="/Blogs">Blogs</Link>
              <IconContext.Provider value={{ className: "icon_chevRight" }}>
                <HiChevronRight />
              </IconContext.Provider>
            </li>
            <li>
              <Link to={`/Blogs/${province.idProvince}`}>
                {removeVietnameseTones(province.provinceName)}
              </Link>
              <IconContext.Provider value={{ className: "icon_chevRight" }}>
                <HiChevronRight />
              </IconContext.Provider>
            </li>
          </ul>
          {/* Phần chứa thông về tác giả */}
          <div className="header-author">
            <Link to={`/Personal/${authorPost.userName}`}>
              <img src={authorPost.avatar} alt="Author's avatar"></img>
            </Link>
            <div className="header-author_row2">
              <div className="author-name">{authorPost.userName}</div>
              <div className="author-update-at">
                Last updated {authorPost.dateTime}
              </div>
            </div>
            <div className="author-like">
              <button
                onClick={() => {
                user.loggedIn ?  handleLike() : navigate('/Login')
                }}
              >
                {!checkReadBlog.checkLike ? (
                  <IconContext.Provider
                    value={{ className: "icon_OutlineHeart" }}
                  >
                    <AiOutlineHeart />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ className: "icon_FillHeart" }}>
                    <AiFillHeart />
                  </IconContext.Provider>
                )}
              </button>
              <div className="author-like-number">{authorPost.like}</div>
            </div>
          </div>
          {/* Phần chứa tiêu đề và mô tả của bài post */}
          <h1 className="post-cover_title">{authorPost.post_name}</h1>
          <p>{authorPost.demo_description}</p>
        </div>
      </div>

      <div className="blog-container">
        {/* Phần chứa nội dung bài post */}
        <article className="blog-article">
          {desPost.map((des) => (
            <div key={des.idDes}>
              <h2>{des.title}</h2>
              <p>{des.description}</p>
              {des.image1 && (des.image2 ? (
                <div className="f-image2">
                  <img src={des.image1} alt="image of post"></img>
                  <img src={des.image2} alt="image of post"></img>
                </div>
              ) : (
                <div className="f-image1">
                  <img src={des.image1} alt="image of post"></img>
                </div>
              ))}
            </div>
          ))}
        </article>

        {/* Phần chứa các bài viết liên quan */}
        <div className="sidebar-articles">
          <div className="sidebar-articles_title">Related Posts</div>
          <div className="sidebar-articles_container">
            {related.map((relate) => (
              <Link
                className="article-text-block"
                to={`/Blogs/${relate.id_province}/${relate.id_post}`}
              >
                <div className="article-text-block_image" key={relate.id_post}>
                  <img src={relate.image} alt="image of post"></img>
                </div>
                <div className="article-text-block_content">
                  <h2>{relate.post_name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Phần chứa thẻ liên kết ra blog */}
      <div className="related-category_link">
        <div className="related-category_card">
          <Link to={`/Blogs/${province.idProvince}`}>
            <h3>read all articles about</h3>
            <div className="related-category_title">
              <span className="text">
                {removeVietnameseTones(province.provinceName).replace(
                  /\s+/g,
                  ""
                )}
              </span>
            </div>
            <div className="circle-icon">
              <IconContext.Provider value={{ className: "icon_ArrowRight" }}>
                <FiArrowRight />
              </IconContext.Provider>
            </div>
            <img
              className="img_tilte_blog"
              src={province.image}
              alt="image of province"
            ></img>
            {/* <img className="img_tilte_custom" src={img_custom_title}></img> */}
          </Link>
        </div>
      </div>

      <div className="comments-contain">
        <div className="comments-area">
          <div className="comments-title">Blog comments</div>
          <div className="comments-respond">
            <CommentInput
              checkReadBlog={checkReadBlog}
              focustInput={focustInput}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              handleComments={handleComments}
            ></CommentInput>
            <ul className="comments-list">
              {currentTableData.map((comment) => (
                <li key={comment.idComment} className="parent">
                  <CommentCard
                    setCheckReadBlog={setCheckReadBlog}
                    checkReadBlog={checkReadBlog}
                    handleDeleteComment={handleDeleteComment}
                    handleEditComment={handleEditComment}
                    comment={comment}
                    commentInput={commentInput}
                    setCommentInput={setCommentInput}
                    className="comment-reply"
                  ></CommentCard>
                  <CommentReply
                    setCheckReadBlog={setCheckReadBlog}
                    checkReadBlog={checkReadBlog}
                    comment={comment}
                    commentInput={commentInput}
                    setCommentInput={setCommentInput}
                    handleReplys={handleReplys}
                    comment_post_key={comment.idComment}
                  ></CommentReply>
                  {reply.map(
                    (reply) =>
                      comment.idComment === reply.idComment && (
                        <div>
                          <CommentCard
                            setCheckReadBlog={setCheckReadBlog}
                            checkReadBlog={checkReadBlog}
                            handleDeleteComment={handleDeleteComment}
                            handleEditComment={handleEditComment}
                            comment={reply}
                            commentInput={commentInput}
                            setCommentInput={setCommentInput}
                            className="comment-replyy"
                            backgroundColor="#ffff"
                            borderStyle="solid"
                            borderWidth="2px"
                            borderColor="#f5f5f5"
                            marginLeft="30px"
                          ></CommentCard>
                          <CommentReply
                            setCheckReadBlog={setCheckReadBlog}
                            checkReadBlog={checkReadBlog}
                            comment={reply}
                            commentInput={commentInput}
                            setCommentInput={setCommentInput}
                            handleReplys={handleReplys}
                            comment_post_key={comment.idComment}
                          ></CommentReply>
                        </div>
                      )
                  )}
                </li>
              ))}
            </ul>
          </div>
          {checkReadMore && (
            <div className="read-more">
              <button
                onClick={() => {
                  setCurrentPage((currentPage) => currentPage + 1);
                }}
              >
                read more{" "}
                <IconContext.Provider value={{ className: "icon_ChevronDown" }}>
                  <BiChevronDown />
                </IconContext.Provider>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadBlogs;
