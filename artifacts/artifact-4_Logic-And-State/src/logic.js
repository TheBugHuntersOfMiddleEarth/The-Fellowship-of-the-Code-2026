document.addEventListener("DOMContentLoaded", () => {
  const alarmScreen = document.querySelector(".ring-alarm-screen");
  const dismissButton = document.querySelector(".alarm-dismiss-button");
  const alarmNote = document.querySelector(".alarm-note");
  const mapContainer = document.querySelector("#map");
  const ringSymbol = document.querySelector(".ring-symbol");
  const healthIcon = document.querySelector(".health-icon");

  if (!alarmScreen || !dismissButton || !mapContainer) return;

  let alarmActive = true;

  addStatusText();
  addMapMarker();
  addCenterButton();

  alarmScreen.classList.add("alarm-is-active");
  ringSymbol?.classList.add("alarm-pulse");
  healthIcon?.classList.add("alarm-heartbeat");

  dismissButton.addEventListener("click", () => {
    if (!alarmActive) return;

    const confirmed = window.confirm("Alarm wirklich ausschalten?");

    if (!confirmed) return;

    alarmActive = false;

    alarmScreen.classList.remove("alarm-is-active");
    alarmScreen.classList.add("alarm-is-dismissed");

    ringSymbol?.classList.remove("alarm-pulse");
    healthIcon?.classList.remove("alarm-heartbeat");

    dismissButton.textContent = "Alarm ausgeschaltet";
    dismissButton.disabled = true;

    const statusText = document.querySelector("#alarm-status");
    if (statusText) {
      statusText.textContent = "Alarm bestätigt";
    }

    if (alarmNote) {
      alarmNote.textContent =
        "Der Alarm wurde ausgeschaltet. Alle Gruppenmitglieder wurden informiert.";
    }
  });

  function addStatusText() {
    const status = document.createElement("p");
    status.id = "alarm-status";
    status.className = "alarm-status";
    status.textContent = "Alarm aktiv";

    const header = document.querySelector(".alarm-header-text");
    header?.appendChild(status);
  }

  function addMapMarker() {
    const marker = document.createElement("div");
    marker.className = "ring-location-marker";
    marker.setAttribute("aria-label", "Standort des Ringträgers");

    mapContainer.appendChild(marker);
  }

  function addCenterButton() {
    const centerButton = document.createElement("button");
    centerButton.type = "button";
    centerButton.className = "map-center-button";
    centerButton.textContent = "Standort anzeigen";

    mapContainer.appendChild(centerButton);

    centerButton.addEventListener("click", () => {
      mapContainer.scrollTo({
        left: mapContainer.scrollWidth / 2 - mapContainer.clientWidth / 2,
        top: mapContainer.scrollHeight / 2 - mapContainer.clientHeight / 2,
        behavior: "smooth"
      });
    });
  }
});