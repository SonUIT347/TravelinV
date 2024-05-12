import axios from "axios";
import {
  SELECTED_WEATHER_FAIL,
  SELECTED_WEATHER_REQUEST,
  SELECTED_WEATHER_SUCCES,
} from "../actionType";

export const getWeatherData = (lat, lng) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_WEATHER_REQUEST,
    });
    
    if (lat && lng) {
      const { data } = await axios.get(
        `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`,
        {
          headers: {
            'X-RapidAPI-Key': '7b70af457cmshc4e3e842d2693fap138a21jsnc469163a2e5f',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
          },
        }
      );

      dispatch({
        type: SELECTED_WEATHER_SUCCES,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({ type: SELECTED_WEATHER_FAIL, payload: error });
  }
};
