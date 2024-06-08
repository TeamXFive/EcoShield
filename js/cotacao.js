const areaCost = 50; // R$ por km²
const droneCost = 1000; // R$ por drone
const discountRate = 0.0125; // 1.25% de desconto por mês adicional

function calculateCost() {
  const area = parseInt(document.getElementById("areaSlider").value);
  const drones = parseInt(document.getElementById("droneSlider").value);
  const duration = parseInt(document.getElementById("durationSlider").value);
  let dataCost = 0;

  document
    .querySelectorAll(".dataCheckbox:checked")
    .forEach(function (checkbox) {
      dataCost += parseInt(checkbox.value);
    });

  let totalCost = area * areaCost + drones * droneCost + dataCost;
  const discount = totalCost * discountRate * (duration - 1);
  totalCost -= discount;

  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
}

document.getElementById("areaSlider").addEventListener("input", function () {
  document.getElementById("areaValue").textContent = this.value;
  calculateCost();
});

document.getElementById("droneSlider").addEventListener("input", function () {
  document.getElementById("droneValue").textContent = this.value;
  calculateCost();
});

document.querySelectorAll(".dataCheckbox").forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    calculateCost();
  });
});

document
  .getElementById("durationSlider")
  .addEventListener("input", function () {
    document.getElementById("durationValue").textContent = this.value;
    calculateCost();
  });

document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([-23.5505, -46.6333], 13); // São Paulo coordinates

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let marker;
  let circle;

  map.on("click", function (e) {
    const radius = parseInt(document.getElementById("areaSlider").value) * 100; // Convert km² to meters

    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }

    if (circle) {
      map.removeLayer(circle);
    }

    circle = L.circle(e.latlng, {
      color: "#0a1769",
      fillColor: "#218bed",
      fillOpacity: 0.5,
      radius: radius,
    }).addTo(map);
  });

  document.getElementById("areaSlider").addEventListener("input", function () {
    if (circle && marker) {
      const radius = parseInt(this.value) * 100; // Convert km² to meters
      circle.setRadius(radius);
    }
  });

  calculateCost();
});
