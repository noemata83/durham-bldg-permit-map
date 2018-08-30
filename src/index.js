import L from 'leaflet';
import 'leaflet.heat';
// L.heatLayer = heatLayer;

// console.log(leaflet);

async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}
const initMap = async () => {
  const rawData = await fetchData('./data/permits.json');
  const data = rawData.map(datum => ({
    ...datum,
    geometry: JSON.parse(datum.geometry.replace(/\'/g, '"'))
  }));

  const map = L.map('map');
  const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib ='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  const osm = new L.TileLayer(osmUrl, {minZoom:11, maxZoom: 16, attribution: osmAttrib });
  map.setView(new L.LatLng(35.9940, -78.8986), 11);
  map.addLayer(osm);

  const markers = data.map(datum => [
    datum.geometry.y,
    datum.geometry.x,
    0.3,
  ]);

  const heat = L.heatLayer(markers, { radius: 10 }).addTo(map);
}

initMap();





