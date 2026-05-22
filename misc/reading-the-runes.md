# The Red Book of Westmarch - Chapter IV: When Things React

*`LOTR Quote relevant to the assignment or artifact` `"..." - Character`*

**Table of Contents**

- [Sidequest - Reading the Runes](#sidequest---reading-the-runes)
  - [Issue I](#Issue-I)
  - [Issue II](#Issue-II)
  - [AI Assistance](#ai-assistance)

---

## Issue I

### Description

**Where it occurs**

Die Variable rations ist als String definiert. Zusätzlich werden auch die Inputs nicht in Numbers umgewandelt. Das führt teilweise zu fehlerhaften Berechnungen. Das liegt daran, dass der Operator "+" nicht automatisch eine Addition durchführt, wenn die Werte keine Numbers sind. Subtraktionen sind durch diesen Fehler erstmal kein Problem, werden aber in der Kombination von hinzugefügten und entnommenen Rationen auch fehlerhaft. 

**What the code intends to do**

Der Code sollte die eingegebene Menger der Rationen entweder addieren, wenn der Button "Add Rations" gedrückt wird, oder subtrahieren bei "Eat Rations". Wenn also zu den bestehenden 10 Rationen 3 hinzugefügt werden, sollte die Berechnung korrek lauten: 10 + 3 = 13


**What actually hapens instead**

Da die Variablen aber nicht als Number sondern als String definiert sind, löst der Operator "+" nicht automatisch eine Addition aus, sondern macht eine Textverkettung, was zu einem fehlerhaften Ergebnis führt, da dann der eingegebene Wert einfach hinten angefügt wird. Die Berechnung sieht also eigentlich so aus: "10" + "3" = "103". Da der Operator "-" eindeutig ein mathematischer Operator ist, führt es bei Subtraktionen die Berechnung richtig aus, auch wenn die Werte Strings sind. Wenn aber bereits die Basis aufgrund fehlerhafter Additionen nicht stimmt, bringt das auch nicht viel. 

### Why does it matter?

*`How it affects the user experience; How could it cause bugs later; Why would it be risky in a larger system?`*

Der Code ist in dieser Hinsicht zwar syntaktisch vollkommen richtig, aber dennoch semantisch komplett falsch. Durch diese offensichtlich falschen Berechnungen ist die App unbrauchbar für den User, weil kein Verlass auf die Ergebnisse ist. Selbst wenn der User weiß, dass es ein Problem mit den Additionen gibt und er deshalb nur eine Entnahme eingeben möchte, kann er sich nicht darauf verlassen, dass der Ausgangswert richtig ist. Außerdem wird der User durch die fehlerhafte Anzeige evtl falsche Entscheidungen treffen. Wenn man denkt, man hat noch 103 Rationen übrig, wird man ganz andere Dinge priorisieren, als wenn man weiß man hat nur mehr 13 Rationen, was eigentlich korrekt wäre. Das kann fatale Folgen haben. 

Noch größer wird das Problem, wenn vielleicht andere Systeme an die App angebunden sind bzw mit diesen Daten arbeiten. Dann werden durch die falsche Anzeige in der App alle Folgeprozesse mit falschen Werten arbeiten und vermutlich nicht richtig funktionieren. So könnten zum Beispiel Warnmeldungen nicht ausgelöst werden, weil von einem viel höheren Stand ausgegangen wird, als eigentlich richtig ist. 

### Possible fixes

Ein ganz einfacher Fix für das Problem wäre, die Codestellen wie folgt anzupassen: 

**Variable Rations**

Alt:   let rations = "10";

Neu:   let rations = 10;

**Input Value**

Alt:   const value = amountInput.value;

Neu:   const value = Number(amountInput.value);

---

## Issue II - Inventarstand falsch aktualiert

### Description

**Where it occurs**

Text

**What the code intends to do**

Text

**What actually hapens instead**

Text

### Why does it matter?

*`How it affects the user experience; How could it cause bugs later; Why would it be risky in a larger system?`*

Text

### Possible fixes

---

## AI Assistance

*`What did you ask the AI?; What was helpful?; What was misleading?; What did you have to decide yourself?`*

Man hat die Fehler beim Testen der Datei ziemlich leicht selbst gefunden, da sie offensichtlich sind. Die KI hat aber gut geholfen, die Fehler im Detail zu analysieren und zu verstehen, wo genau der Code falsch ist. Ohne Erfahrung ist es schon schwer den Code sinnerfassend zu lesen, dann auch noch Fehler zu finden ist noch schwerer. Die KI war hier also eine große Erleichterung. Bei der Beantwortung der Frage, warum die Fehler bedeutend sind, hat die KI auch gut helfen können, da sie einen guten Überblick über die möglichen Problemstellungen gibt. Wie immer gibt die KI aber im ersten Anlauf aber sehr viel Info her und wird teilweise zu komplex und überfordernd. Man muss also trotzdem noch selbst entscheiden, was wirklich die entscheidendsten Fehler sind. Auch eine ordentliche Fehlerbeschreibung muss man selsbt machen. Die KI gibt hier zwar einen ganz guten Ausgangspunkt, ist aber sicher nicht optimal. 

---


