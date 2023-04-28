import axios from 'axios'

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const getLatLng = async (id) => {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${id}&key=${API_KEY}`)
  const resStatus = res.data.status;

  // Get the location
  const coordinates = res.data.results[0].geometry.location

  // Get searched address
  const addressComponents = res.data.results[0].address_components
  let cityObj = addressComponents.find(i => i.types[0] === "locality")

  if (cityObj === undefined) {
    cityObj = addressComponents.find(i => i.types[0] === "postal_town")
  }
  return [coordinates, cityObj, resStatus]

}

const getUser = async () => {
  const res = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`)

  // Get the location
  const coordinates = res.data.location

  return coordinates
}

const getAdress = async (lat, lng) => {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)

  const addressComponents = res.data.results[0].address_components
  const cityObj = addressComponents.find(i => i.types[0] === "postal_town")
  return cityObj.long_name
}

const exports = {
  getUser,
  getLatLng,
  getAdress,
}

export default exports