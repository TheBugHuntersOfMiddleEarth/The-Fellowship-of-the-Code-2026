# The Fellowship Companion - Artifact 2: Group Status – Health & Location Tracking

**Table of Contents**

- [The Fellowship Companion - Artifact 2: Ring Alert](#the-fellowship-companion---artifact-2-Group-Status)
  - [Selected Capability](#1-Capability)
  - [Intent](#2-intent)
  - [Value](#3-value)
  - [System Capabilities](#4-system-capabilities)
  - [Assumptions & Constraints](#5-assumptions-and-constraints)

## Selected Capability
Gruppenstatus – Gesundheits- & Standorttracking

### Why this capability?
Die Gruppe reist durch gefährliche und unbekannte Gebiete. Den Status aller Gruppenmitglieder (Standort und Gesundheit) jederzeit zu kennen und im Notfall benachrichtigt zu werden, kann im Ernstfall entscheidend sein. Damit kann man auf Probleme frühzeitig reagieren und evtl kritische Gesundheitszustände vermeiden. Außerdem wird vermieden, dass die Gruppe in unbekannten Gebieten getrennt wird. Ist der Ringträge betroffen, soll ein besonderer Alarm ausgelöst werden. 

## Flowchart
[Flowchart](#the-fellowship-of-the-code-2026--artifacts-artifact2_journey-planning-src-groupStatusFlowChart.md)

---

## Wireframe
(See src/decisions.png)

---

## Design Rationale

### Supporting Intent
Dieses Feature wurde so designt, dass es die Gruppe optimal unterstützen kann. Wenn man vom System automatisch über kritische Zustände informiert wird, kann man rechtzeitig reagieren und Schlimmeres verhindern. Ein besonders eindeutiger Hinweis erfolgt, wenn der Ringträger, als wichtigstes Gruppenmitglied, betroffen ist. Hier wird ein Alarm an die gesamte Gruppe ausgeschickt um schnellstmögliche Hilfe für den Ringträger in Notsituationen zu ermöglichen.

### What was left out
Aktuell kann der Companion nur im Hintergrund den Status der Gruppe tracken und im Ernstfall Alarm schlagen. Mit diesem Feature wurde vorerst noch keine Möglichkeit implementiert, mit der die Gruppenmitglieder jederzeit manuell Echtzeitinfos abrufen können. Dieses Feature ist mit künfitgen Updates geplant. 

### Assumptions and Constraints
It is assumed that each member has access to the system and updates their status regularly. The design prioritizes clarity over complexity due to limited time and resources during the journey.


