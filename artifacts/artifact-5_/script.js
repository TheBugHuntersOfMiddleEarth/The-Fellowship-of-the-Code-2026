// Trage hier deinen echten OpenWeather API Key ein.
const OPEN_WEATHER_API_KEY = "DEIN_OPENWEATHER_API_KEY";

const STORAGE_KEY_INVENTORY = "inventar-interface-bestand-v1";
const STORAGE_KEY_PARAMETERS = "inventar-interface-parameter-v1";

const BASE_WATER_PER_PERSON = 3; // 3 Liter Wasser pro Gefährte und Tag
const BASE_FOOD_PER_PERSON = 2;  // 2 Rationen Nahrung pro Gefährte und Tag

// Herr-der-Ringe-Orte werden mit realen Wetterorten verknüpft.
// Die Koordinaten werden direkt für die OpenWeather API verwendet.
const middleEarthLocations = {
  shire: {
    label: "Auenland / Hobbingen",
    realPlace: "Matamata / Hobbiton, Neuseeland",
    lat: -37.8721,
    lon: 175.6829
  },
  rivendell: {
    label: "Bruchtal",
    realPlace: "Kaitoke Regional Park, Wellington, Neuseeland",
    lat: -41.0833,
    lon: 175.1667
  },
  mordor: {
    label: "Mordor / Schicksalsberg",
    realPlace: "Tongariro National Park, Neuseeland",
    lat: -39.1568,
    lon: 175.6321
  },
  rohan: {
    label: "Rohan / Edoras",
    realPlace: "Mount Sunday, Canterbury, Neuseeland",
    lat: -43.5309,
    lon: 170.8992
  },
  isengard: {
    label: "Isengard",
    realPlace: "Harcourt Park, Upper Hutt, Neuseeland",
    lat: -41.1256,
    lon: 175.0702
  }
};

const defaultInventory = [
  { id: "water", label: "Wasser", icon: "💧", amount: 30, unit: "L", type: "item" },
  { id: "food", label: "Nahrung", icon: "🍞", amount: 45, unit: "R", type: "item" },
  { id: "weapons", label: "Waffen", icon: "⚔️", type: "group" },
  { id: "bows", label: "Bögen", icon: "", amount: 3, unit: "St.", type: "child" },
  { id: "swords", label: "Schwerter", icon: "", amount: 9, unit: "St.", type: "child" },
  { id: "armor", label: "Rüstung", icon: "🛡️", amount: 7, unit: "St.", type: "item" },
  { id: "misc", label: "Sonstige Ausrüstung", icon: "🎒", type: "group" },
  { id: "torches", label: "Fackeln", icon: "", amount: 8, unit: "St.", type: "child" },
  { id: "coats", label: "Mäntel", icon: "", amount: 4, unit: "St.", type: "child" },
  { id: "medical", label: "Medizinische Ausrüstung", icon: "💼", type: "group" },
  { id: "bandages", label: "Verbände", icon: "", amount: 5, unit: "St.", type: "child" },
  { id: "herbs", label: "Heilkräuter", icon: "", amount: 7, unit: "St.", type: "child" }
];

let inventory = loadInventory();

let weatherState = {
  text: "Noch nicht abgerufen",
  realPlace: "Noch nicht ausgewählt",
  main: "Normal",
  waterFactor: 1,
  foodFactor: 1,
  demandText: "normaler Wasser- und Nahrungsbedarf",
  waterConsumption: 0,
  foodConsumption: 0
};

const inventoryRows = document.querySelector("#inventoryRows");
const locationInput = document.querySelector("#locationInput");
const groupSizeInput = document.querySelector("#groupSizeInput");
const saveParametersButton = document.querySelector("#saveParametersButton");
const saveInventoryButton = document.querySelector("#saveInventoryButton");
const parameterHint = document.querySelector("#parameterHint");
const saveHint = document.querySelector("#saveHint");
const weatherText = document.querySelector("#weatherText");
const realPlaceText = document.querySelector("#realPlaceText");
const factorText = document.querySelector("#factorText");
const waterConsumptionText = document.querySelector("#waterConsumptionText");
const foodConsumptionText = document.querySelector("#foodConsumptionText");
const statusBox = document.querySelector("#statusBox");
const statusText = document.querySelector("#statusText");

loadParameters();
renderInventory();
calculateAndRenderConsumption();
updateStatus();

saveParametersButton.addEventListener("click", handleSaveParameters);
saveInventoryButton.addEventListener("click", handleSaveInventory);

groupSizeInput.addEventListener("input", () => {
  calculateAndRenderConsumption();
  updateStatus();
});

locationInput.addEventListener("change", () => {
  const selectedLocation = middleEarthLocations[locationInput.value];

  if (selectedLocation) {
    realPlaceText.textContent = selectedLocation.realPlace;
  } else {
    realPlaceText.textContent = "Noch nicht ausgewählt";
  }
});

