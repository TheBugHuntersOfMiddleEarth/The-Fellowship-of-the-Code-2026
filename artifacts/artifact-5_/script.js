// Trage hier deinen OpenWeather API Key ein.
// Für ein echtes öffentliches Projekt sollte der Key nicht im Frontend stehen,
// sondern über einen kleinen Backend-Proxy geschützt werden.
const OPEN_WEATHER_API_KEY = "DEIN_OPENWEATHER_API_KEY";

const STORAGE_KEY_INVENTORY = "inventar-interface-bestand-v1";
const STORAGE_KEY_PARAMETERS = "inventar-interface-parameter-v1";

const BASE_WATER_PER_PERSON = 3; // Liter pro Person und Tag
const BASE_FOOD_PER_PERSON = 3;  // Rationen pro Person und Tag

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
  main: "Normal",
  waterFactor: 1,
  foodFactor: 1,
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

async function handleSaveParameters() {
  const location = locationInput.value.trim();
  const groupSize = Number(groupSizeInput.value);

  if (!location || !Number.isInteger(groupSize) || groupSize < 1) {
    parameterHint.textContent = "Bitte Standort und eine gültige Gruppengröße eingeben.";
    return;
  }

  saveParametersToStorage(location, groupSize);
  parameterHint.textContent = "Wetter wird abgerufen ...";

  try {
    const weatherData = await fetchWeather(location);
    weatherState = buildWeatherState(weatherData);
    calculateAndRenderConsumption();
    updateStatus();
    parameterHint.textContent = `Parameter gespeichert. Wetterdaten für ${weatherData.place} wurden geladen.`;
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
    nameCell.innerHTML = `${entry.icon ? `<span aria-hidden="true">${entry.icon}</span>` : ""}<span>${entry.label}</span>`;

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
      stockCell.innerHTML = `<span id="stock-${entry.id}">${formatNumber(entry.amount)}</span> <span>${entry.unit}</span>`;

      const minusButton = createActionButton("−", `Bestand von ${entry.label} verringern`, () => changeAmount(entry.id, -1));
      const plusButton = createActionButton("+", `Bestand von ${entry.label} erhöhen`, () => changeAmount(entry.id, 1));

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

async function fetchWeather(location) {
  if (!apiKeyIsConfigured()) {
    return {
      place: `${location} (Demo, kein API-Key eingetragen)`,
      main: "Clear",
      description: "sonnig"
    };
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPEN_WEATHER_API_KEY}`;
  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Der Standort konnte nicht in Koordinaten umgewandelt werden.");
  }

  const geoData = await geoResponse.json();

  if (!Array.isArray(geoData) || geoData.length === 0) {
    throw new Error("Der Standort wurde nicht gefunden. Bitte genauer eingeben, z. B. 'Wien, AT'.");
  }

  const { lat, lon, name, country } = geoData[0];
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric&lang=de`;
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Die Wetterdaten konnten nicht geladen werden. Prüfe bitte den API-Key.");
  }

  const weatherData = await weatherResponse.json();
  const condition = weatherData.weather?.[0];

  return {
    place: `${name}${country ? `, ${country}` : ""}`,
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

  if (main.includes("clear") || description.includes("sonn")) {
    waterFactor = 2;
    foodFactor = 1;
    typeLabel = "Sonne";
  }

  if (
    main.includes("rain") ||
    main.includes("drizzle") ||
    main.includes("snow") ||
    main.includes("thunderstorm") ||
    description.includes("regen") ||
    description.includes("schnee") ||
    description.includes("gewitter")
  ) {
    waterFactor = 1;
    foodFactor = 1.5;
    typeLabel = "Regen / Schnee";
  }

  return {
    text: `${typeLabel}: ${capitalize(weatherData.description)}`,
    main: weatherData.main,
    waterFactor,
    foodFactor,
    waterConsumption: 0,
    foodConsumption: 0
  };
}

function calculateAndRenderConsumption() {
  const groupSize = Number(groupSizeInput.value) || 0;
  const baseWater = groupSize * BASE_WATER_PER_PERSON;
  const baseFood = groupSize * BASE_FOOD_PER_PERSON;

  weatherState.waterConsumption = roundToOneDecimal(baseWater * weatherState.waterFactor);
  weatherState.foodConsumption = roundToOneDecimal(baseFood * weatherState.foodFactor);

  weatherText.textContent = weatherState.text;
  factorText.textContent = `Wasser ×${formatFactor(weatherState.waterFactor)} / Nahrung ×${formatFactor(weatherState.foodFactor)}`;
  waterConsumptionText.textContent = `${formatNumber(weatherState.waterConsumption)} L`;
  foodConsumptionText.textContent = `${formatNumber(weatherState.foodConsumption)} R`;
}

function updateStatus() {
  const currentWaterStock = inventory.find((entry) => entry.id === "water")?.amount ?? 0;
  const currentFoodStock = inventory.find((entry) => entry.id === "food")?.amount ?? 0;
  const requiredWaterForOneDay = weatherState.waterConsumption;
  const requiredFoodForOneDay = weatherState.foodConsumption;
  const groupSize = Number(groupSizeInput.value) || 0;

  statusBox.classList.remove("ok", "warning", "neutral");

  if (groupSize < 1) {
    statusBox.classList.add("neutral");
    statusText.textContent = "Bitte Gruppengröße eingeben, damit der Tagesverbrauch berechnet werden kann.";
    return;
  }

  // Warnung genau nach dem Flowchart:
  // Wenn der berechnete Tagesbedarf höher ist als der aktuelle Bestand,
  // dann Vorräte auffüllen. Sonst sind die Vorräte ausreichend.
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
      const savedEntry = parsedInventory.find((entry) => entry.id === defaultEntry.id);
      return savedEntry ? { ...defaultEntry, amount: savedEntry.amount } : defaultEntry;
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
    locationInput.value = parsedParameters.location || "";
    groupSizeInput.value = parsedParameters.groupSize || "";
  } catch {
    locationInput.value = "";
    groupSizeInput.value = "";
  }
}

function saveParametersToStorage(location, groupSize) {
  localStorage.setItem(
    STORAGE_KEY_PARAMETERS,
    JSON.stringify({ location, groupSize })
  );
}

function apiKeyIsConfigured() {
  return OPEN_WEATHER_API_KEY && OPEN_WEATHER_API_KEY !== "DEIN_OPENWEATHER_API_KEY";
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}

function formatFactor(value) {
  return String(value).replace(".", ",");
}

function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
