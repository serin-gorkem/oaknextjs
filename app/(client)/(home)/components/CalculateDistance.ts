// utils/CalculateDistance.ts
export async function getDrivingDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<{ distanceKm: number; durationMin: number } | null> {
  if (!window.google) return null;

  const directionsService = new google.maps.DirectionsService();

  return new Promise((resolve) => {
    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes.length) {
          const route = result.routes[0].legs[0];
          resolve({
            distanceKm: route.distance?.value! / 1000, // meters → km
            durationMin: route.duration?.value! / 60, // seconds → minutes
          });
        } else {
          resolve(null);
        }
      }
    );
  });
}
