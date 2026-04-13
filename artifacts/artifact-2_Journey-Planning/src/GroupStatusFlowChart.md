flowchart TD
    A((Start)) --> B[Monitoring der Gruppenmitglieder]

    B --> C[Gesundheit]
    B --> D[Geistiger Zustand]
    B --> E[Hunger/Durst]
    B --> F[Standort]

    C --> C1{Kritische?}
    D --> D1{Kritische?}
    E --> E1{Kritische?}
    F --> F1{Abstand zum näcshten Gruppenmitglied > 500 m?}

    C1 -->|Nein| Y[Monitoring fortsetzen]
    D1 -->|Nein| Y
    E1 -->|Nein| Y
    F1 -->|Nein| Y

    C1 -->|Ja| G{Ist der Ringträger betroffen?}
    D1 -->|Ja| G
    E1 -->|Ja| G
    F1 -->|Ja| G

    G -->|Nein| H[Warnmeldung an Gruppe senden]
    G -->|Ja| I[Ringalarm an alle Gruppenmitglieder auslösen]

    H --> Y

    I --> J[Ringalarm läutet]
    J --> K[Standort des Ringträgers anzeigen]
    K --> L{Alarm ausgeschaltet?}
    L -->|Nein| J
    L -->|Ja| Y

    Y --> Z((Ende))
    Z --> A
