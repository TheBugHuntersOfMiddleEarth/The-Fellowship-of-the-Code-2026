flowchart TD

A([Start: Reise beginnt in Bruchtal])

B[Benutzer meldet sich an<br/>z.B. Frodo, Sam oder Gandalf]

C[Dashboard öffnen<br/>Aktueller Vorratsstatus]

D{Aktion wählen}

E[Inventar ansehen]

F[Neuen Gegenstand hinzufügen<br/>z.B. Lembas-Brot]

G[Vorrat verbrauchen<br/>z.B. Wasser trinken]

H[Gegenstand übertragen<br/>z.B. Sam gibt Frodo Lembas]

I[Persönlichen Favoriten markieren]

J[Inventar aktualisieren]

K[Gemeinschaftsübersicht aktualisieren]

L[Aktuellen Vorratsstatus anzeigen]

M([Ende: Gemeinschaft kennt aktuellen Vorratsstand])

A --> B
B --> C
C --> D

D --> E
D --> F
D --> G
D --> H
D --> I

E --> L

F --> J
G --> J
H --> J
I --> L

J --> K
K --> L
L --> M 
