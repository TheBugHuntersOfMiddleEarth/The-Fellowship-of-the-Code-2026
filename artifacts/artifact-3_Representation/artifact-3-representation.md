# The Fellowship Companion - Artifact 3: Representation of Ring-Alarm

**Table of Contents**

  - [Selected Capability](#Selected-Capability)
  - [HTML](#HTML-File)
  - [CSS](#CSS-file)
  - [Design rationale](#Design-rationale)

---

## Selected Capability
Gruppenstatus – Gesundheits- & Standorttracking

### Why this capability
Die Gruppe reist durch gefährliche und unbekannte Gebiete. Den Status aller Gruppenmitglieder (Standort und Gesundheit) jederzeit zu kennen und im Notfall benachrichtigt zu werden, kann im Ernstfall entscheidend sein. Damit kann man auf Probleme frühzeitig reagieren und evtl kritische Gesundheitszustände vermeiden. Außerdem wird vermieden, dass die Gruppe in unbekannten Gebieten getrennt wird. Ist der Ringträge betroffen, soll ein besonderer Alarm ausgelöst werden. 

### Supporting intent
Dieses Feature wurde so designt, dass es die Gruppe optimal unterstützen kann. Wenn man vom System automatisch über kritische Zustände informiert wird, kann man rechtzeitig reagieren und Schlimmeres verhindern. Ein besonders eindeutiger Hinweis erfolgt, wenn der Ringträger, als wichtigstes Gruppenmitglied, betroffen ist. Hier wird ein Alarm an die gesamte Gruppe ausgeschickt um schnellstmögliche Hilfe für den Ringträger in Notsituationen zu ermöglichen.

### What was left out
Aktuell kann der Companion nur im Hintergrund den Status der Gruppe tracken und im Ernstfall Alarm schlagen. Mit diesem Feature wurde vorerst noch keine Möglichkeit implementiert, mit der die Gruppenmitglieder jederzeit manuell Echtzeitinfos abrufen können. Dieses Feature ist mit künfitgen Updates geplant. 

### Assumptions and Constraints
Damit dieses Feature funktionieren kann, müssen wir davon ausgehen, dass jedes Gruppenmitglied angemessen auf die Statusbenachrichtigungen reagiert und diese nicht ignoriert. Damit die Benachrichtigungen und der Ringalarm gesendet werden können, ist durchgehend eine stabile Verbindung nötig. Es könnte hier also zu Problemen in Gebieten mit schlechter Verbindung kommen. 

---

## Unterlagen

### Flowchart
[Flowchart](src/Flowchart-GroupStatus.md)

### Wireframe
[zum Wireframe für einen Ring Alarm](src/wireframeRingAlarmSkizze.png)

---

#### Bonus-Content
[Designentwurf Ring Alarm](src/DesignEntwurfRingAlarm.png)
