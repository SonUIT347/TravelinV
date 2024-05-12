import React, { useState,useEffect, useContext  } from "react";
import { HiChevronDown } from "react-icons/hi";
import Axios, * as others from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
const baseURL = process.env.REACT_APP_API_BASE_URL
function Intro() {
  const [places, setPlace] = useState([]);
  useEffect(() => {
    Axios.get(`${baseURL}/post/public/getGoToProvince`).then((response) => {
      setPlace(response.data);
    });
  }, []);
  const [showOverlay, toggleOverlay] = useState(false);
  return (
    <>
      <div className="intro_container">
        <img
          className="intro_image"
          src='https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1600'
          alt="image_main"
        />
        <div className="intro_text--cover">
          <em className="welcome_text">
            Hi, welcome to Travel inVietNam
            <br />
            We create inspiring <a>travel blogs</a>
            about the world’s most beautiful places to make planning your
            holiday a piece of cake!
          </em>
          <p className="destination_text">
            {" "}
            Choose a
            <span className="dh-distance" onClick={() => toggleOverlay(true)}>
              destination here <HiChevronDown />
            </span>
            {showOverlay && (
              <div className="overlayBG" onClick={() => toggleOverlay(false)}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    className="overlayContent"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {places.map((place) => {
                      const { idProvince, provinceName, image } = place;
                      return (
                        <div className="next_place-item">
                          <Link to={`/Blogs/${place.idProvince}`}>
                            <p>{place.province_name}</p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            to start your journey.
          </p>
        </div>
      </div>
    </>
  );
}

export default Intro;