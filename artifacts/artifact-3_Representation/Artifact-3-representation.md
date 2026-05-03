# The Fellowship Companion - Artifact 3: Representation of Ring-Alarm

**Table of Contents**

  - [Selected Capability](#Selected-Capability)
  - [Static Interface](#Static-Interface)
  - [Design rationale](#Design-rationale)

---

## Selected Capability
Gruppenstatus – Gesundheits- & Standorttracking - Ring Alarm

Das Feature haben wir bereits in Artifact-2 ausführlich dargestellt und beschrieben. Es trackt laufend den Status der einzelnen Gruppenmitglieder und benachrichtigt die Gruppe wenn bei jemandem ein kritischer Zustand eintritt. Ist der Ringträger betroffen, erfolgt ein besonderer Alarm an alle. Zur Visualisierung haben wir nur ein statisches HTML-Interface mit einem entsprechenden CSS-Style-Sheet gebaut. Dargestellt wird das Interface, dass die User sehen, wenn ein Ring-Alarm ausgelöst wurde und dieser an alle Nutzer ausgeschickt wurde. Der User sieht auf einen Blick warum er den Alarm bekommnt (in diesem Fall aufgrund des kritischen Gesundheitszustandes des Ringträgers) und wo sich dieser befindet. hier soll künftig eine direkte Navigation zum Betroffenen möglich sein. Der Alarm geht an alle Gruppenmitglieder und läutet so lange bis er über den Button "Alarm ausschalten" beendet wird. 

[Details](../artifact-2_Group-Status/Artifact-2_Group-Status.md)

---

## Static Interface

### HTML Interface

[HTML-Interface](src/interface.html)

### CSS Style Sheet

[CSS-Style-Sheet](src/css/style.css)

---

## Design Rationale

### Why does this support the intent and value defined in artifact 1?
Weil die gesamte Gruppe in Echtzeit benachrichtigt wird, wenn es jemandem aus der Gruppe schlecht geht. Vor allem der besondere Alarm, wenn der Ringträger betroffen ist, ist hilfreich, denn ohne Ring macht die ganze Reise keinen Sinn mehr. 

### How does it reflect the wireframe of artifact 2?
Das ursprüngliche Wireframe war für eine mobile Ansicht gemacht. Als wir jetzt das Interface gebaut haben, haben wir uns für ein responsive CSS-Design entschieden, damit es auf großen Bildschirmen angenehmer zu lesen ist. Auf einem mobilen Gerät, sieht es aus wie das Wireframe. 

### What die we deliberately not implement yet?
Wir haben bewusst erst einmal keine interaktive Karte eingebaut, da das noch zu komplex ist. Wir sind für das Interface auch davon ausgegangen, dass der Ring-Alarm bereits ausgelöst ist. Es besteht also noch keine echte Anbindung an die Datenquelle (Statusmessung über Zustand der Gruppenmitglieder). Der Button zum Ausschalten des Alarms hat auch noch keine Funktion hinterlegt. 

### What assumptions or constraints shaped our decision?
Da im Hintergrund noch keine Logik definiert ist, mussten wir fiktiv davon ausgehen, dass der Alarm ausgelöst wurde, um das entsprechende Interface darstellen zu können. Auch eine interaktive Karte wäre in diesem Stadium zu komplex gewesen und es besteht auch noch keine GPS Anbindung. 