async function handleSaveParameters() {
  const locationKey = locationInput.value;
  const selectedLocation = middleEarthLocations[locationKey];
  const groupSize = Number(groupSizeInput.value);

  if (!selectedLocation || !Number.isInteger(groupSize) || groupSize < 1) {
    parameterHint.textContent = "Bitte Ort auswählen und eine gültige Gruppengröße eingeben.";
    return;
  }

  saveParametersToStorage(locationKey, groupSize);
  parameterHint.textContent = "Wetter wird über OpenWeather abgerufen ...";

  try {
    const weatherData = await fetchWeather(selectedLocation);

    weatherState = buildWeatherState(weatherData);

    calculateAndRenderConsumption();
    updateStatus();

    parameterHint.textContent =
      `Parameter gespeichert. Wetterdaten für ${selectedLocation.label} wurden geladen.`;
  } catch (error) {
    console.error(error);
    parameterHint.textContent = error.message;
  }
}

function handleSaveInventory() {
  localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
  saveHint.textContent = "Bestand wurde im Browser gespeichert.";

  window.setTimeout(() => {
    saveHint.textContent = "";
  }, 2500);
}

function renderInventory() {
  inventoryRows.innerHTML = "";

  inventory.forEach((entry) => {
    const row = document.createElement("div");
    row.className = `table-row ${entry.type === "group" ? "group-row" : ""}`;
    row.setAttribute("role", "row");

    const nameCell = document.createElement("div");
    nameCell.className = `item-name ${entry.type === "child" ? "child" : ""}`;
    nameCell.setAttribute("role", "cell");

    nameCell.innerHTML =
      `${entry.icon ? `<span aria-hidden="true">${entry.icon}</span>` : ""}<span>${entry.label}</span>`;

    const stockCell = document.createElement("div");
    stockCell.className = "stock-cell";
    stockCell.setAttribute("role", "cell");

    const actionsCell = document.createElement("div");
    actionsCell.className = "actions-cell";
    actionsCell.setAttribute("role", "cell");

    if (entry.type === "group") {
      stockCell.textContent = "";
      actionsCell.textContent = "";
    } else {
      stockCell.innerHTML =
        `<span id="stock-${entry.id}">${formatNumber(entry.amount)}</span> <span>${entry.unit}</span>`;

      const minusButton = createActionButton(
        "−",
        `Bestand von ${entry.label} verringern`,
        () => changeAmount(entry.id, -1)
      );

      const plusButton = createActionButton(
        "+",
        `Bestand von ${entry.label} erhöhen`,
        () => changeAmount(entry.id, 1)
      );

      actionsCell.append(minusButton, plusButton);
    }

    row.append(nameCell, stockCell, actionsCell);
    inventoryRows.appendChild(row);
  });
}

function createActionButton(label, ariaLabel, onClick) {
  const button = document.createElement("button");

  button.className = "action-button";
  button.type = "button";
  button.textContent = label;
  button.setAttribute("aria-label", ariaLabel);
  button.addEventListener("click", onClick);

  return button;
}

function changeAmount(id, step) {
  const item = inventory.find((entry) => entry.id === id);

  if (!item || item.type === "group") {
    return;
  }

  item.amount = Math.max(0, item.amount + step);

  document.querySelector(`#stock-${id}`).textContent = formatNumber(item.amount);

  saveHint.textContent = "Änderung noch nicht gespeichert.";

  updateStatus();
}

