import React, { useEffect, useState } from "react";
import Map from "../../components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import List from "../../components/List/List";
import { useDispatch, useSelector } from "react-redux";
import { getPlacesData } from "../../redux/actions/places.action";
import Header from "../../components/Header/Header";
import { getWeatherData } from "../../redux/actions/weather.action";
import axios from "axios";
const MapScreen = () => {
  // const [places, setPlaces] = useState([]);
  const places = useSelector((state) => state.places.placesData);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  const [filteredPlaces, setFillteredPlaces] = useState([]);
  const [chidClicked, setChildCliked] = useState(null);
  const dispatch = useDispatch();
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  const getLocationByCityName = async (name) => {
    try {
      const res = await axios.get(
        `https://api.api-ninjas.com/v1/city?name=${name}`,
        {
          headers: {
            "X-Api-Key": "sycEOmug3GpUajiEHTFeUw==pSeXtHtQGiOYhBHS",
            "Content-Type": "application/json",
          },
        }
      );

      setCoordinates({ lat: res.data[0].latitude, lng: res.data[0].longitude });
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };
  const getLocationByIP = async () => {
    try {
      const response = await axios.get("https://api.db-ip.com/v2/free/self");
      getLocationByCityName(response.data.city);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      (error) => {
       getLocationByIP();
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFillteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    // dispatch(getWeatherData(coordinates.lat, coordinates.lng))
    // getPlacesData(bounds.sw, bounds.ne).then((data) => {
    //  console.log(data)
    //   setPlaces(data);
    // });
    // dispatch(getPlacesData(type,bounds.sw, bounds.ne))
    setFillteredPlaces([]);
  
  }, [type, coordinates, bounds, dispatch]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        spacing={3}
        style={{ width: "100%", marginTop: "50px", backgroundColor: "#f5f4f2" }}
      >
        <Grid item xs={12} md={4}>
          <List
            chidClicked={chidClicked}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            filteredPlaces={filteredPlaces}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildCliked={setChildCliked}
            filteredPlaces={filteredPlaces}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MapScreen;
