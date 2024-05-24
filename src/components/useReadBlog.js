import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";

const useReadBlog = (callback) => {
  const focustInput = useRef();

  const { user } = useContext(UserContext);

  const location = useLocation();

  const [province, setProvince] = useState({ province_name: "" });

  const [authorPost, setAuthorPost] = useState({});

  const [desPost, setDesPost] = useState([]);

  const [checkReadBlog, setCheckReadBlog] = useState({ replyInput: true });

  const [related, setRelated] = useState([]);

  const [comment, setComment] = useState([]);

  const [reply, setReply] = useState([]);
  const baseURL = process.env.REACT_APP_API_BASE_URL
  const baseURL_NODE = process.env.REACT_APP_API_BASE_URL_NODE
  const [commentInput, setCommentInput] = useState({
    userName: user.userName,
    idPost: location.pathname.split("/")[3],
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/public/province/post/${location.pathname.split("/")[2]}`)
      .then((res) =>
        setProvince(
          res.data.reduce((t, v) => {
            const { name, ...rest } = v;
            t = rest;
            return t;
          }, {})
        )
      );

    axios
      .get(
        `${baseURL}/post/author/${location.pathname.split("/")[3]}`
      )
      .then((res) =>
        setAuthorPost(
          res.data.reduce((t, v) => {
            const { name, ...rest } = v;
            t = rest;
            return t;
          }, {})
        )
      );

    axios
      .get(`${baseURL}/description/public/${location.pathname.split("/")[3]}`)
      .then((res) => setDesPost(res.data));

    axios
      .post(`${baseURL}/like/isLikeExists`, 
      {
        id_post: location.pathname.split("/")[3],
        id_user: user.id_user
      },
      {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        }
      })
      .then((res) =>{
        console.log(res.data)
        setCheckReadBlog({ ...checkReadBlog, checkLike: res.data })
      }

      ).catch((error) => {
        console.log(error);
      })
    axios
      .get(
        `${baseURL}/post/public/getFeaturedPost`

      )
      .then((res) => setRelated(res.data));

    axios
      .get(`${baseURL_NODE}/Comment/${location.pathname.split("/")[3]}`)
      .then((res) => setComment(res.data));

    axios
      .get(`${baseURL_NODE}/Reply/${location.pathname.split("/")[3]}`)
      .then((res) => setReply(res.data));
  }, [location]);

  useEffect(() => {
    axios
      .get(
        `${baseURL}/post/author/${location.pathname.split("/")[3]}`
      )
      .then((res) =>
        setAuthorPost(
          res.data.reduce((t, v) => {
            const { name, ...rest } = v;
            t = rest;
            return t;
          }, {})
        )
      );
  }, [checkReadBlog.checkLike]);

  const handleComments = () => {
    axios
      .post(
        `${baseURL_NODE}/CreateComment/${location.pathname.split("/")[3]
        }`,
        commentInput
      )
      .then((res) => console.log(res.data));

    setCommentInput({ ...commentInput, description: "" });

    focustInput.current.focus();

    axios
      .get(`${baseURL_NODE}/Comment/${location.pathname.split("/")[3]}`)
      .then((res) => setComment(res.data));
  };

  const handleReplys = (idComment) => {
    axios
      .post(`${baseURL_NODE}/CreateReply/${idComment}`, commentInput)
      .then((res) => console.log(res.data));

    setCheckReadBlog({
      ...checkReadBlog,
      keyReply: "",
      replyInput: true,
    });

    setCommentInput({ ...commentInput, description: "" });

    axios
      .get(`${baseURL_NODE}/Reply/${location.pathname.split("/")[3]}`)
      .then((res) => setReply(res.data));
  };

  const handleDeleteComment = (type, idComment) => {
    if (type === "comment-reply") {
      axios.delete(`${baseURL_NODE}/DeleteReply/${idComment}`);

      axios.delete(`${baseURL_NODE}/DeleteComment/${idComment}`);

      axios
        .get(`${baseURL_NODE}/Comment/${location.pathname.split("/")[3]}`)
        .then((res) => setComment(res.data));
    } else {
      axios.delete(`${baseURL_NODE}/DeleteReply/${idComment}`);
    }
    axios
      .get(`${baseURL_NODE}/Reply/${location.pathname.split("/")[3]}`)
      .then((res) => setReply(res.data));
  };

  const handleEditComment = (type, idComment, idReply) => {
    if (type === "comment-reply") {
      axios.put(`${baseURL_NODE}/EditComment/${idComment}`, commentInput).then((res) => console.log(res.data));

      axios
        .get(`${baseURL_NODE}/Comment/${location.pathname.split("/")[3]}`)
        .then((res) => setComment(res.data));
    } else {
      axios.put(`${baseURL_NODE}/EditReply/${idReply}`, commentInput).then((res) => console.log(res.data));

      axios
        .get(`${baseURL_NODE}/Reply/${location.pathname.split("/")[3]}`)
        .then((res) => setReply(res.data));
    }
    setCommentInput({ ...commentInput, description: '' })
    setCheckReadBlog({ ...checkReadBlog, checkEdit: false, checkReply: '', replyInput: true })
  };

  const handleLike = () => {
    if (checkReadBlog.checkLike) {
      axios.post(
        `${baseURL}/like/delete`,
        {
          id_post: location.pathname.split("/")[3],
          id_user: user.id_user
        },
        {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          }
        }
      )
        .then(() => {
          setCheckReadBlog({ ...checkReadBlog, checkLike: false });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      axios.post(
        `${baseURL}/like/create`,
        {
          id_post: location.pathname.split("/")[3],
          id_user: user.id_user
        },
        {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          }
        }
      )
        .then(() => {
          setCheckReadBlog({ ...checkReadBlog, checkLike: true });
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }
  };


  return {
    user,
    province,
    authorPost,
    desPost,
    checkReadBlog,
    related,
    comment,
    reply,
    commentInput,
    focustInput,
    setCommentInput,
    handleLike,
    setCheckReadBlog,
    handleComments,
    handleReplys,
    handleDeleteComment,
    handleEditComment
  };
};
export default useReadBlog;
