# Globaler Footer — Integration (Firebase-Version)

## 1. Namenskonvention

Alle zusammengehörigen Dateien tragen den Präfix `footer-`, damit sie auch
in einem flachen `public/`-Ordner mit vielen anderen Dateien sofort als
zusammengehörig erkennbar sind (z. B. beim alphabetischen Sortieren im
Explorer/Editor stehen sie automatisch nebeneinander):

```
footer-config.js        <- Daten: Links, Seitenname (hier änderst du meistens)
footer-app.js            <- Logik (i. d. R. nicht anfassen)
footer-style.css         <- Styling
footer-impressum.html    <- Rechtsseite
footer-agb.html           <- Rechtsseite
footer-datenschutz.html   <- Rechtsseite
footer-readme.md          <- diese Anleitung
```

Alle Dateien liegen direkt in deinem Firebase-`public`-Ordner (dem Ordner,
den `firebase.json` unter `"hosting": { "public": "..." }` referenziert),
egal ob das `public`, `dist` oder `www` heißt.

## 2. Auf JEDER Seite einbinden

Im `<head>`:
```html
<link rel="stylesheet" href="/footer-style.css">
```

Vor `</body>`, in dieser Reihenfolge (Config muss vor App geladen werden):
```html
<script src="/footer-config.js"></script>
<script src="/footer-app.js" defer></script>
```

## 3. Etwas ändern (z. B. neuer Link, anderer Seitenname)

Nur `footer-config.js` bearbeiten — nie `footer-app.js`. Das ist die
gesamte Trennung: Config = Daten, App = Logik. Ein neuer Punkt im Footer
ist ein neuer Eintrag im `links`-Array, kein Eingriff in die Rendering-Logik.

## 4. Footer auf Quiz-Seiten ausblenden

```html
<body data-quiz-active="true">
```

Bei Single-Page-Quiz mit Auswertungsscreen ohne Neuladen, zusätzlich im
Quiz-JS:
```js
document.body.setAttribute('data-quiz-active', 'true');   // Quiz startet
document.body.removeAttribute('data-quiz-active');        // Quiz endet
```
`footer-app.js` reagiert automatisch per MutationObserver.

## 5. Firebase Hosting: Caching

Firebase Hosting setzt für Dateien in `public/` standardmäßig lange
Cache-Zeiten. Gut für Performance, aber Änderungen an `footer-config.js`
brauchen dann etwas, bis sie bei wiederkehrenden Besuchern ankommen.
Falls das stört, in `firebase.json` ergänzen:

```json
{
  "hosting": {
    "public": "public",
    "headers": [
      {
        "source": "/footer-*.@(js|css)",
        "headers": [
          { "key": "Cache-Control", "value": "max-age=3600" }
        ]
      }
    ]
  }
}
```

Das reduziert die Cache-Dauer nur für die Footer-Dateien (erkennbar am
Namensmuster `footer-*`) auf 1 Stunde, ohne das Caching des Rests deiner
Anwendung zu verändern.

## 6. Firebase Hosting: Content-Security-Policy

Falls du eine CSP einführst (empfohlen), muss sie zu den Domains passen,
die Firebase Auth/Firestore tatsächlich verwenden — eine zu strikte CSP
würde sonst Login/Datenbank blockieren. Ausgangspunkt (in `firebase.json`
als Header oder als `<meta>`-Tag):

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' https://www.gstatic.com https://apis.google.com; style-src 'self'; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; frame-src https://*.firebaseapp.com https://accounts.google.com;"
}
```

Wichtig: Das ist ein Ausgangspunkt, kein Garant — teste nach dem Einbau
gezielt Login, Firestore-Zugriff und die TOTP-2FA, da genutzte Bibliotheken
zusätzliche Domains brauchen können. Die Browser-Konsole zeigt geblockte
Requests als CSP-Fehler an, dann einfach die fehlende Domain ergänzen.

Der Footer-Code selbst (`footer-app.js`) lädt nichts von extern und
verändert die CSP-Anforderungen deiner Anwendung nicht.

## 7. Erweiterbarkeit — künftige Optionen

Aktuell sind die Rechtstexte statische HTML-Platzeiten. Wenn du sie später
ändern willst, ohne neu zu deployen, ist der naheliegende nächste Schritt
(nicht jetzt umgesetzt, nur als Hinweis für später):

- Rechtstexte in Firestore ablegen (z. B. Collection `rechtstexte`,
  Dokumente `impressum`, `agb`, `datenschutz`)
- `footer-impressum.html` etc. laden den Text dann per Firestore-Read und
  setzen ihn über `textContent` (nicht `innerHTML`!) in ein Element ein
- Vorteil: Text-Änderungen ohne Redeploy, direkt in der Firebase Console
- Nachteil: zusätzliche Firestore-Lesevorgänge, Ladezustand nötig

Das lohnt sich erst, wenn du Rechtstexte häufiger änderst. Für den Start
sind statische Platzhalter-Dateien einfacher und schneller.

## 8. Sicherheit — Zusammenfassung

- `footer-app.js` baut den Footer ausschließlich über `document.createElement`
  und `textContent` — kein `innerHTML`, kein XSS-Einfallspunkt, auch wenn
  `footer-config.js` künftig aus einer Datenbank befüllt würde.
- Alle Footer-Links bekommen `rel="noopener noreferrer"`.
- Config (Daten) und App (Logik) sind strikt getrennt — reduziert das
  Risiko, bei einer künftigen Änderung versehentlich Logik zu verändern,
  wenn eigentlich nur ein Link angepasst werden sollte.