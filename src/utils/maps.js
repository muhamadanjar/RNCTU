export function getRegionFromCoordinates(points) {
    let minLat, maxLat, minLng, maxLng
  
    points.filter(point => point != null).forEach(point => {
      const lat = point.latitude
      const lng = point.longitude
      minLat = Math.min(minLat || lat, lat)
      maxLat = Math.max(maxLat || lat, lat)
      minLng = Math.min(minLng || lng, lng)
      maxLng = Math.max(maxLng || lng, lng)
    })
  
    const middleLat = (minLat + maxLat) / 2
    const middleLong = (minLng + maxLng) / 2
    const deltaLat = maxLat - minLat
    const deltaLong = maxLng - minLng
  
    return {
      latitude: middleLat,
      longitude: middleLong,
      latitudeDelta: Math.max(0.04, deltaLat * 1.35),
      longitudeDelta: Math.max(0.02, deltaLong * 1.35)
    }
}

export function isLocationEquals(mapLocation1, mapLocation2) {
    if (mapLocation1 == mapLocation2) {
      return true
    }
    if (mapLocation1 == null || mapLocation2 == null) {
      return false
    }
    return (
      mapLocation1.latitude == mapLocation2.latitude &&
      mapLocation1.longitude == mapLocation2.longitude
    )
}

export const urls = {
    distanceMatrix: (originLat, originLong, desLat, desLong) =>
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLong}&destinations=${desLat},${desLong}&key=${mapKey}`,
    mapDirection: (originLat, originLong, desLat, desLong) =>
      `https://maps.googleapis.com/maps/api/directions/json?origins=${originLat},${originLong}&destinations=${desLat},${desLong}&key=${mapKey}`
  }