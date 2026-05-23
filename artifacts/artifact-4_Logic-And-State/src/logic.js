document.addEventListener("DOMContentLoaded", () => {
  const alarmScreen = document.querySelector(".ring-alarm-screen");
  const dismissButton = document.querySelector(".alarm-dismiss-button");
  const alarmNote = document.querySelector(".alarm-note");

  const locationSection = document.querySelector(".location-section");
  const mapContainer = document.querySelector("#map");
  const mapImage = document.querySelector(".map-image");
  const distanceText = document.querySelector(".location-header p");

  const ringSymbol = document.querySelector(".ring-symbol");
  const healthIcon = document.querySelector(".health-icon");
  const headerText = document.querySelector(".alarm-header-text");

  if (!alarmScreen || !dismissButton || !locationSection || !mapContainer || !mapImage) {
    return;
  }

  let alarmActive = true;
  let distance = 250;
  let zoom = 1;

  const ringTargetPosition = {
    x: 54,
    y: 48
  };

  const myPosition = {
    x: 24,
    y: 74
  };

  addAlarmStatus();
  addMapControls();
  addRingMarker();
  const myMarker = addMyMarker();
  centerMap();

  alarmScreen.classList.add("alarm-is-ringing");
  ringSymbol?.classList.add("alarm-pulse");
  healthIcon?.classList.add("alarm-heartbeat");

  const movementInterval = setInterval(() => {
    if (!alarmActive) return;

    moveMyMarkerTowardsRing(myMarker);

    distance = Math.max(40, distance - 12);

    if (distanceText) {
      distanceText.textContent = `${distance} m entfernt`;
    }

    myMarker.classList.add("marker-jump");

    setTimeout(() => {
      myMarker.classList.remove("marker-jump");
    }, 350);

    if (distance <= 40) {
      clearInterval(movementInterval);
    }
  }, 1800);

  dismissButton.addEventListener("click", () => {
    if (!alarmActive) return;

    const confirmed = window.confirm("Alarm wirklich ausschalten?");

    if (!confirmed) return;

    alarmActive = false;
    clearInterval(movementInterval);

    alarmScreen.classList.remove("alarm-is-ringing");
    alarmScreen.classList.add("alarm-is-dismissed");

    ringSymbol?.classList.remove("alarm-pulse");
    healthIcon?.classList.remove("alarm-heartbeat");

    dismissButton.textContent = "Alarm ausgeschaltet";
    dismissButton.disabled = true;

    const status = document.querySelector("#alarm-status");

    if (status) {
      status.textContent = "Alarm bestätigt";
    }

    if (alarmNote) {
      alarmNote.textContent =
        "Der Alarm wurde ausgeschaltet. Alle Gruppenmitglieder wurden informiert.";
    }
  });

  function addAlarmStatus() {
    if (!headerText) return;

    const status = document.createElement("p");
    status.id = "alarm-status";
    status.className = "alarm-status";
    status.textContent = "Alarm aktiv";

    headerText.appendChild(status);
  }

  function addMapControls() {
    const controls = document.createElement("div");
    controls.className = "map-controls";

    const zoomIn = document.createElement("button");
    zoomIn.type = "button";
    zoomIn.textContent = "+";
    zoomIn.setAttribute("aria-label", "Karte vergrößern");

    const zoomOut = document.createElement("button");
    zoomOut.type = "button";
    zoomOut.textContent = "−";
    zoomOut.setAttribute("aria-label", "Karte verkleinern");

    controls.append(zoomIn, zoomOut);

    locationSection.insertBefore(controls, mapContainer);

    zoomIn.addEventListener("click", () => {
      zoom = Math.min(1.8, zoom + 0.2);
      updateZoom();
    });

    zoomOut.addEventListener("click", () => {
      zoom = Math.max(1, zoom - 0.2);
      updateZoom();
    });
  }

  function addRingMarker() {
    const marker = document.createElement("div");
    marker.className = "ring-location-marker";
    marker.setAttribute("aria-label", "Standort des Ringträgers");

    marker.style.left = `${ringTargetPosition.x}%`;
    marker.style.top = `${ringTargetPosition.y}%`;

    mapContainer.appendChild(marker);
  }

  function addMyMarker() {
    const marker = document.createElement("div");
    marker.className = "my-location-marker";
    marker.setAttribute("aria-label", "Mein Standort");

    marker.style.left = `${myPosition.x}%`;
    marker.style.top = `${myPosition.y}%`;

    mapContainer.appendChild(marker);

    return marker;
  }

  function moveMyMarkerTowardsRing(marker) {
    const step = 0.12;

    myPosition.x += (ringTargetPosition.x - myPosition.x) * step;
    myPosition.y += (ringTargetPosition.y - myPosition.y) * step;

    marker.style.left = `${myPosition.x}%`;
    marker.style.top = `${myPosition.y}%`;
  }

  function updateZoom() {
    mapImage.style.transform = `scale(${zoom})`;
    mapImage.style.transformOrigin = "center center";

    centerMap();
  }

  function centerMap() {
    mapContainer.scrollTo({
      left: mapContainer.scrollWidth / 2 - mapContainer.clientWidth / 2,
      top: mapContainer.scrollHeight / 2 - mapContainer.clientHeight / 2,
      behavior: "smooth"
    });
  }
});