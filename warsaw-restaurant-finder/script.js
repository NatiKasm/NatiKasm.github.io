let map;
let service;
let infowindow;
let markers = [];

function initMap() {
  const warsaw = { lat: 52.2297, lng: 21.0122 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: warsaw,
    zoom: 13,
  });
  infowindow = new google.maps.InfoWindow();
}

document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('restaurant-quiz');
  const quizResult = document.getElementById('quiz-result');
  const mapDiv = document.getElementById('map');
  if (!quizForm || !mapDiv) return;

  quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Get selected cuisine
    let cuisine = '';
    document.querySelectorAll('.quiz-question .chosen').forEach(btn => {
      if (btn.closest('.quiz-question').querySelector('p').textContent.includes('cuisine')) {
        cuisine = btn.textContent;
      }
    });
    if (!cuisine) {
      quizResult.innerHTML = "<p>Please select a cuisine above.</p>";
      quizResult.style.display = 'block';
      return;
    }

    // Search for restaurants
    const warsaw = { lat: 52.2297, lng: 21.0122 };
    const request = {
      location: warsaw,
      radius: '3500',
      type: ['restaurant'],
      keyword: cuisine,
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearMarkers();
        let html = '';
        results.slice(0, 5).forEach(place => {
          addMarker(place);
          html += `
            <div>
              <strong>${place.name}</strong><br>
              ${place.vicinity}<br>
              ${place.rating ? '⭐ ' + place.rating : ''}
              <hr>
            </div>
          `;
        });
        quizResult.innerHTML = html;
        quizResult.style.display = 'block';
      } else {
        quizResult.innerHTML = "<p>No restaurants found for that cuisine. Try another!</p>";
        quizResult.style.display = 'block';
      }
    });
  });

  // Highlight choices for all quiz buttons
  document.querySelectorAll('.quiz-question').forEach(function(q) {
    q.querySelectorAll('.choice').forEach(function(btn) {
      btn.addEventListener('click', function() {
        q.querySelectorAll('.choice').forEach(function(b) {
          b.classList.remove('chosen');
        });
        btn.classList.add('chosen');
      });
    });
  });
});

function addMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    title: place.name
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity}`);
    infowindow.open(map, this);
  });
}

function clearMarkers() {
  markers.forEach(m => m.setMap(null));
  markers = [];
}
