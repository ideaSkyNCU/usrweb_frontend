import L from "leaflet";
import "leaflet.heat";
import chroma from "chroma-js";

export async function initializeMapAndLocator(titleList) {
  const map = L.map("leaflet-map").setView([25.056057, 121.118849], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // Fetch pm2_5 values for each sensor
  const pm25Values = await Promise.all(
    titleList.map((item) => fetchPm25Value(item.number))
  );

  const heatmapLayers = []; // Store heatmap layers for updating data

  titleList.forEach((item, index) => {
    const popupContent = `<div>
      <a href="/#/instant/${item.id}/${item.name}/${item.number}">
        <b>${item.id}.${item.name}<br>(${item.number})</b>
      </a></div>`;

    const markerStyle = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background-color: #4572B6;
      border-radius: 50%;
      color: white;
      font-size: 12px;`;

    const customIcon = L.divIcon({
      className: "custom-icon",
      iconAnchor: [10, 10],
      html: `<span style="${markerStyle}">${item.id}</span>`,
    });

    const marker = L.marker(item.local, {
      title: item.name,
      icon: customIcon,
    }).addTo(map);

    const heatmapLayer = L.heatLayer([], {
      radius: 25,
      gradient: {
        0: getColorForPm25(pm25Values[index]),
      },
      useLocalExtrema: true,
    }).addTo(map);

    heatmapLayers.push(heatmapLayer);

    marker.bindPopup(popupContent);

    const intervalIds = [];
    const intervalId = setInterval(async () => {
      const updatedPm25Value = await fetchPm25Value(item.number);

      // Update the data directly when using Leaflet.heat
      heatmapLayer.setLatLngs([
        [item.local[0], item.local[1], parseFloat(updatedPm25Value)],
      ]);

      const updatedColor = getColorForPm25(updatedPm25Value);
      heatmapLayer.setOptions({ gradient: { 0: updatedColor } });
    }, 10000);
    intervalIds.push(intervalId);
  });

  return { map, pm25Values, heatmapLayers };
}

async function fetchPm25Value(sensorNumber) {
  try {
    const response = await fetch(`http://localhost:5000/`);
    const data = await response.json();

    const pm25Messages = data.filter(
      (message) =>
        message.topic ===
        `/v1/project/1147/device/${sensorNumber}/sensor/pm2_5/rawdata`
    );

    if (pm25Messages.length > 0) {
      const latestPayload = JSON.parse(
        pm25Messages[pm25Messages.length - 1].payload
      );
      const latestValue = latestPayload.value[0];
      return parseFloat(latestValue).toFixed(1);
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching pm2_5 value for sensor ${sensorNumber}:`,
      error
    );
    return null;
  }
}

function getColorForPm25(value) {
  // Customize the color scale based on your specific requirements
  return chroma
    .scale(["green", "yellow", "orange", "red", "purple", "darkred"])
    .domain([0, 15.5, 35.5, 54.5, 150.5, 250.5])(value)
    .hex();
}
