import axios from 'axios';

axios.defaults.baseURL = 'https://maps.googleapis.com/maps/api';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const getLatLng = async (address, ort) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&ort=${ort}&key=${API_KEY}`);

    const coordinates = response.data?.results[0]?.geometry?.location;
    
    return coordinates;
}

const getCity = async (coordinates) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${API_KEY}`);

    const cityInfoArr = response.data?.results[0]?.address_components.filter((component) => component.types.includes('locality')) || component.types.includes('postal_town');

    return cityInfoArr[0]?.long_name;
}


const responses = {
    getLatLng,
    getCity,
}


export default responses;
