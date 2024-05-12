import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";
const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const classes = useStyles();
  return (
    <Card elevation={6} className={classes.cardContainer}>
      <CardMedia
      className={classes.cardImage}
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" className={classes.headerText}>
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} className={classes.iconRating} readOnly />
          <Typography gutterBottom variant="subtitle1" className={classes.reviewText}>
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" className={classes.titleText}>Price</Typography>
          <Typography gutterBottom variant="subtitle1" className={classes.normalText}>
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1"className={classes.titleText}>Ranking</Typography>
          <Typography gutterBottom variant="subtitle1" className={classes.normalText}>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon className={classes.iconImg}/>
            {/* <img  className={classes.iconImg} src={locationIcon} alt={""} /> */}
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon className={classes.iconImg}/> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.buttonGroup}>
        <div>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
          className={classes.buttonText}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
          className={classes.buttonText}
        >
          Website
        </Button> </div>
        
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
          className={classes.buttonGoTo}
        >
          Go to Blog
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
