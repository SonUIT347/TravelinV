import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios, * as others from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL || "http://travelinv-java-backend:3100"
function GoNext() {
  const [places, setPlace] = useState([
    
  ]);
  const location = useLocation()
  useEffect(() =>{
    Axios.get(`${baseURL}/public/province`).then((response)=>{
       setPlace(response.data)
      }
    )
  },[location])
  return (
    <>
      <div className="next-container">
        <div className="next-title">
          <p>Where to</p>
          <h2>Next?</h2>
        </div>
        
        <div className="next_place">
          {places.map((place) => {
            return (
              <div key={place.id_province} className="next_place-item">
                <Link to = {`/Blogs/${place.id_province}`}>
                  <img
                    src={place.image}
                    alt={place.province_name}
                  />
                  <p>{place.province_name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default GoNext;
