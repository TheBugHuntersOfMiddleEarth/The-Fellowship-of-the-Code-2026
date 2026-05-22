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

## Issue II

### Description

**Where it occurs**

Ein weiterer Entscheidender Fehler ist die fehlerhafte Aktualisierung des Inventarstandes nach einer Entnahme. Der Stand wird im Hintergrund zwar richtig aktualisiert, aber der Befehl "updateStatus()" wird zu früh ausgeführt. Das führt dazu, dass sich die Anzeige trotz Klick erstmal nicht ändert. Besonders problematisch ist das wenn ein Stand von 0 oder weniger erreicht werden würden. Dann bekommt man zwar richtigerweise die Warnmeldung, aber der Stand wird erst aktualisiert nachdem man die Meldung wegklickt. Grundsätzlich wird hier also nicht falsch gerechnet, sondern einfach falsch angezeigt im erstem Moment, was den User verwirren kann. 

**What the code intends to do**

Der Code sollte eigentlich dazu führen, dass mit dem Klicken des Buttons "Eat Rations" sofort der Stand um den eingegebenen Wert reduziert wird. Aufgrund der eingebauten IF-Funtktion sollte der Wert bei entsprechender Entnahme auch zuerst auf 0 sinken und dann die Warnmeldung aufscheinen. 

**What actually hapens instead**

Aktuell passiert es genau umgekehrt. Der Button wird geklickt und direkt danach wird updateStatus() ausgelöst und erst danach die IF-Funtktion ausgeführt. Dadurch ändert sich der Wert bei ersten Klick nicht, da zum Zeitpunkt der Aktualisierung noch gar nicht geprüft wurde, ob eine Warnmeldung eingeblendet werden muss oder nicht. Die Berechnung wird laut dem Code aber erst nach dieser Prüfung ausgeführt. Darum ist aktualisiert sich die Anzeige auch erst nach einem weiteren Klick. 

### Why does it matter?

*`How it affects the user experience; How could it cause bugs later; Why would it be risky in a larger system?`*

Es macht auf den ersten Blick den Eindruck, dass die App auf die Eingabe nicht reagiert. Das kann dazu führen, dass der User mehrfach klickt, da er denkt die erste Eingabe wurde nicht übernommen. Dadurch erfolgt dann aber immer wieder eine weitere Entnahme, wodurch den Endstand erst wieder fehlerhaft wird. Wie auch schon beim ersten Fehler kann das auf lange Sicht zu Problemen führen, weil dadurch mit falschen Werte weitergearbeitet werden könnte. Dieser Fehler ist aber im Nachhinein kaum noch nachvollziehbar. 

### Possible fixes

Ein einfacher Fix wäre es den Befehl "updateStatus()" erst nach der IF-Funktion zu platzieren. Das führt dazu, dass erst die Prüfung und Berechnung erfolgt und dann erst die Anzeige aktualisiert wird. Somit wird sie dann auch gleich beim ersten Klick aktualisiert. 

---

## AI Assistance

*`What did you ask the AI?; What was helpful?; What was misleading?; What did you have to decide yourself?`*

Man hat die Fehler beim Testen der Datei ziemlich leicht selbst gefunden, da sie offensichtlich sind. Die KI hat aber gut geholfen, die Fehler im Detail zu analysieren und zu verstehen, wo genau der Code falsch ist. Ohne Erfahrung ist es schon schwer den Code sinnerfassend zu lesen, dann auch noch Fehler zu finden ist noch schwerer. Die KI war hier also eine große Erleichterung. Bei der Beantwortung der Frage, warum die Fehler bedeutend sind, hat die KI auch gut helfen können, da sie einen guten Überblick über die möglichen Problemstellungen gibt. Wie immer gibt die KI aber im ersten Anlauf aber sehr viel Info her und wird teilweise zu komplex und überfordernd. Man muss also trotzdem noch selbst entscheiden, was wirklich die entscheidendsten Fehler sind. Auch eine ordentliche Fehlerbeschreibung muss man selsbt machen. Die KI gibt hier zwar einen ganz guten Ausgangspunkt, ist aber sicher nicht optimal. 

---


