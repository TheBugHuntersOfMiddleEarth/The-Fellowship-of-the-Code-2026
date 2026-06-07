```mermaid
flowchart TD
    A[Inventar öffnen] --> B[Standort auswählen und Gruppengröße eingeben]
    B --> C[OpenWeather API abrufen]
    C --> D[Wetterlage auswerten]

    D --> E[Grundverbrauch berechnen]
    E --> F[Wetterfaktor berechnen]

    F --> G[Geschätzten Tagesverbrauch berechnen]
    G --> H[Geschätzten Tagesverbrauch anzeigen]
    H --> I[Bestand mit Tagesverbrauch vergleichen]

    I --> J{Reicht Vorrat für 24 Stunden?}

    J -->|Ja| L[Empfehlung: Vorräte ausreichend]
    J -->|Nein| K[Warnung: Vorräte auffüllen]

    L --> M[Inventar anzeigen]
    K --> M

    M --> N[Gegenstand wählen]

    N --> O{Aktion wählen}

    O -->|Entnahme| P[Menge abziehen]
    O -->|Einlagerung| Q[Menge hinzufügen]

    P --> R[Bestand speichern]
    Q --> R
    R --> M

    classDef green fill:#2e7d32,stroke:#1b5e20,color:#ffffff;
    classDef red fill:#8b1e1e,stroke:#5a0f0f,color:#ffffff;

    class L green
    class K red
  ```  
