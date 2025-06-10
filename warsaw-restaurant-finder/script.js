// Leaflet map initialization
var map = L.map('map').setView([52.2297, 21.0122], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Custom icon (use your own icon URL if you want)
var restaurantIcon = L.icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

// Fetch restaurants and add markers
fetch('restaurants.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(restaurant => {
      L.marker([restaurant.lat, restaurant.lng], {icon: restaurantIcon})
        .addTo(map)
        .bindPopup(`<b>${restaurant.name}</b><br>${restaurant.description}`);
    });
  })
  .catch(error => {
    console.error('Could not load restaurant data:', error);
  });
