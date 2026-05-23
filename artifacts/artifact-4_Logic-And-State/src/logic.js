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
  let translateX = 0;
  let translateY = 0;

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;

  const markerPosition = {
    x: 54,
    y: 48
  };

  const mapStage = createMapStage();

  addAlarmStatus();
  addMapControls();
  const marker = addMapMarker();
  const popup = addMarkerPopup();

  alarmScreen.classList.add("alarm-is-ringing");
  ringSymbol?.classList.add("alarm-pulse");
  healthIcon?.classList.add("alarm-heartbeat");

  setupMapDragging();
  setupWheelZoom();

  whenImageReady(() => {
    centerOnMarker(false);
  });

  const distanceInterval = setInterval(() => {
    if (!alarmActive) return;

    distance = Math.max(40, distance - 10);

    if (distanceText) {
      distanceText.textContent = `${distance} m entfernt`;
    }

    marker.classList.add("marker-jump");

    setTimeout(() => {
      marker.classList.remove("marker-jump");
    }, 350);

    updatePopupText();

    if (distance <= 40) {
      clearInterval(distanceInterval);
    }
  }, 2500);

  dismissButton.addEventListener("click", () => {
    if (!alarmActive) return;

    const confirmed = window.confirm("Alarm wirklich ausschalten?");

    if (!confirmed) return;

    alarmActive = false;
    clearInterval(distanceInterval);

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

    updatePopupText();
  });

  marker.addEventListener("click", (event) => {
    event.stopPropagation();
    popup.classList.toggle("is-visible");
  });

  mapContainer.addEventListener("click", () => {
    popup.classList.remove("is-visible");
  });

  function createMapStage() {
    const stage = document.createElement("div");
    stage.className = "map-stage";

    mapContainer.insertBefore(stage, mapImage);
    stage.appendChild(mapImage);

    return stage;
  }

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

    const center = document.createElement("button");
    center.type = "button";
    center.textContent = "Standort anzeigen";
    center.setAttribute("aria-label", "Standort des Ringträgers anzeigen");

    const reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset";
    reset.setAttribute("aria-label", "Kartenansicht zurücksetzen");

    controls.append(zoomIn, zoomOut, center, reset);

    locationSection.insertBefore(controls, mapContainer);

    zoomIn.addEventListener("click", () => {
      zoomAtCenter(0.2);
    });

    zoomOut.addEventListener("click", () => {
      zoomAtCenter(-0.2);
    });

    center.addEventListener("click", () => {
      centerOnMarker(true);
    });

    reset.addEventListener("click", () => {
      zoom = 1;
      centerOnMarker(true);
    });
  }

  function addMapMarker() {
    const markerElement = document.createElement("button");
    markerElement.type = "button";
    markerElement.className = "ring-location-marker";
    markerElement.setAttribute("aria-label", "Standort des Ringträgers anzeigen");

    markerElement.style.left = `${markerPosition.x}%`;
    markerElement.style.top = `${markerPosition.y}%`;

    mapStage.appendChild(markerElement);

    return markerElement;
  }

  function addMarkerPopup() {
    const popupElement = document.createElement("div");
    popupElement.className = "map-popup";

    mapStage.appendChild(popupElement);

    popupElement.style.left = `${markerPosition.x}%`;
    popupElement.style.top = `${markerPosition.y}%`;

    updatePopupText(popupElement);

    return popupElement;
  }

  function updatePopupText(popupElement = popup) {
    if (!popupElement) return;

    popupElement.innerHTML = `
      <strong>Ringträger</strong>
      <span>${distance} m entfernt</span>
      <small>${alarmActive ? "Alarm aktiv" : "Alarm bestätigt"}</small>
    `;
  }

  function setupMapDragging() {
    mapContainer.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button")) return;

      isDragging = true;

      dragStartX = event.clientX;
      dragStartY = event.clientY;

      dragOriginX = translateX;
      dragOriginY = translateY;

      mapContainer.classList.add("is-dragging");
      mapContainer.setPointerCapture(event.pointerId);
    });

    mapContainer.addEventListener("pointermove", (event) => {
      if (!isDragging) return;

      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;

      translateX = dragOriginX + deltaX;
      translateY = dragOriginY + deltaY;

      updateMapTransform();
    });

    mapContainer.addEventListener("pointerup", (event) => {
      isDragging = false;
      mapContainer.classList.remove("is-dragging");

      if (mapContainer.hasPointerCapture(event.pointerId)) {
        mapContainer.releasePointerCapture(event.pointerId);
      }
    });

    mapContainer.addEventListener("pointercancel", () => {
      isDragging = false;
      mapContainer.classList.remove("is-dragging");
    });
  }

  function setupWheelZoom() {
    mapContainer.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();

        const direction = event.deltaY < 0 ? 0.12 : -0.12;
        zoomAtPoint(direction, event.clientX, event.clientY);
      },
      { passive: false }
    );
  }

  function zoomAtCenter(amount) {
    const rect = mapContainer.getBoundingClientRect();

    zoomAtPoint(
      amount,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  }

  function zoomAtPoint(amount, clientX, clientY) {
    const oldZoom = zoom;
    const newZoom = clamp(zoom + amount, 1, 2.2);

    if (newZoom === oldZoom) return;

    const rect = mapContainer.getBoundingClientRect();

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const mapX = (mouseX - translateX) / oldZoom;
    const mapY = (mouseY - translateY) / oldZoom;

    zoom = newZoom;

    translateX = mouseX - mapX * zoom;
    translateY = mouseY - mapY * zoom;

    updateMapTransform();
  }

  function centerOnMarker(animated) {
    const imageWidth = mapImage.clientWidth;
    const imageHeight = mapImage.clientHeight;

    if (!imageWidth || !imageHeight) return;

    const markerX = imageWidth * (markerPosition.x / 100);
    const markerY = imageHeight * (markerPosition.y / 100);

    translateX = mapContainer.clientWidth / 2 - markerX * zoom;
    translateY = mapContainer.clientHeight / 2 - markerY * zoom;

    if (animated) {
      mapStage.classList.add("is-animating");

      setTimeout(() => {
        mapStage.classList.remove("is-animating");
      }, 260);
    }

    updateMapTransform();
  }

  function updateMapTransform() {
    mapStage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom})`;
  }

  function whenImageReady(callback) {
    if (mapImage.complete) {
      callback();
      return;
    }

    mapImage.addEventListener("load", callback, { once: true });
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
});