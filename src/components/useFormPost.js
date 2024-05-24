import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFormPost = (callback) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState({});

  const [idPost, setIdPost] = useState(0);

  const [provinces, setProvinces] = useState([]);

  const [descriptions, setDescriptions] = useState([]);

  const { user } = useContext(UserContext);
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/public/province`)
      .then((res) => setProvinces(res.data));
  }, []);

  const handleChangeTitle = (e) => {
    setTitle({ ...title, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(title.imagePreview);
    };
  }, [title.image]);

  const handleTitleImage = (e) => {
    setTitle({
      ...title,
      [e.target.name]: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    var id = 0;
    const formData = new FormData();
    const obj = {
      title: title.title,
      id_province: title.idProvince,
      demo_description: title.demo_description,
    };

    try {
      if (title.image) {
        const json = JSON.stringify(obj);
        const blob = new Blob([json], { type: "application/json" });
        formData.append("postRequest", blob);
        formData.append("postImage", title.image);

        const response = await axios.post(
          `${baseURL}/post/createPost`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        id = response.data;
      } else {
        const json = JSON.stringify(obj);
        const blob = new Blob([json], { type: "application/json" });
        formData.append("postRequest", blob);

        const response = await axios.post(
          `${baseURL}/post/createPost`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        id = response.data;
      }

      for (let i = 0; i < descriptions.length; i++) {
        if (descriptions[i]) {
          if (descriptions[i].image1 || descriptions[i].image2) {
            const obj = {
              description: descriptions[i].description,
              des_title: descriptions[i].title,
              id_post: id,
            };
            const json = JSON.stringify(obj);
            const blob = new Blob([json], { type: "application/json" });
            const uploadDataTitle = new FormData();
            uploadDataTitle.append("DesImage1", descriptions[i].image1);
            uploadDataTitle.append("DesImage2", descriptions[i].image2);
            uploadDataTitle.append("description", blob);

            await axios.post(
              `${baseURL}/description/createDes`,
              uploadDataTitle,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        }
      }

      toast.success("Posted successfully, awaiting moderation!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const emailContent = new FormData();
      emailContent.append("email", user.email)
      emailContent.append("subject", "Post created successfully")
      emailContent.append("text", "Post created successfully")
      try {
        axios.post(`https://travelinv.azurewebsites.net/api/sendmail`, {
          "email": user.email,
          "subject": "Post created successfully",
          "text": "Post created successfully. Your post is now pending approval. Please wait for admin approval."
        })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while posting. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return {
    title,
    provinces,
    descriptions,
    setDescriptions,
    handleChangeTitle,
    handleTitleImage,
    handleCreatePost,
  };
};

export default useFormPost;
