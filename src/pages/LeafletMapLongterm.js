import L from "leaflet";

export function initializeMapAndLocator(titleList) {
  const map = L.map("leaflet-map").setView([25.056057, 121.118849], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  titleList.forEach((item) => {
    const popupContent = `<div>
      <a href="/#/longterm/${item.id}/${item.name}/${item.number}">
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
      html: `<span style="${markerStyle}">${item.id}</span>`,
    });

    L.marker(item.local, {
      title: item.name,
      icon: customIcon,
    })
      .addTo(map)
      .bindPopup(popupContent);
  });
}
