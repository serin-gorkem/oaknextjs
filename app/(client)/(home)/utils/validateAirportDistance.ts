// utils/validateAirportDistance.ts
export function validateAirportDistance(
  airportName: string,
  distanceKm: number,
  airportRadiusKm: Record<string, number>
): { valid: boolean; message?: string } {
  const maxKm = airportRadiusKm[airportName];
  if (!maxKm) return { valid: true };

  if (distanceKm > maxKm) {
    return {
      valid: false,
      message: `The distance (${distanceKm.toFixed(
        1
      )} km) exceeds the allowed ${maxKm} km from ${airportName}.`,
    };
  }
  return { valid: true };
}
