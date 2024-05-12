import { SELECTED_PLACES_FAIL, SELECTED_PLACES_SUCCES, SELECTED_WEATHER_REQUEST } from "../actionType";

  
  export const weatherReducers = (
    state = { loading: true, weatherData: [] },
    action
  ) => {
    const { type, payload } = action;
    switch (type) {
      case SELECTED_WEATHER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SELECTED_PLACES_SUCCES:
        return {
          ...state,
          loading: false,
          weatherData: payload,
        };
      case SELECTED_PLACES_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  };
  