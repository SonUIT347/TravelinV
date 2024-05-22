import { useState, useEffect } from "react";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideImages, setSlideImages] = useState([{}]);
  const [relatedPosts, setRelatePosts] = useState([{}]);

  const slideLengh = slideImages.length;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLengh - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLengh - 1 : currentSlide - 1);
  };

  useEffect(() => {
    const FecthSlideImages = async () => {
      try {
        await axios
          .get(`${baseURL}/post/public/getAllPost/v3`)
          .then((response) => {
            setSlideImages(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    const FecthRelatedPosts = async () => {
      try {
        await axios
          .get(
            `${baseURL}/post/public/getRelatedPost/${slideImages[currentSlide].id_province}/${slideImages[currentSlide].id_post}`
          )
          .then((response) => {
            setRelatePosts(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    FecthSlideImages();
    FecthRelatedPosts();
  }, [currentSlide]);

  return (
    <div className="slider-container">
      {/* {console.log(slideImages)} */}
      <div className="realated-post-ctn">
        <div className="sidebar-articles">
          <div
            className="sidebar-articles_container_blogs"
            style={
              relatedPosts.length === 0
                ? {}
                : {
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                }
            }
          >
            {relatedPosts.map((relatedPost, index) => (
              <Link
                className="article-text-block"
                to={`/Blogs/${relatedPost.id_province}/${relatedPost.id_post}`}
              >
                {relatedPost.image !== null && (
                  <div>
                    <div
                      className="article-text-block_image"
                      key={relatedPost.id_post}
                    >
                      <img src={relatedPost.image} alt="image of post" />

                    </div>
                    <div className="article-text-block_content">
                      <h2>{relatedPost.post_name}</h2>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <button className=" slider-btn" id="left" onClick={prevSlide}>
        <HiChevronLeft />
      </button>
      <button className=" slider-btn" id="right" onClick={nextSlide}>
        <HiChevronRight />
      </button>
      <div className="slider-ctn-titile">
        <span className="slider-title">
          {slideImages[currentSlide].post_name}
        </span>
      </div>
      <div className="slider-ctn-des">
        <span className="slider-des">
          {slideImages[currentSlide].demo_description}
        </span>
      </div>

      {slideImages.map((slideImage, index) => (
        <div key={index} className="slide-active">
          {index === currentSlide && (
            <>
              <img className="slider-img" src={slideImage.image}></img>
              <div className="button-ctn">
                <Link className="slider-button" to={`/Blogs/${slideImage.id_province}/${slideImage.id_post}`}>
                  GO TO POST
                </Link>
              </div>

            </>

          )}
          <div className="button-ctn">
            <Link className="slider-button" to={`/Blogs/${slideImage.id_province}/${slideImage.id_post}`}>
              GO TO POST
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
