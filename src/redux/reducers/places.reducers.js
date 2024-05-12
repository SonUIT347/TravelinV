import {
  SELECTED_PLACES_FAIL,
  SELECTED_PLACES_REQUEST,
  SELECTED_PLACES_SUCCES,
} from "../actionType";

export const placesReducers = (
  state = { loading: true, placesData: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_PLACES_SUCCES:
      return {
        ...state,
        loading: false,
        placesData: payload,
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
