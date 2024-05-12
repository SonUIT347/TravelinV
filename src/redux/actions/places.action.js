import axios from "axios";
import { SELECTED_PLACES_FAIL, SELECTED_PLACES_REQUEST, SELECTED_PLACES_SUCCES } from "../actionType";

export const getPlacesData = (type,sw,ne) =>  async (dispatch) =>{
    try {
        dispatch({
            type: SELECTED_PLACES_REQUEST
        })
        const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
        const options = {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            },
            headers: {
                'X-RapidAPI-Key': '652be5efc4msh1aaaf14c91e415dp1da0e0jsnb8be6524e3d2',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          };
        const {data: {data}} = await axios.get(URL, options)
        dispatch({
            type: SELECTED_PLACES_SUCCES,
            payload: data.filter((place)=> place.name && place.num_reviews > 0)
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: SELECTED_PLACES_FAIL,
            payload: error
        })
        
    }
}