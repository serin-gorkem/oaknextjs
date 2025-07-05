/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import {
  GoogleMap,
  Marker,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const MapComponent = ({
  positions,
  center,
}: {
  positions: any;
  center: any;
}) => {
  const [response, setResponse] = useState(null);
  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };
  const directionsCallback = useCallback((res: any) => {
    if (res !== null) {
      if (res.status === "OK") {
        setResponse(res);
        console.log("Süre:", res.routes[0].legs[0].duration.text);
        console.log("Mesafe:", res.routes[0].legs[0].distance.text);
      } else {
        console.error("HATA:", res);
      }
    }
  }, []);
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={center}
        zoom={7}
        options={{
          mapId: "b004964ef53350d0",
          disableDefaultUI: true,
        }}
      >
        {!response && (
          <DirectionsService
            options={{
              destination: positions[1],
              origin: positions[0],
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={directionsCallback}
          />
        )}

        {response && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
        {/* {positions.map((pos: { lat: number; lng: number }, index: number) => (
          <Marker key={index} position={pos} />
        ))}
        <Polyline path={positions} options={polylineOptions} /> */}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
