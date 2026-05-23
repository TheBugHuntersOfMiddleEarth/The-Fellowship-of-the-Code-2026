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
  let movementInterval = null;
  let movementStarted = false;

  const startDistance = 250;

  const ringTargetPosition = {
    x: 54,
    y: 48
  };

  const myStartPosition = {
    x: 24,
    y: 74
  };

  const myPosition = {
    x: myStartPosition.x,
    y: myStartPosition.y
  };

  /*
    Der grüne Marker bewegt sich bis knapp neben den roten Marker.
    So bleibt bei 0 m Entfernung trotzdem sichtbar, dass es zwei Marker gibt.
  */
  const myEndPosition = {
    x: ringTargetPosition.x - 4,
    y: ringTargetPosition.y + 4
  };

  addAlarmStatus();
  addMapControls();
  addRingMarker();
  const myMarker = addMyMarker();
  centerMap();

  alarmScreen.classList.add("alarm-is-ringing");
  ringSymbol?.classList.add("alarm-pulse");
  healthIcon?.classList.add("alarm-heartbeat");

  dismissButton.addEventListener("click", () => {
    if (!alarmActive) return;

    const confirmed = window.confirm("Alarm wirklich ausschalten?");

    if (!confirmed) return;

    alarmActive = false;

    if (movementInterval) {
      clearInterval(movementInterval);
    }

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

    const moveToTarget = document.createElement("button");
    moveToTarget.type = "button";
    moveToTarget.className = "move-target-button";
    moveToTarget.textContent = "Zum Ziel bewegen";
    moveToTarget.setAttribute("aria-label", "Zum Standort des Ringträgers bewegen");

    controls.append(zoomIn, zoomOut, moveToTarget);

    locationSection.insertBefore(controls, mapContainer);

    zoomIn.addEventListener("click", () => {
      zoom = Math.min(1.8, zoom + 0.2);
      updateZoom();
    });

    zoomOut.addEventListener("click", () => {
      zoom = Math.max(1, zoom - 0.2);
      updateZoom();
    });

    moveToTarget.addEventListener("click", () => {
      startMovement(myMarker, moveToTarget);
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

  function startMovement(marker, button) {
    if (movementStarted || !alarmActive) return;

    movementStarted = true;
    button.disabled = true;
    button.textContent = "Bewegung läuft...";

    movementInterval = setInterval(() => {
      if (!alarmActive) return;

      distance = Math.max(0, distance - 25);

      const progress = 1 - distance / startDistance;

      myPosition.x =
        myStartPosition.x + (myEndPosition.x - myStartPosition.x) * progress;

      myPosition.y =
        myStartPosition.y + (myEndPosition.y - myStartPosition.y) * progress;

      marker.style.left = `${myPosition.x}%`;
      marker.style.top = `${myPosition.y}%`;

      if (distanceText) {
        distanceText.textContent = `${distance} m entfernt`;
      }

      marker.classList.add("marker-jump");

      setTimeout(() => {
        marker.classList.remove("marker-jump");
      }, 350);

      if (distance <= 0) {
        clearInterval(movementInterval);
        button.textContent = "Ziel erreicht";
      }
    }, 900);
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