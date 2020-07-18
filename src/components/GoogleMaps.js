import React, { useState } from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Axios from "axios";

console.log(process.env["REACT_APP_GOOGLE_MAPS_KEY"])

export const GoogleMapsComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env["REACT_APP_GOOGLE_MAPS_KEY"]}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [markers, setMarkers] = useState([]);


  props.addresses.forEach((addr) => {
    Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: addr,
        key: process.env.REACT_APP_GOOGLE_MAPS_KEY
      }
    }).then((resp) => {
      const coordinates = resp.data.results[0].geometry.location
      setMarkers(
      [...markers, <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />])
      console.log(markers)
    })
  })

  

  return (<GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 47.6487172, lng: -122.385203 }}
  >
    {props.isMarkerShown && markers }


  </GoogleMap>)
}
);

