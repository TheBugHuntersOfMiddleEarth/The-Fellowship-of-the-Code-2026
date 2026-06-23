# Application Synthesis - Extending the Fellowship

*"Ich kenne Deinen Schmerz. Es ist dieselbe Last, die auf Dir liegt.
Komm, Frodo. Wir bringen ihn zu Ende." (Samweis Gamdschie)*

**Table of Contents**

  - [Power Automate](#Power-Automate)
  - [Hobbit Game](#Steal-the-orcs-food)

---

## Power Automate

Zur Erstellung des Flows haben wir verschiedene Auslöser ausprobiert. Die erste Idee ("Das Auge Saurons :eye:") war es, auf eine vom Lektor erstellten Kanalnachricht automatisiert mit einer Warnung (" :warning: The Fellowship has detected danger. Aragorn :dagger: should review the path!") zu antworten. Trotz mehrerer Versuche und Tests konnte der automatisierte Cloud-Flow nicht erfolgreich umgesetztz werden.

Der nun entwickelte Flow ("TFoTC_ADaD-S26_CodeReview-Datei") prüft ob eine neue Datei auf SharePoint in einem vordefinierten Ordner erstellt oder geändert wurde. Sofern dies zutrifft, wird an die vordefinierten Gefährten (Team-Mitglieder "The Bug Hunters of Middle Earth") eine E-Mail versendet. 

Zur Ansicht haben wir je einen Screenshot vom [Auslöser](attachement/2026-06-23_1_Flow-Auslöser.jpg) sowie von der [Aktion](attachement/2026-06-23_2_Flow-Aktion.jpg) und vom [Test](attachement/2026-06-23_3_Flow-Test.jpg) hinterlegt.

---

## Steal the orcs food

Bei diesem zukünftigen Game of the Year geht es darum als Hobbit Essen von einem Ork zu stehlen. Hobbits brauchen, wie wir wissen sehr viel essen. Nicht immer ist Zeit für die Jagd oder oder sonstiges Sammeln von Zutaten. Warum also nicht einfach den Orks ihr Essen stehlen. Für dieses Game gehen wir mal davon aus, dass das Esssen der Orks genießbar ist. 

Man hat drei Leben und muss versuchen so viel Essen wie möglich einzusammeln, bevor der Ork einen killt. Aber Vorsicht: der anfangs noch sehr träge Ork wird nach Ablauf eines Timers wütend und verfällt in den Rage Mode. Dann geht es erst richtig rund. Der Ork rast über das Spielfeld und versucht verzweifelt seine Hendlhaxn vor dir zu schützen. Das macht das Überleben wesentlich schwerer. 

Solange man im Browser bleibt, speichert das Game auch den Highscore und man kann mit jedem Run versuchen immer besser zu werden. That's it. Simpel aber geil. 

[Link zum Spiel](https://arcade.makecode.com/S48836-31204-34613-42248)

---
