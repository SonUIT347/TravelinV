import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios, * as others from 'axios';
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL 
function FeaturePost() {
  const { pathname } = useLocation();
  const [posts, setpost] = useState([])

 useEffect(() =>{
   Axios.get(`${baseURL}/post/public/getFeaturedPost`).then((response)=>{
      setpost(response.data)
     }
   )
 },[pathname])
  return (
    <div className="feature_post--container">
      {posts.map((posts) => {
        return (
          <Link to = {`/Blogs/${posts.id_province}/${posts.id_post}`} className="feature_post" key={posts.id_post}>
            <h2 className="feature_post--title">{posts.post_name} </h2>
            <abbr title={posts.post_name}>
            <div className="feature_post--img">
              <img src={posts.image} alt={posts.post_name} />
            </div>
            </abbr>     
          </Link>
          
        );
      })}
    </div>
  );
}

export default FeaturePost;