async function fetchWeather(selectedLocation) {
  if (!apiKeyIsConfigured()) {
    return {
      fantasyPlace: selectedLocation.label,
      realPlace: `${selectedLocation.realPlace} Demo-Modus, kein API-Key eingetragen`,
      main: "Clear",
      description: "sonnig"
    };
  }

  const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${selectedLocation.lat}` +
    `&lon=${selectedLocation.lon}` +
    `&appid=${OPEN_WEATHER_API_KEY}` +
    `&units=metric` +
    `&lang=de`;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Die Wetterdaten konnten nicht geladen werden. Bitte prüfe deinen OpenWeather API-Key.");
  }

  const weatherData = await weatherResponse.json();
  const condition = weatherData.weather?.[0];

  return {
    fantasyPlace: selectedLocation.label,
    realPlace: selectedLocation.realPlace,
    main: condition?.main || "Normal",
    description: condition?.description || "normales Wetter"
  };
}

function buildWeatherState(weatherData) {
  const main = weatherData.main.toLowerCase();
  const description = weatherData.description.toLowerCase();

  let waterFactor = 1;
  let foodFactor = 1;
  let typeLabel = "Normales Wetter";
  let demandText = "normaler Wasser- und Nahrungsbedarf";

  const isSunny =
    main.includes("clear") ||
    description.includes("sonn");

  const isRainSnowOrThunderstorm =
    main.includes("rain") ||
    main.includes("drizzle") ||
    main.includes("snow") ||
    main.includes("thunderstorm") ||
    description.includes("regen") ||
    description.includes("niesel") ||
    description.includes("schnee") ||
    description.includes("gewitter");

  if (isSunny) {
    waterFactor = 2;
    foodFactor = 1;
    typeLabel = "Sonnig";
    demandText = "erhöhter Wasserbedarf";
  } else if (isRainSnowOrThunderstorm) {
    waterFactor = 1;
    foodFactor = 1.5;
    typeLabel = "Regen / Schnee / Gewitter";
    demandText = "erhöhter Nahrungsbedarf";
  }

  return {
    text: `${typeLabel}: ${capitalize(weatherData.description)}`,
    realPlace: weatherData.realPlace,
    main: weatherData.main,
    waterFactor,
    foodFactor,
    demandText,
    waterConsumption: 0,
    foodConsumption: 0
  };
}

function calculateAndRenderConsumption() {
  const groupSize = Number(groupSizeInput.value) || 0;

  const baseWater = groupSize * BASE_WATER_PER_PERSON;
  const baseFood = groupSize * BASE_FOOD_PER_PERSON;

  weatherState.waterConsumption =
    roundToOneDecimal(baseWater * weatherState.waterFactor);

  weatherState.foodConsumption =
    roundToOneDecimal(baseFood * weatherState.foodFactor);

  weatherText.textContent = weatherState.text;
  realPlaceText.textContent = weatherState.realPlace;
  factorText.textContent = weatherState.demandText;

  waterConsumptionText.textContent =
    `${formatNumber(weatherState.waterConsumption)} L`;

  foodConsumptionText.textContent =
    `${formatNumber(weatherState.foodConsumption)} R`;
}

function updateStatus() {
  const currentWaterStock =
    inventory.find((entry) => entry.id === "water")?.amount ?? 0;

  const currentFoodStock =
    inventory.find((entry) => entry.id === "food")?.amount ?? 0;

  const requiredWaterForOneDay = weatherState.waterConsumption;
  const requiredFoodForOneDay = weatherState.foodConsumption;

  const groupSize = Number(groupSizeInput.value) || 0;

  statusBox.classList.remove("ok", "warning", "neutral");

  if (groupSize < 1) {
    statusBox.classList.add("neutral");
    statusText.textContent =
      "Bitte Gruppengröße eingeben, damit der Tagesverbrauch berechnet werden kann.";
    return;
  }

  const needsMoreWater = requiredWaterForOneDay > currentWaterStock;
  const needsMoreFood = requiredFoodForOneDay > currentFoodStock;

  if (needsMoreWater || needsMoreFood) {
    statusBox.classList.add("warning");
    statusText.textContent = "Warnung: Vorräte auffüllen!";
    return;
  }

  statusBox.classList.add("ok");
  statusText.textContent = "Empfehlung: Vorräte ausreichend.";
}

function loadInventory() {
  const savedInventory = localStorage.getItem(STORAGE_KEY_INVENTORY);

  if (!savedInventory) {
    return structuredClone(defaultInventory);
  }

  try {
    const parsedInventory = JSON.parse(savedInventory);

    return defaultInventory.map((defaultEntry) => {
      const savedEntry = parsedInventory.find(
        (entry) => entry.id === defaultEntry.id
      );

      return savedEntry
        ? { ...defaultEntry, amount: savedEntry.amount }
        : defaultEntry;
    });
  } catch {
    return structuredClone(defaultInventory);
  }
}

function loadParameters() {
  const savedParameters = localStorage.getItem(STORAGE_KEY_PARAMETERS);

  if (!savedParameters) {
    return;
  }

  try {
    const parsedParameters = JSON.parse(savedParameters);

    locationInput.value = parsedParameters.locationKey || "";
    groupSizeInput.value = parsedParameters.groupSize || "";

    const selectedLocation = middleEarthLocations[parsedParameters.locationKey];

    if (selectedLocation) {
      realPlaceText.textContent = selectedLocation.realPlace;
    }
  } catch {
    locationInput.value = "";
    groupSizeInput.value = "";
  }
}

function saveParametersToStorage(locationKey, groupSize) {
  localStorage.setItem(
    STORAGE_KEY_PARAMETERS,
    JSON.stringify({ locationKey, groupSize })
  );
}

function apiKeyIsConfigured() {
  return (
    OPEN_WEATHER_API_KEY &&
    OPEN_WEATHER_API_KEY !== "DEIN_OPENWEATHER_API_KEY"
  );
}

function formatNumber(value) {
  return Number.isInteger(value)
    ? String(value)
    : value.toFixed(1).replace(".", ",");
}

function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
