// --- Warsaw Restaurant Finder with Google Places API Integration ---

let map;
let service;
let infowindow;
let markers = [];

document.addEventListener('DOMContentLoaded', function() {
  // Questionnaire elements
  const form = document.getElementById('questionnaire');
  const resultsSection = document.getElementById('results');
  const restaurantList = document.getElementById('restaurant-list');
  const mapDiv = document.getElementById('map');
  const startOverBtn = document.getElementById('start-over');

  // Init Google Map for Warsaw
  const warsaw = { lat: 52.2297, lng: 21.0122 };
  map = new google.maps.Map(mapDiv, {
    center: warsaw,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false
  });
  infowindow = new google.maps.InfoWindow();

  // On submit, fetch and filter Places
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const craving = form.elements['craving'].value;
    const price = Number(form.elements['price'].value);
    const dine = form.elements['dine'].value;

    // Places Search Request
    const request = {
      location: warsaw,
      radius: 3500,
      type: dine === "either" ? ["restaurant"] : [dine],
      keyword: craving // e.g. "sushi", "pizza", etc.
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Filter by price_level if possible
        let filtered = results.filter(place =>
          place.price_level !== undefined && place.price_level === price
        );
        // If too few, relax the price filter
        if (filtered.length < 4) {
          filtered = results;
        }
        // Show only up to 4
        filtered = filtered.slice(0, 4);

        // Show results
        displayRestaurants(filtered);
        showMap(filtered);

        // Hide form, show results
        form.classList.add('hidden');
        resultsSection.classList.remove('hidden');
      } else {
        restaurantList.innerHTML = "<p>Sorry, couldn't find any matching restaurants right now. Try again or change your criteria!</p>";
        form.classList.add('hidden');
        resultsSection.classList.remove('hidden');
      }
    });
  });

  // Start Over Button
  startOverBtn.addEventListener('click', function() {
    resultsSection.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
    clearMarkers();
    map.setCenter({ lat: 52.2297, lng: 21.0122 });
    map.setZoom(13);
  });

  // Utility to display restaurant cards
  function displayRestaurants(places) {
    restaurantList.innerHTML = "";
    if (!places.length) {
      restaurantList.innerHTML = "<p>No matches found. Try again!</p>";
      return;
    }
    places.forEach(place => {
      const photoUrl = place.photos && place.photos.length
        ? place.photos[0].getUrl({ maxWidth: 300, maxHeight: 300 })
        : "https://via.placeholder.com/120?text=No+Image";
      const card = document.createElement('div');
      card.className = 'restaurant-card';
      card.innerHTML = `
        <img class="restaurant-image" src="${photoUrl}" alt="${place.name} photo">
        <div class="restaurant-info">
          <h4>${place.name}</h4>
          <div class="restaurant-meta">
            ${place.types ? capitalize(place.types[0]) : ""} 
            ${place.price_level ? " | " + "$".repeat(place.price_level) : ""} 
            ${place.rating ? " | ⭐ " + place.rating : ""}
          </div>
          <div>${place.vicinity || ""}</div>
        </div>
      `;
      restaurantList.appendChild(card);
    });
  }

  // Utility to display map markers
  function showMap(places) {
    clearMarkers();
    let bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name
      });
      markers.push(marker);
      const info = new google.maps.InfoWindow({
        content: `<b>${place.name}</b><br>${place.vicinity || ""}${place.rating ? "<br>⭐ " + place.rating : ""}`
      });
      marker.addListener('click', () => {
        info.open(map, marker);
      });
      bounds.extend(marker.getPosition());
    });
    if (places.length) {
      map.fitBounds(bounds);
    }
  }

  function clearMarkers() {
    markers.forEach(m => m.setMap(null));
    markers = [];
  }

  // Utility
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
});
