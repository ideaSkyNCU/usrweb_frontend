import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default class HeatmapLayer {
  constructor(map) {
    this.map = map;
    this.heatmapLayer = L.heatLayer([], { radius: 25 }).addTo(map);
  }

  updateData(data) {
    const heatmapData = data.map((item) => {
      const { coordinates, value } = item;
      return [coordinates[1], coordinates[0], parseFloat(value)];
    });

    this.heatmapLayer.setLatLngs(heatmapData);
  }
}
