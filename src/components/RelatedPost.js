import React, { useEffect, useState } from "react";
import Axios, * as others from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function RelatedPost() {
  const { pathname } = useLocation();
  const [posts1, setPost1] = useState([
    
  ]);
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://travelinv-java-backend:3100"
  const [posts2, setPost2] = useState([
    // {
    //   id: 1,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 2,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 3,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 4,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 5,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 6,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 7,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 8,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
    // {
    //   id: 9,
    //   img: "https://static.saltinourhair.com/wp-content/uploads/2022/09/27205421/theth-albania-10-480x600.jpg",
    //   provinc: " Da Nang",
    // },
  ]);
  useEffect(()=>{
    Axios.get(`${baseURL}/post/public/getAllPost/v3`).then((response) => {
      setPost1(response.data)
    })
    Axios.get(`${baseURL}/post/public/getPostAndProvince`).then((response) => {
      setPost2(response.data)
    })
  },[pathname])
  return (
    <div className="related-post--container">
      <div className="related-post--content">
        {posts1.map((post) => {
          return (
            <Link to = {`/Blogs/${post.id_province}/${post.id_post}`} className="related-post--item" key={post.id_post}>

              <div className="realted-post--item-image" key={post.id_post}>
              <img src={post.image} ></img>
              </div>
              <div className="realted-post--item-title" >
                <p> {post.post_name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="related-post--suggestion">
        {posts2.map((post) => {
          return (
            <>
              <Link
                to= {`/Blogs/${post.id_province}/${post.id_post}`}
                className="suggestion--item front "
                key={post.id_post}
                // style={{ backgroundImage:`url(${process.env.PUBLIC_URL+ img})` }}
              >
                <img src={post.image} />
                {/* <img src={dalat}  width="250" height="400"/> */}
                <div className="province">{post.province_name}</div>
              </Link>
              
            </>
            
          );
        })}
      </div>
    </div>
  );
}

export default RelatedPost;
