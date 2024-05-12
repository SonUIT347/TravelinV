import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOutlinedIcon from "@material-ui/icons/LocalActivityOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import mapStyles from "../mapStyles";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  setChildCliked,
  filteredPlaces,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const placesData = useSelector((state) => state.places.placesData);
  const places = filteredPlaces.length ? filteredPlaces : placesData;
  const center = { lat: 48.8584, lng: 2.2945 };
  const [directions, setDirections] = useState(null);
  const directionsCallback = (response) => {
    if (response !== null) {
      // Hiển thị đường đi
      setDirections(response);
    }
  };
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCp_HBLfN1xGHzWgygRVCqvdhgm7qGv2lQ" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildCliked(child);
        }}
      >
        <div
          style={{ backgroundColor: "red" }}
          lat={coordinates.latitude}
          lng={coordinates.longitude}
        >
          hsdhvshvfsdfdsg
        </div>
        {/* <AnyReactComponent 
          lat={coordinates.lat} 
          lng={coordinates.lng} 
          text={'Kreyser Avrora'} 
        /> */}
        {/* <DirectionsService
        options={{
          destination: { lat: 37.7749, lng: -122.4194 }, // Điểm đến
          origin:{ lat: 37.7749, lng: -122.5194 },      // Điểm xuất phát
          travelMode: 'DRIVING',     // Phương tiện di chuyển
        }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} /> */}
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude && Number(place.latitude)}
            lng={place.longitude && Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {" "}
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://gluttodigest.com/wp-content/uploads/2021/01/vietnam-vietnamese-food-terms.jpg"
                  }
                  alt={place.name}
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                  className={classes.rating}
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
