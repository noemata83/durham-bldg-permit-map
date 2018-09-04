import L from 'leaflet';
import 'leaflet.heat';
import { updateMapMsg } from './Update';

const Map = (dispatch, data, map) => {
  if (!map) {
    const newMap = L.map('map');
    const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib ='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, {minZoom:11, maxZoom: 16, attribution: osmAttrib });
    newMap.setView(new L.LatLng(35.9940, -78.8986), 11);
    newMap.addLayer(osm);

    const markers = data.map(datum => [
      datum.geometry.y,
      datum.geometry.x,
      0.3,
    ]);

    const heat = L.heatLayer(markers, { radius: 10 }).addTo(newMap);
    dispatch(updateMapMsg(newMap, heat));
  }
}

export const RedrawMap = (dispatch, data, map, heat, total) => {
  const intensityFactor = 0.3 + (0.7 * ((total - data.length)/total));
  const markers = data.map(datum => [
    datum.geometry.y,
    datum.geometry.x,
    intensityFactor,
  ]);

  heat.setLatLngs(markers);
  dispatch(updateMapMsg(map, heat));
}

export default Map;