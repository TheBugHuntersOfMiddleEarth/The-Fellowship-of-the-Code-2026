```mermaid
flowchart TD
    A((Start)) --> B[Monitoring aller Gruppenmitglieder]

    B --> C[Gesundheit]
    B --> D[Geistiger Zustand]
    B --> E[Hunger/Durst]
    B --> F[Standort]

    C --> C1{Kritisch?}
    D --> D1{Kritisch?}
    E --> E1{Kritisch?}
    F --> F1{Abstand zum nächsten Grupenmitglied > 500 m?}

    C1 -->|Nein| Y[Monitoring fortsetzen]
    D1 -->|Nein| Y
    E1 -->|Nein| Y
    F1 -->|Nein| Y

    C1 -->|Ja| G{Ringträger betroffen?}
    D1 -->|Ja| G
    E1 -->|Ja| G
    F1 -->|Ja| G

    G -->|Ja| H[Ringalarm auslösen]
    G -->|Nein| I[Infomeldung an Gruppe senden]

    H --> Y
    I --> Y
    Y --> Z((Ende))
    Z --> A
    
    
