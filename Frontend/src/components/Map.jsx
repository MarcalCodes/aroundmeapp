import {useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'
import {geocode, MAP_BOX_API_KEY} from "../utils/Mapbox.js";
import {Container, VisuallyHidden} from "@mantine/core";

// Mapbox CSS imports
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css"

/**
 * Copied from https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react
 */
export const Map = ({address}) => {
  const markerRef = useRef(null)
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)

  const showMap = MAP_BOX_API_KEY !== undefined
  const dontShowMap = !showMap

  useEffect(() => {
    if (dontShowMap) return // If no Mapbox API key configured, don't load the Map
    else {
      geocode(address.line1, address.city, address.state, address.postcode) // TODO: Move to the BE
        .then(position => {
          mapboxgl.accessToken = MAP_BOX_API_KEY
          mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [position.long, position.lat],
            zoom: 10
          });

          // See https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([position.long, position.lat])
            .addTo(mapRef.current)
        })
    }

    return () => {
      markerRef.current && markerRef.current.remove()
      mapRef.current && mapRef.current.remove()
    }
  }, [mapRef, markerRef])

  return (
    <>{
      // If no Mapbox API key configured, don't show the map
      showMap ? <>
          <Container w="100%" h={300} id='map-container' ref={mapContainerRef} mb={100}/>
          {
            /*
              Adding this here so that the 'mb' is correctly rendered in the pages where the page is used without elements below.
              The Mapbox Map element doesn't integrate well with Mantine which can lead to ugly page without this hidden element and the 'mb'
            */
          }
          <VisuallyHidden/>
        </>
        : null
    }
    </>
  )
}