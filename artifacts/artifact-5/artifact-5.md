# The Fellowship Companion - Artifact 5

**Table of Contents**

  - [Selected Capability](#Selected-Capability)
  - [Logical Interface](#Logical-Interface)
  - [Design rationale](#Design-rationale)

---

## Selected Capability
Inventar

Mindestens genauso wichtig wie der Überblick über die Gruppe, ist der Überblick über unsere Vorräte. Eine große Gruppe benötigt viele Vorräte, von Nahrung und Wasser über Kleidung, Rüstung, Waffen und vieles mehr. Da verliert man schnell den Überblick. Der Companion soll hier Abhilfe schaffen, indem jederzeit der aktuelle Stand von allen Vorräten abrufbar ist. Eine zusätzliche Funktion ist die automatische Berechnung des Wasser- und Nahrungsbedarfes für einen Tag anhand des aktuellen Wetters. Dazu wurde die OpenWeather API angebunden, die die Wetterdaten der tatsächlichen Herr der Ringe Drehorte immer aktuell zur Verfügung stellt. 

---

## Flow, Wireframe and Logical Interface - noch anpassen, Flow und Wireframe auch noch verlinken

[Flow](src/flowchart-system.mermaid.md)

[Wireframe](src/wireframe-system.png)

[HTML-Interface](src/index.html)

[CSS-Style-Sheet](src/style.css)

[Javascript](src/script.js)

---

## Design Rationale

### How the integrated system still reflects the original intent and value?
Unser Plan war es ursprünglich, dass die Gruppe immer einen Überblick über ihre Vorräte haben soll. Mit dem gebauten Inventar im Companion wird das sichergestellt. Jeder kann jederzeit den aktuellen Stand abrufen und Entnahmen sowie Einlagerungen tätigen.  

### How individual slices connect meaningfully?
Wir hatten einen ungefähren Plan was unser Inventar können muss. Darauf basierend haben wir einen einfachen Mermaid Flow erstellt und das ungefähre Interface in einem Wireframe skizziert. Dabei war uns wichtig gleich eine Desktopansicht und auch eine mobile Ansicht zu berücksichtigen. Basierend darauf haben wir das finale Interface und die zugehörige Logik implementiert. 

### Why your chosen extension makes sense?
Die Anbindung von aktuellen Wetterdaten macht deshalb Sinn, weil je nach Wetterlage und Temperatur eine unterschiedliche Menge an Wasser und Nahrung benötigt wird. Damit unser Inventarsystem den Tagesbedarf berechnen kann, benötigt es daher immer aktuelle Wetterdaten. Dadurch wird sichergestellt, dass die Gruppe rechtzeitig gewarnt wird, wenn Vorräte knapp werden. Auch für künftig geplante Updates ist die API sehr sinnvoll, da anhand der Wetterdaten zum Beispiel auch Empfehlungen zur optimalen Ausrüstung (Regenschutz, Wintermäntel, etc.) gegeben werden können.  

### What you intentionally did not build?
Ursprünglich haben wir auch geplant, dass sich jedes Gruppenmitglied persönliche Favoriten anlegen kann um diese immer schnell im Überblick zu haben. Wir haben uns aber bewusst dafür entschieden, diese Funktion in der aktuellen Version noch nicht einzubauen, um nicht zu komplex zu werden. Die anderen Funktionen waren uns für diese Version des Inventars wichtiger. Fürs erste Design haben wir für Entnahmen/Einlagen nur +/- Buttons verwendet und uns vorerst gegen Zahlenfelder entschieden. Uns ist aber bewusst, dass das bei großen Entnahmen oder Einlagerungen mühsam werden kann. Die Buttons links und rechts oben in den Ecken dienen erstmal nur als Platzhalter. Damit wollten wir einfach nur darstellen, dass es in einer vollständigen App einen Button gibt um zum vorherigen Schirm zurückzukommen und einen um ein Optionsmenü zu öffnen. Da wir aber nur ein Feature und einen Screen gebaut haben, sind die Buttons ohne Funktion. 

