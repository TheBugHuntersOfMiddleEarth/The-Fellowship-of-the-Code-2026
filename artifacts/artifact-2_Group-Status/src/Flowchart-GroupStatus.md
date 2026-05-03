```mermaid
    flowchart TD
        A((Start)) --> B[Monitoring der Gruppenmitglieder]
    
        B --> C[Gesundheit]
        B --> D[Geistiger Zustand]
        B --> E[Hunger/Durst]
        B --> F[Standort]
    
        C --> C1{Kritisch?}
        D --> D1{Kritisch?}
        E --> E1{Kritisch?}
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
        G -->|Ja| I[Ringalarm bei allen Gruppenmitglieder auslösen]
    
        H --> Y
    
        I --> J[Ringalarm läutet]
        J --> K[Grund des Alarms anzeigen]
        K --> K1[Standort und Entfernung zum Ringträger anzeigen]
        K1--> K2[Button zum Abschalten des Alarms einblenden]
        K2 --> L{Alarm ausgeschaltet?}
        L -->|Nein| J
        L -->|Ja| Y
    
        Y --> Z((Ende))
        Z --> A
