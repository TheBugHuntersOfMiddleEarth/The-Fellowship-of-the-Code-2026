# The Fellowship Companion - Artifact 3: Representation of Ring-Alarm

**Table of Contents**

  - [Selected Capability](#Selected-Capability)
  - [Logical Interface](#Logical-Interface)
  - [Design rationale](#Design-rationale)

---

## Selected Capability
Gruppenstatus – Gesundheits- & Standorttracking - Ring Alarm

Das Feature haben wir bereits in Artifact-2 ausführlich dargestellt und beschrieben. Es trackt laufend den Status der einzelnen Gruppenmitglieder und benachrichtigt die Gruppe wenn bei jemandem ein kritischer Zustand eintritt. Ist der Ringträger betroffen, erfolgt ein besonderer Alarm an alle. Wir haben die Basis von Artifact 3 nun um Javascript erweitert. Der Fokus liegt auf dem ausgelösten Ring Alarm. Der User sieht, warum der Alarm ausgelöst wurde und erhält gleichzeitig eine Standortinfo vom Ringträger, was eine Navigation zu ihm ermöglicht. Der Alarm lätuet so lange bis er von User aktiv ausgeschaltet wird. 

[Details](../artifact-2_Group-Status/Artifact-2_Group-Status.md)

---

## Logical Interface

[HTML-Interface](src/interface.html)

[CSS-Style-Sheet](src/style.css)

[Javascript](src/logic.js)

---

## Design Rationale

### Why does this support the intent and value defined in artifact 1?
Weil die gesamte Gruppe in Echtzeit benachrichtigt wird, wenn es jemandem aus der Gruppe schlecht geht. Vor allem der besondere Alarm, wenn der Ringträger betroffen ist, ist hilfreich, denn ohne Ring macht die ganze Reise keinen Sinn mehr. 

### How does it reflect the wireframe of artifact 2?
Das ursprüngliche Wireframe war für eine mobile Ansicht gemacht. Als wir jetzt das Interface gebaut haben, haben wir uns für ein responsive CSS-Design entschieden, damit es auf großen Bildschirmen angenehmer zu lesen ist. Auf einem mobilen Gerät, sieht es aus wie das Wireframe. 

### What die we deliberately not implement yet?
Die Karte haben wir bewusst noch einfach gehalten und nur die nötigsten Interaktionsmöglichkeiten eingebaut. Wir sind für das Interface auch davon ausgegangen, dass der Ring-Alarm bereits ausgelöst ist. Es besteht also noch keine echte Anbindung an die Datenquelle (Statusmessung über Zustand der Gruppenmitglieder). Der Button zum Ausschalten des Alarms deaktiviert den Alarm. Zur Darstellung wie die Karte im Einsatz funktionieren würde haben wir den Button "zum Ziel bewegen" eingebaut, der zeigt wie sich die Marker auf der Karte und die Entfernungsanzeige verhalten würden. Für den jetzigen Stand haben wir auch bewusst noch keinen Sound für den Alarm hinterlegt, sondern nur visuell die Dringlichkeit mit Effekten dargestellt. 

### What assumptions or constraints shaped our decision?
Da wir noch keine Testpersonen haben, deren Zustand wir messen können, mussten wir für den aktuellen Part davon ausgehen, dass ein kritischer Zustand bereits eingetreten ist und der Alarm ausgelöst wurde. Für die fertige Version ist es nötig, dass alle Gefährten ein magisches Armband tragen, dass rund um die Uhr ihren Zustand trackt. Dieser Umstand ist im aktuellen Stadium der Entwicklung aber einfach noch nicht darstellbar. 

