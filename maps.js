// Interactive map using Leaflet
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");
    if (!mapContainer || typeof L === "undefined") return;

    // Florida, Johannesburg (approx) - matches the iframe location
    const latitude = -26.18209;
    const longitude = 27.9183;

    const map = L.map("map").setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup("Majita Care NPO<br/>7A 8th Ave, Florida, Johannesburg").openPopup();
    // Bounce the pin briefly for emphasis
    if (marker && marker._icon) {
      marker._icon.classList.add("pin-bounce");
      setTimeout(() => marker._icon.classList.remove("pin-bounce"), 3000);
    }

    // Add small location control
    const locate = L.control({ position: "topright" });
    locate.onAdd = function () {
      const btn = L.DomUtil.create("button", "leaflet-bar");
      btn.title = "Locate me";
      btn.style.padding = "6px 10px";
      btn.innerHTML = "📍";
      btn.onclick = function () {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          map.setView([lat, lng], 15);
          L.circleMarker([lat, lng], { color: "#1976d2" }).addTo(map);
        });
      };
      return btn;
    };
    locate.addTo(map);
  });
})();


