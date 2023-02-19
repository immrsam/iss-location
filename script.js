const displayName = document.querySelector("#name");
const displayLat = document.querySelector("#latitude");
const displayLon = document.querySelector("#longitude");

const issMap = L.map("issMap").setView([0, 0], 2.5);
const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreenMap.org/copyright</a>`;
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(issMap);

const url = "https://api.wheretheiss.at/v1/satellites/25544";

const issIcon = L.icon({
  iconUrl: "International_Space_Station.svg",
  // shadowUrl: "noun-iss-2405810.svg",

  iconSize: [100, 100], // size of the icon
  // shadowSize: [50, 64], // size of the shadow
  // iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
  // shadowAnchor: [0, 0], // the same for the shadow
  // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(issMap);

async function getData() {
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.error(e);
    });
}

async function displayData() {
  const data = await getData();

  const {
    altitude,
    daynum,
    footprint,
    id,
    latitude,
    longitude,
    name,
    solar_lat,
    solar_lon,
    timestamp,
    units,
    velocity,
    visibility,
  } = data;

  const lat = latitude.toFixed(2);
  const lon = longitude.toFixed(2);

  marker.setLatLng([lat, lon]);
  issMap.panTo([lat, lon], { duration: 0.25 });

  displayLat.textContent = lat;
  displayLon.textContent = lon;
}

displayData();

setInterval(() => {
  displayData();
}, 5000);
