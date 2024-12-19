import L from "leaflet";

// Default center for the map
export const center: [number, number] = [32.8407, -83.6324]; // Default: Macon, GA

export const zoom = 13;

export const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});
