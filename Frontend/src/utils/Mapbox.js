// https://vite.dev/guide/env-and-mode
export const MAP_BOX_API_KEY = import.meta.env.VITE_MAPBOX_KEY

/**
 * Geocodes an address using Mapbox geocoding API: https://docs.mapbox.com/api/search/geocoding/#forward-geocoding-with-structured-input
 */
export const geocode = async (line1, city, state, postcode) => {
  const encodedAddress =
    `address_line1=${encodeURIComponent(line1)}&locality=${encodeURIComponent(city)}&region=${encodeURIComponent(state)}&postcode=${encodeURIComponent(postcode)}&country=AU`

  // See https://docs.mapbox.com/api/search/geocoding/#geocoding-response-object
  const extractLatLong = (features) => {
    const coordinates = features[0].geometry.coordinates
    return {long: coordinates[0], lat: coordinates[1]}
  }

  return fetch(`https://api.mapbox.com/search/geocode/v6/forward?${encodedAddress}&access_token=${MAP_BOX_API_KEY}`)
    .then(response => response.json())
    .then(json => json.features ? extractLatLong(json.features) : null)
}