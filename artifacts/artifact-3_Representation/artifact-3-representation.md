# The Fellowship Companion - Artifact 3: Representation of Ring-Alarm

**Table of Contents**

  - [Selected Capability](#Selected-Capability)
  - [Static Interface](#Static-Interface)
  - [Design rationale](#Design-rationale)

---

## Selected Capability
Gruppenstatus – Gesundheits- & Standorttracking - Ring Alarm

Das Feature haben wir bereits in Artifact-2 ausführlich dargestellt und beschrieben. Es trackt laufend den Status der einzelnen Gruppenmitglieder und benachrichtigt die Gruppe wenn bei jemandem ein kritischer Zustand eintritt. Ist der Ringträger betroffen, erfolgt ein besonderer Alarm an alle. Zur Visualisierung haben wir nur ein statisches HTML-Interface mit einem entsprechenden CSS-Style-Sheet gebaut. Dargestellt wird das Interface, dass die User sehen, wenn ein Ring-Alarm ausgelöst wurde und dieser an alle Nutzer ausgeschickt wurde. Der User sieht auf einen Blick warum er den Alarm bekommnt (in diesem Fall aufgrund des kritischen Gesundheitszustandes des Ringträgers) und wo sich dieser befindet. hier soll künftig eine direkte Navigation zum Betroffenen möglich sein. Der Alarm geht an alle Gruppenmitglieder und läutet so lange bis er über den Button "Alarm ausschalten" beendet wird. 

[Details](../artifacts/artifact-2_group-status/artifact-2_Group-status.md)

---

## Static Interface

### HTML Interface

[HTML-Interface](src/interface.html)

### CSS Style Sheet

[CSS-Style-Sheet](src/css/style.css)

---

## Design Rationale

### Why does this support the intent and value defined in artifact 1?

### How does it reflect the wireframe of artifact 2?

### What die we deliberately not implement yet?

### What assumptions or constraints shaped our decision?
