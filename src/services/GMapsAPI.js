import axios from 'axios';

axios.defaults.baseURL = 'https://maps.googleapis.com/maps/api';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const getLatLng = async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);

    const coordinates = response.data?.results[0]?.geometry?.location;

    return coordinates;
}

const getDetails = async (place) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&key=${API_KEY}`);

    const details = response.data.result;
    console.log(details);
    return details;
}

const getPlaces = async () => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`);

    const places = response.data.results;
    console.log(places);    
    return places;
}

const getLocationWithLatLng = async (lat, lng) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);

    return response.data;
}

const responses = {
    getLatLng,
    getDetails,
    getPlaces,
    getLocationWithLatLng,
}


export default responses