import React, { useState, useEffect } from "react";

import Axios, * as others from "axios";
import { HiChevronDown } from "react-icons/hi";
import { IconContext } from "react-icons";
import { UserContext } from "../App";
import { MdOutlineCreate } from "react-icons/md";

import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL
const Modal = () => {
  // const [isShow, setIsShow] = useState(false);

  // const handleMouseOver = () => {
  //   setIsShow(true);
  // };

  // const handleMouseOut = () => {
  //   setIsShow(false);
  // };
  const [places, setPlace] = useState([]);
  const [navColor, setnavColor] = useState("#353535");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#ffffff") : setnavColor("#353535");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  useEffect(() => {
    Axios.get('https://travelinv.azurewebsites.net/api/listprovinces').then((response) => {
      setPlace(response.data);
    });
  }, []);
  return (
    <div className="modal-container">
      <div
        // onMouseOver={handleMouseOver}
        // onMouseOut={handleMouseOut}
        className="modal"
      >
        <li className="search">
          <a
            href=""
            style={{
              color: navColor,
            }}
          >
            Want to go ...
            <IconContext.Provider value={{ className: "icon_chevDown" }}>
              <HiChevronDown
                style={{
                  color: navColor,
                }}
              />
            </IconContext.Provider>
          </a>
        </li>
      </div>
      <div className="modal-view">
        <div className="nav-modal">
          
            <Link to="/">Home</Link>
            <Link to="/Blogs">Blogs</Link>
            <Link to="/CreatePost">
              Create 
              <IconContext.Provider value={{ className: "icon_shop" }}>
                <MdOutlineCreate />
              </IconContext.Provider>
            </Link>
            <Link to="/AboutUs">About</Link>
         
        </div>
        <div className="palace-modal">
          {places.map((place) => {
            return (
              <Link to={`/Blogs/${place.id_province}`} key={place.id_province} >
                <div className="paplace-item">
                  <p>{place.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* {isShow && (
        <div className="modal-view">
          <div className="palace">
            {places.map((place) => {
              const { idProvince, provinceName, image } = place;
              return (
                <div className="next_place-item">
                  <a href="#">
                    <p>{provinceName}</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Modal;
